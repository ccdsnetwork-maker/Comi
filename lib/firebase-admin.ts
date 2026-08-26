import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

function getFirebasePrivateKey(): string {
  const base64Key = process.env.FIREBASE_PRIVATE_KEY_BASE64

  if (base64Key) {
    try {
      const decoded = Buffer.from(base64Key.trim(), "base64").toString("utf8")

      const key = decoded
        .replace(/^"|"$/g, "")
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "")
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "")
        .trim()

      if (
        key.includes("-----BEGIN PRIVATE KEY-----") &&
        key.includes("-----END PRIVATE KEY-----")
      ) {
        return key
      }

      throw new Error(
        "Decoded Firebase private key does not contain a valid PEM header/footer."
      )
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Unable to decode Firebase private key: ${error.message}`
        )
      }

      throw new Error("Unable to decode Firebase private key.")
    }
  }

  const rawKey = process.env.FIREBASE_PRIVATE_KEY

  if (rawKey) {
    const key = rawKey
      .replace(/^"|"$/g, "")
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "")
      .trim()

    if (
      key.includes("-----BEGIN PRIVATE KEY-----") &&
      key.includes("-----END PRIVATE KEY-----")
    ) {
      return key
    }
  }

  throw new Error("Missing Firebase Admin environment variables.")
}

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = getFirebasePrivateKey()

if (!projectId || !clientEmail) {
  throw new Error("Missing Firebase Admin environment variables.")
}

const firebaseAdminApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      })

export const db = getFirestore(firebaseAdminApp)
