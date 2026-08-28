import { NextResponse } from "next/server"
import { FieldValue } from "firebase-admin/firestore"
import { db } from "@/lib/firebase-admin"
import { createPasswordHash } from "@/lib/admin-auth"

export async function POST(request: Request) {
  try {
    const setupSecret = process.env.ADMIN_SETUP_SECRET

    if (!setupSecret) {
      return NextResponse.json(
        { error: "Admin setup is not configured." },
        { status: 500 }
      )
    }

    const providedSecret =
      request.headers.get("x-admin-setup-secret")

    if (
      !providedSecret ||
      providedSecret !== setupSecret
    ) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      )
    }

    const existingAdmins = await db
      .collection("admins")
      .limit(1)
      .get()

    if (!existingAdmins.empty) {
      return NextResponse.json(
        {
          error:
            "An admin already exists. Setup is already complete.",
        },
        { status: 409 }
      )
    }

    const username = "seyifunmi"
    const password = "seyifunmi"

    const passwordHash =
      await createPasswordHash(password)

    const adminRef = await db
      .collection("admins")
      .add({
        username,
        passwordHash,
        name: "Seyifunmi",
        role: "admin",
        active: true,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })

    return NextResponse.json({
      success: true,
      adminId: adminRef.id,
      username,
    })
  } catch (error) {
    console.error("Admin setup error:", error)

    return NextResponse.json(
      {
        error: "Unable to create admin.",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    )
  }
}
