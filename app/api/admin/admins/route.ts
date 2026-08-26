import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { FieldValue } from "firebase-admin/firestore"
import { db } from "@/lib/firebase-admin"
import {
  SESSION_COOKIE,
  verifyAdminSession,
  createPasswordHash,
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
      .collection("admins")
      .orderBy("createdAt", "desc")
      .get()

    const admins = snapshot.docs.map((doc) => {
      const data = doc.data()

      return {
        id: doc.id,
        username: data.username,
        name: data.name || "",
        active: data.active === true,
        createdAt: data.createdAt || null,
      }
    })

    return NextResponse.json({
      success: true,
      admins,
    })

  } catch {
    return NextResponse.json(
      { error: "Unable to load administrators." },
      { status: 500 }
    )
  }
}


export async function POST(request: Request) {
  try {
    const session = await authorized()

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      )
    }

    const body = await request.json()

    const username = String(body.username || "").trim()
    const password = String(body.password || "")
    const name = String(body.name || "").trim()

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      )
    }

    const existing = await db
      .collection("admins")
      .where("username", "==", username)
      .limit(1)
      .get()

    if (!existing.empty) {
      return NextResponse.json(
        { error: "That username already exists." },
        { status: 409 }
      )
    }

    const passwordHash = await createPasswordHash(password)

    const ref = await db.collection("admins").add({
      username,
      passwordHash,
      name: name || username,
      role: "admin",
      active: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      createdBy: session.username,
    })

    return NextResponse.json({
      success: true,
      adminId: ref.id,
    })

  } catch {
    return NextResponse.json(
      { error: "Unable to create administrator." },
      { status: 500 }
    )
  }
}


export async function PATCH(request: Request) {
  try {
    const session = await authorized()

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      )
    }

    const body = await request.json()

    const username = String(body.username || "").trim()
    const password = String(body.password || "")
    const name = String(body.name || "").trim()

    const adminRef = db
      .collection("admins")
      .doc(session.adminId)

    const updates: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
    }


    if (username) {
      updates.username = username
    }

    if (name) {
      updates.name = name
    }

    if (password) {
      if (password.length < 6) {
        return NextResponse.json(
          { error: "Password must contain at least 6 characters." },
          { status: 400 }
        )
      }

      updates.passwordHash = await createPasswordHash(password)
    }


    await adminRef.update(updates)


    return NextResponse.json({
      success: true,
      message: "Admin information updated successfully.",
    })


  } catch (error) {

    console.error("Update admin error:", error)

    return NextResponse.json(
      { error: "Unable to update administrator." },
      { status: 500 }
    )
  }
}
