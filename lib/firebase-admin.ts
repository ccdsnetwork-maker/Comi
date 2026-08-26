import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL

let privateKey = process.env.FIREBASE_PRIVATE_KEY

if (!privateKey && process.env.FIREBASE_PRIVATE_KEY_BASE64) {
  privateKey = Buffer.from(
    process.env.FIREBASE_PRIVATE_KEY_BASE64,
    "base64"
  ).toString("utf8")
}

privateKey = privateKey
  ?.replace(/\\n/g, "\n")
  .replace(/\\r/g, "")
  .replace(/\r\n/g, "\n")
  .trim()

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Missing Firebase Admin environment variables."
  )
}

if (
  !privateKey.startsWith("-----BEGIN PRIVATE KEY-----") ||
  !privateKey.includes("-----END PRIVATE KEY-----")
) {
  throw new Error(
    "Firebase private key format is invalid."
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
