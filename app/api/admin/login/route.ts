import { NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"
import {
  createAdminSession,
  SESSION_COOKIE,
  verifyPassword,
} from "@/lib/admin-auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const username = String(body.username || "").trim()
    const password = String(body.password || "")

    if (!username || !password) {
      return NextResponse.json(
        {
          error: "Username and password are required.",
        },
        { status: 400 }
      )
    }

    const snapshot = await db
      .collection("admins")
      .where("username", "==", username)
      .limit(1)
      .get()

    if (snapshot.empty) {
      return NextResponse.json(
        {
          error: "Invalid username or password.",
        },
        { status: 401 }
      )
    }

    const adminDoc = snapshot.docs[0]
    const admin = adminDoc.data()

    if (admin.active !== true) {
      return NextResponse.json(
        {
          error: "This admin account is inactive.",
        },
        { status: 403 }
      )
    }

    const passwordMatches = await verifyPassword(
      password,
      String(admin.passwordHash || "")
    )

    if (!passwordMatches) {
      return NextResponse.json(
        {
          error: "Invalid username or password.",
        },
        { status: 401 }
      )
    }

    const token = await createAdminSession(
      adminDoc.id,
      String(admin.username)
    )

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    })

    response.cookies.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error("Admin login error:", error)

    return NextResponse.json(
      {
        error: "Unable to process login.",
      },
      { status: 500 }
    )
  }
}
