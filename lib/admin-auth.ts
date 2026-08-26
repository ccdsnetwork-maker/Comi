import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"

const SESSION_COOKIE = "comi_admin_session"

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET is missing from .env.local"
    )
  }

  return new TextEncoder().encode(secret)
}

export async function createPasswordHash(password: string) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  passwordHash: string
) {
  return bcrypt.compare(password, passwordHash)
}

export async function createAdminSession(
  adminId: string,
  username: string
) {
  return new SignJWT({
    adminId,
    username,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretKey())
}

export async function verifyAdminSession(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      getSecretKey()
    )

    if (
      payload.role !== "admin" ||
      typeof payload.adminId !== "string" ||
      typeof payload.username !== "string"
    ) {
      return null
    }

    return {
      adminId: payload.adminId,
      username: payload.username,
    }
  } catch {
    return null
  }
}

export { SESSION_COOKIE }
