import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { FieldValue } from "firebase-admin/firestore"
import { db } from "@/lib/firebase-admin"
import {
  SESSION_COOKIE,
  verifyAdminSession,
} from "@/lib/admin-auth"

const MAX_PHOTOS = 5
const MAX_VIDEOS = 2

async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) return null

  return verifyAdminSession(token)
}

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      )
    }

    const { id } = await context.params

    const programmeRef = db.collection("programmes").doc(id)
    const programmeSnapshot = await programmeRef.get()

    if (!programmeSnapshot.exists) {
      return NextResponse.json(
        { error: "Programme not found." },
        { status: 404 }
      )
    }

    const body = await request.json()

    const type = body.type === "video" ? "video" : "photo"
    const url = String(body.url || "").trim()
    const publicId = String(body.publicId || "").trim()

    if (!url) {
      return NextResponse.json(
        { error: "Media URL is required." },
        { status: 400 }
      )
    }

    const programme = programmeSnapshot.data() || {}

    const photos = Array.isArray(programme.photos)
      ? programme.photos
      : []

    const videos = Array.isArray(programme.videos)
      ? programme.videos
      : []

    if (type === "photo" && photos.length >= MAX_PHOTOS) {
      return NextResponse.json(
        {
          error:
            "This programme already has the maximum of 5 pictures.",
        },
        { status: 400 }
      )
    }

    if (type === "video" && videos.length >= MAX_VIDEOS) {
      return NextResponse.json(
        {
          error:
            "This programme already has the maximum of 2 videos.",
        },
        { status: 400 }
      )
    }

    const mediaItem = {
      id: crypto.randomUUID(),
      url,
      publicId,
      uploadedBy: session.username,
      uploadedAt: new Date().toISOString(),
    }

    if (type === "photo") {
      await programmeRef.update({
        photos: FieldValue.arrayUnion(mediaItem),
        photoCount: photos.length + 1,
        updatedAt: FieldValue.serverTimestamp(),
      })
    } else {
      await programmeRef.update({
        videos: FieldValue.arrayUnion(mediaItem),
        videoCount: videos.length + 1,
        updatedAt: FieldValue.serverTimestamp(),
      })
    }

    return NextResponse.json({
      success: true,
      media: mediaItem,
      limits: {
        photos: {
          used: type === "photo"
            ? photos.length + 1
            : photos.length,
          maximum: MAX_PHOTOS,
        },
        videos: {
          used: type === "video"
            ? videos.length + 1
            : videos.length,
          maximum: MAX_VIDEOS,
        },
      },
    })
  } catch (error) {
    console.error("Add programme media error:", error)

    return NextResponse.json(
      { error: "Unable to add programme media." },
      { status: 500 }
    )
  }
}
