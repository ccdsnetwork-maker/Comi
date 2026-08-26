import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { FieldValue } from "firebase-admin/firestore"
import { db } from "@/lib/firebase-admin"
import {
  SESSION_COOKIE,
  verifyAdminSession,
} from "@/lib/admin-auth"

async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) {
    return null
  }

  return verifyAdminSession(token)
}

export async function GET() {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      )
    }

    const snapshot = await db
      .collection("programmes")
      .orderBy("date", "desc")
      .get()

    const programmes = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      programmes,
    })
  } catch (error) {
    console.error("Get programmes error:", error)

    return NextResponse.json(
      { error: "Unable to load programmes." },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      )
    }

    const body = await request.json()

    const title = String(body.title || "").trim()
    const description = String(body.description || "").trim()
    const date = String(body.date || "").trim()
    const time = String(body.time || "").trim()
    const venue = String(body.venue || "").trim()
    const category = String(body.category || "").trim()

    if (!title || !date) {
      return NextResponse.json(
        {
          error: "Programme title and date are required.",
        },
        { status: 400 }
      )
    }

    const programmeRef = await db
      .collection("programmes")
      .add({
        title,
        description,
        date,
        time,
        venue,
        category,
        published: false,
        coverImage: "",
        photos: [],
        videos: [],
        photoCount: 0,
        videoCount: 0,
        createdBy: session.adminId,
        createdByUsername: session.username,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })

    return NextResponse.json({
      success: true,
      programme: {
        id: programmeRef.id,
        title,
        description,
        date,
        time,
        venue,
        category,
        published: false,
        photos: [],
        videos: [],
        photoCount: 0,
        videoCount: 0,
      },
    })
  } catch (error) {
    console.error("Create programme error:", error)

    return NextResponse.json(
      {
        error: "Unable to create programme.",
      },
      { status: 500 }
    )
  }
}
