import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

function getFirebasePrivateKey() {
  const raw = process.env.FIREBASE_PRIVATE_KEY

  if (!raw) {
    return ""
  }

  let key = raw.trim()

  // Remove surrounding quotes if they were stored with the value.
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1)
  }

  // Handle JSON-style escaped newlines and double-escaped newlines.
  key = key
    .replace(/\\\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "")

  // Remove accidental whitespace around the PEM boundaries.
  key = key.trim()

  return key
}

const projectId = process.env.FIREBASE_PROJECT_ID?.trim()
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim()
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
