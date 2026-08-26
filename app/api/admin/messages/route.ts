import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/firebase-admin"
import {
  SESSION_COOKIE,
  verifyAdminSession,
} from "@/lib/admin-auth"

async function authorized() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) return null

  return verifyAdminSession(token)
}

export async function GET() {
  try {
    const session = await authorized()

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      )
    }

    const snapshot = await db
      .collection("messages")
      .orderBy("createdAt", "desc")
      .get()

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      messages,
    })
  } catch (error) {
    console.error("Get admin messages error:", error)

    return NextResponse.json(
      { error: "Unable to load messages." },
      { status: 500 }
    )
  }
}
