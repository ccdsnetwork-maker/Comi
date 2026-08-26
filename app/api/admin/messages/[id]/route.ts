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

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const session = await authorized()

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      )
    }

    const { id } = await context.params

    const messageRef = db.collection("messages").doc(id)
    const message = await messageRef.get()

    if (!message.exists) {
      return NextResponse.json(
        { error: "Message not found." },
        { status: 404 }
      )
    }

    await messageRef.delete()

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Delete message error:", error)

    return NextResponse.json(
      { error: "Unable to delete message." },
      { status: 500 }
    )
  }
}
