import { NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"

export async function GET() {
  try {
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
    console.error("Get public audio error:", error)

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
