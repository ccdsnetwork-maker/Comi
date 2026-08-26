"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { LockKeyhole, LogIn, UserRound } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Invalid username or password.")
        return
      }

      router.push("/admin")
      router.refresh()
    } catch {
      setError("Unable to connect to the server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#07111F] px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl sm:p-9">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4C542] text-[#07111F]">
              <LockKeyhole size={30} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-white/60">
              Sign in to manage the church website
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Username
              </label>

              <div className="relative">
                <UserRound
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/35 focus:border-[#F4C542] focus:ring-1 focus:ring-[#F4C542]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-12 pr-4 text-white outline-none placeholder:text-white/35 focus:border-[#F4C542] focus:ring-1 focus:ring-[#F4C542]"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#F4C542] px-5 py-4 font-bold text-[#07111F] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn size={19} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-7 text-center">
            <a
              href="/"
              className="text-sm text-white/50 transition hover:text-white"
            >
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
