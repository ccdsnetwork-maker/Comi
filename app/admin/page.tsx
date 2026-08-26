import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyAdminSession, SESSION_COOKIE } from "@/lib/admin-auth"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) {
    redirect("/admin/login")
  }

  const session = await verifyAdminSession(token)

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <AdminDashboard username={session.username} />
  )
}
