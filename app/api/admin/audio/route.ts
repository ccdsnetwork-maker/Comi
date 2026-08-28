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

/**
 * GET
 * Returns all audio uploaded by administrators.
 */
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
      .collection("audio")
      .orderBy("uploadedAt", "desc")
      .get()

    const audio = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json({
      success: true,
      audio,
    })
  } catch (error) {
    console.error("Get admin audio error:", error)

    return NextResponse.json(
      {
        error: "Unable to load audio.",
      },
      {
        status: 500,
      }
    )
  }
}

/**
 * POST
 * Saves an uploaded audio file to the audio collection.
 */
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
    const url = String(body.url || "").trim()
    const publicId = String(body.publicId || "").trim()

    if (!title) {
      return NextResponse.json(
        {
          error: "Audio title is required.",
        },
        {
          status: 400,
        }
      )
    }

    if (!url) {
      return NextResponse.json(
        {
          error: "Audio URL is required.",
        },
        {
          status: 400,
        }
      )
    }

    const audioRef = await db.collection("audio").add({
      title,
      description,
      url,
      publicId,
      uploadedBy: session.username,
      uploadedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({
      success: true,
      audio: {
        id: audioRef.id,
        title,
        description,
        url,
        publicId,
        uploadedBy: session.username,
      },
    })
  } catch (error) {
    console.error("Create audio error:", error)

    return NextResponse.json(
      {
        error: "Unable to save audio.",
      },
      {
        status: 500,
      }
    )
  }
}

/**
 * DELETE
 * Deletes an audio record from Firestore.
 *
 * Cloudinary deletion will be handled separately so that
 * deleting a Firestore record never accidentally breaks
 * the existing programme media system.
 */
export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      )
    }

    const body = await request.json()
    const id = String(body.id || "").trim()

    if (!id) {
      return NextResponse.json(
        {
          error: "Audio ID is required.",
        },
        {
          status: 400,
        }
      )
    }

    const audioRef = db.collection("audio").doc(id)
    const audioSnapshot = await audioRef.get()

    if (!audioSnapshot.exists) {
      return NextResponse.json(
        {
          error: "Audio not found.",
        },
        {
          status: 404,
        }
      )
    }

    await audioRef.delete()

    return NextResponse.json({
      success: true,
      message: "Audio deleted successfully.",
    })
  } catch (error) {
    console.error("Delete audio error:", error)

    return NextResponse.json(
      {
        error: "Unable to delete audio.",
      },
      {
        status: 500,
      }
    )
  }
}
