"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Play,
} from "lucide-react"

type MediaItem = {
  id: string
  url: string
  title?: string
  caption?: string
  uploadedBy?: string
  uploadedAt?: string
}

type Programme = {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  venue?: string
  category?: string
  coverImage?: string
  photos?: MediaItem[]
  videos?: MediaItem[]
}

export default function ProgrammePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [programme, setProgramme] = useState<Programme | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadProgramme() {
      try {
        const { id } = await params

        const response = await fetch(`/api/programmes/${id}`)

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Programme not found.")
        }

        setProgramme(data.programme)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load programme."
        )
      } finally {
        setLoading(false)
      }
    }

    loadProgramme()
  }, [params])

  if (loading) {
    return (
      <main className="min-h-screen bg-[#071B4D] px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-white/50">
            Loading programme...
          </p>
        </div>
      </main>
    )
  }

  if (error || !programme) {
    return (
      <main className="min-h-screen bg-[#071B4D] px-6 py-24 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold">
            Programme not found
          </h1>

          <p className="mt-4 text-white/50">
            {error || "This programme is no longer available."}
          </p>

          <Link
            href="/#programs"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 font-semibold text-[#071B4D]"
          >
            <ArrowLeft size={17} />
            Back to Programs
          </Link>
        </div>
      </main>
    )
  }

  const photos = programme.photos || []
  const videos = programme.videos || []

  return (
    <main className="min-h-screen bg-white text-[#071B4D]">
      {/* HERO */}
      <section className="bg-[#071B4D] px-6 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/#programs"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Programs
          </Link>

          {programme.category && (
            <span className="inline-flex rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#071B4D]">
              {programme.category}
            </span>
          )}

          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {programme.title}
          </h1>

          {programme.description && (
            <p className="mt-6 max-w-3xl text-base leading-8 text-blue-100/60 sm:text-lg">
              {programme.description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
            <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2.5">
              <CalendarDays size={16} />
              {programme.date}
            </span>

            {programme.time && (
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2.5">
                <Clock size={16} />
                {programme.time}
              </span>
            )}

            {programme.venue && (
              <span className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2.5">
                <MapPin size={16} />
                {programme.venue}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* PHOTOS */}
      {photos.length > 0 && (
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Programme Gallery
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                Pictures
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {photos.map((photo) => (
                <article
                  key={photo.id}
                  className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm"
                >
                  <div className="flex items-center justify-center bg-slate-100 p-3 sm:p-5">
                    <img
                      src={photo.url}
                      alt={photo.title || programme.title}
                      className="h-auto w-auto max-w-full rounded-xl object-contain"
                    />
                  </div>

                  {(photo.title || photo.caption) && (
                    <div className="p-6">
                      {photo.title && (
                        <h3 className="text-lg font-bold">
                          {photo.title}
                        </h3>
                      )}

                      {photo.caption && (
                        <p className="mt-2 text-sm leading-7 text-slate-500">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VIDEOS */}
      {videos.length > 0 && (
        <section className="bg-slate-50 px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Programme Media
              </p>

              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                Videos
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {videos.map((video) => (
                <article
                  key={video.id}
                  className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
                >
                  <div className="bg-black">
                    <video
                      src={video.url}
                      controls
                      preload="metadata"
                      className="h-auto max-h-[600px] w-full"
                    />
                  </div>

                  {(video.title || video.caption) && (
                    <div className="p-6">
                      {video.title && (
                        <h3 className="text-lg font-bold">
                          {video.title}
                        </h3>
                      )}

                      {video.caption && (
                        <p className="mt-2 text-sm leading-7 text-slate-500">
                          {video.caption}
                        </p>
                      )}
                    </div>
                  )}

                  {!video.title && !video.caption && (
                    <div className="flex items-center gap-2 p-5 text-sm font-semibold text-[#071B4D]">
                      <Play size={17} className="text-[#D4AF37]" />
                      Programme Video
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* NO MEDIA */}
      {photos.length === 0 && videos.length === 0 && (
        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-50 p-10 text-center">
            <p className="text-slate-500">
              Media for this programme will be available here soon.
            </p>
          </div>
        </section>
      )}

      {/* FOOTER CTA */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#071B4D] p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Explore more of our programs
          </h2>

          <Link
            href="/#programs"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 font-bold text-[#071B4D]"
          >
            <ArrowLeft size={17} />
            Back to Programs
          </Link>
        </div>
      </section>
    </main>
  )
}
