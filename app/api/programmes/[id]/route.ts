import { NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"

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

    const programme = doc.data()

    if (!programme?.published) {
      return NextResponse.json(
        { error: "Programme not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      programme: {
        id: doc.id,
        ...programme,
      },
    })
  } catch (error) {
    console.error("Get public programme error:", error)

    return NextResponse.json(
      { error: "Unable to load programme." },
      { status: 500 }
    )
  }
}
