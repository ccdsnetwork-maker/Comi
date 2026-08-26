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

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  _request: Request,
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

    const doc = await db
      .collection("programmes")
      .doc(id)
      .get()

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Programme not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      programme: {
        id: doc.id,
        ...doc.data(),
      },
    })
  } catch (error) {
    console.error("Get programme error:", error)

    return NextResponse.json(
      { error: "Unable to load programme." },
      { status: 500 }
    )
  }
}

export async function PATCH(
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

    const programmeRef = db
      .collection("programmes")
      .doc(id)

    const existing = await programmeRef.get()

    if (!existing.exists) {
      return NextResponse.json(
        { error: "Programme not found." },
        { status: 404 }
      )
    }

    const body = await request.json()

    const updates: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
    }

    if (body.title !== undefined) {
      const title = String(body.title).trim()

      if (!title) {
        return NextResponse.json(
          { error: "Programme title cannot be empty." },
          { status: 400 }
        )
      }

      updates.title = title
    }

    if (body.description !== undefined) {
      updates.description = String(body.description).trim()
    }

    if (body.date !== undefined) {
      updates.date = String(body.date).trim()
    }

    if (body.time !== undefined) {
      updates.time = String(body.time).trim()
    }

    if (body.venue !== undefined) {
      updates.venue = String(body.venue).trim()
    }

    if (body.category !== undefined) {
      updates.category = String(body.category).trim()
    }

    if (body.published !== undefined) {
      updates.published = Boolean(body.published)
    }

    if (body.coverImage !== undefined) {
      updates.coverImage = String(body.coverImage).trim()
    }

    await programmeRef.update(updates)

    const updated = await programmeRef.get()

    return NextResponse.json({
      success: true,
      programme: {
        id: updated.id,
        ...updated.data(),
      },
    })
  } catch (error) {
    console.error("Update programme error:", error)

    return NextResponse.json(
      { error: "Unable to update programme." },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
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

    const programmeRef = db
      .collection("programmes")
      .doc(id)

    const existing = await programmeRef.get()

    if (!existing.exists) {
      return NextResponse.json(
        { error: "Programme not found." },
        { status: 404 }
      )
    }

    await programmeRef.delete()

    return NextResponse.json({
      success: true,
      message: "Programme deleted successfully.",
    })
  } catch (error) {
    console.error("Delete programme error:", error)

    return NextResponse.json(
      { error: "Unable to delete programme." },
      { status: 500 }
    )
  }
}
