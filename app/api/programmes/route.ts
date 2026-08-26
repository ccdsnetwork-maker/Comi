import { NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"

export async function GET() {
  try {
    const snapshot = await db
      .collection("programmes")
      .get()

    const programmes = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((programme: any) => programme.published === true)
      .sort((a: any, b: any) =>
        String(b.date || "").localeCompare(String(a.date || ""))
      )

    return NextResponse.json({
      success: true,
      programmes,
    })

  } catch (error: any) {
    console.error("Public programmes error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error",
      },
      {
        status: 500,
      }
    )
  }
}
