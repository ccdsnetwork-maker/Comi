import { NextResponse } from "next/server"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const name = String(body.name || "").trim()
    const email = String(body.email || "").trim()
    const phone = String(body.phone || "").trim()
    const subject = String(body.subject || "").trim()
    const message = String(body.message || "").trim()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          error: "Please complete all required fields.",
        },
        {
          status: 400,
        }
      )
    }

    await addDoc(collection(db, "messages"), {
      name,
      email,
      phone,
      subject,
      message,
      status: "unread",
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error("Contact message error:", error)

    return NextResponse.json(
      {
        error: "Unable to send your message right now.",
      },
      {
        status: 500,
      }
    )
  }
}
