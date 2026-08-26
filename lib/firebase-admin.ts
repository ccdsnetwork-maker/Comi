import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL

function getFirebasePrivateKey() {
  const base64Key = process.env.FIREBASE_PRIVATE_KEY_BASE64

  if (base64Key) {
    try {
      const decodedKey = Buffer.from(base64Key.trim(), "base64").toString("utf8")

      const normalizedKey = decodedKey
        .replace(/^["']|["']$/g, "")
        .replace(/\\n/g, "\n")
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "")
        .trim()

      if (
        normalizedKey.includes("-----BEGIN PRIVATE KEY-----") &&
        normalizedKey.includes("-----END PRIVATE KEY-----")
      ) {
        return normalizedKey
      }

      throw new Error("Decoded Firebase private key has an invalid PEM format.")
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Unable to decode Firebase private key: ${error.message}`)
      }

      throw new Error("Unable to decode Firebase private key.")
    }
  }

  const legacyKey = process.env.FIREBASE_PRIVATE_KEY

  if (legacyKey) {
    const normalizedKey = legacyKey
      .replace(/^["']|["']$/g, "")
      .replace(/\\n/g, "\n")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "")
      .trim()

    if (
      normalizedKey.includes("-----BEGIN PRIVATE KEY-----") &&
      normalizedKey.includes("-----END PRIVATE KEY-----")
    ) {
      return normalizedKey
    }
  }

  return null
}

const privateKey = getFirebasePrivateKey()

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Missing Firebase Admin environment variables."
  )
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
