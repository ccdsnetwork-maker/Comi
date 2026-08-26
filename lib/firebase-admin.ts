import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

function getPrivateKey() {
  const encoded = process.env.FIREBASE_PRIVATE_KEY_BASE64

  if (encoded) {
    try {
      return Buffer.from(encoded, "base64").toString("utf8")
    } catch {
      throw new Error("Unable to decode Firebase private key.")
    }
  }

  const raw = process.env.FIREBASE_PRIVATE_KEY

  if (!raw) {
    return ""
  }

  return raw
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "")
    .trim()
}

const projectId = process.env.FIREBASE_PROJECT_ID?.trim()
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim()
const privateKey = getPrivateKey()

if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Missing Firebase Admin environment variables.")
}

if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
  throw new Error("Invalid Firebase private key format.")
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
