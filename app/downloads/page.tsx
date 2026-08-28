"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowDownToLine,
  CalendarDays,
  Download,
  FileAudio,
  Loader2,
  Play,
  Video,
} from "lucide-react"

type MediaItem = {
  id: string
  url: string
  publicId?: string
  title?: string
  caption?: string
  uploadedBy?: string
  uploadedAt?: string
}

type AudioItem = {
  id: string
  title: string
  description?: string
  url: string
  publicId?: string
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
  published?: boolean
  videos?: MediaItem[]
}

export default function DownloadsPage() {
  const [audio, setAudio] = useState<AudioItem[]>([])
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadDownloads() {
      try {
        setLoading(true)
        setError("")

        const [audioResponse, programmesResponse] =
          await Promise.all([
            fetch("/api/audio", {
              cache: "no-store",
            }),
            fetch("/api/programmes", {
              cache: "no-store",
            }),
          ])

        const audioData = await audioResponse.json()
        const programmesData =
          await programmesResponse.json()

        if (!audioResponse.ok) {
          throw new Error(
            audioData.error || "Unable to load audio."
          )
        }

        if (!programmesResponse.ok) {
          throw new Error(
            programmesData.error ||
              "Unable to load programme videos."
          )
        }

        setAudio(audioData.audio || [])

        setProgrammes(
          (programmesData.programmes || []).filter(
            (programme: Programme) =>
              programme.published !== false &&
              Array.isArray(programme.videos) &&
              programme.videos.length > 0
          )
        )
      } catch (err) {
        console.error("Load downloads error:", err)

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load downloads."
        )
      } finally {
        setLoading(false)
      }
    }

    loadDownloads()
  }, [])

  const videos = programmes.flatMap((programme) =>
    (programme.videos || []).map((video) => ({
      ...video,
      programme,
    }))
  )

  return (
    <main className="min-h-screen bg-[#07111F] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-16 pt-36 sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_35%)]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              COMI MEDIA LIBRARY
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Downloads
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
              Access sermons, teachings, messages and
              programme videos from Continental Outreach
              Ministries International.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3 text-white/60">
                <Loader2
                  size={24}
                  className="animate-spin text-[#D4AF37]"
                />
                Loading media...
              </div>
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-8 text-center">
              <p className="font-semibold text-red-200">
                {error}
              </p>

              <button
                onClick={() => window.location.reload()}
                className="mt-5 rounded-xl bg-[#D4AF37] px-5 py-3 font-bold text-[#071B4D]"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* AUDIO */}
              <section>
                <div className="mb-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#071B4D]">
                      <FileAudio size={21} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold sm:text-3xl">
                        Audio
                      </h2>

                      <p className="text-sm text-white/40">
                        Sermons, teachings and messages
                      </p>
                    </div>
                  </div>
                </div>

                {audio.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
                    <FileAudio
                      size={38}
                      className="mx-auto mb-3 text-white/25"
                    />

                    <p className="font-semibold">
                      No audio available yet.
                    </p>

                    <p className="mt-1 text-sm text-white/40">
                      New audio materials will appear here
                      when they are uploaded.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-5">
                    {audio.map((item) => (
                      <article
                        key={item.id}
                        className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 transition hover:bg-white/[0.07] sm:p-6"
                      >
                        <div className="flex flex-col gap-5">
                          <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                              <FileAudio size={22} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="text-lg font-bold">
                                {item.title}
                              </h3>

                              {item.description && (
                                <p className="mt-1 text-sm leading-6 text-white/50">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <audio
                            controls
                            preload="metadata"
                            src={item.url}
                            className="w-full"
                          >
                            Your browser does not support
                            audio playback.
                          </audio>

                          <div>
                            <a
                              href={item.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#071B4D] transition hover:bg-[#F0D477] sm:w-auto"
                            >
                              <Download size={17} />
                              Download Audio
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              {/* VIDEOS */}
              <section className="mt-16">
                <div className="mb-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#071B4D]">
                      <Video size={21} />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold sm:text-3xl">
                        Programme Videos
                      </h2>

                      <p className="text-sm text-white/40">
                        Watch and download videos from our
                        programmes
                      </p>
                    </div>
                  </div>
                </div>

                {videos.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
                    <Video
                      size={38}
                      className="mx-auto mb-3 text-white/25"
                    />

                    <p className="font-semibold">
                      No programme videos available yet.
                    </p>

                    <p className="mt-1 text-sm text-white/40">
                      Programme videos uploaded by the
                      administrators will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 lg:grid-cols-2">
                    {videos.map((video) => (
                      <article
                        key={`${video.programme.id}-${video.id}`}
                        className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05]"
                      >
                        <div className="aspect-video bg-black">
                          <video
                            controls
                            preload="metadata"
                            src={video.url}
                            className="h-full w-full object-contain"
                          >
                            Your browser does not support
                            video playback.
                          </video>
                        </div>

                        <div className="p-5">
                          <div className="mb-4 flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                              <Play size={18} />
                            </div>

                            <div className="min-w-0">
                              <h3 className="font-bold">
                                {video.title ||
                                  video.caption ||
                                  video.programme.title}
                              </h3>

                              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/40">
                                <span className="flex items-center gap-1.5">
                                  <CalendarDays size={13} />
                                  {video.programme.date}
                                </span>

                                <span>
                                  {video.programme.title}
                                </span>
                              </div>
                            </div>
                          </div>

                          <a
                            href={video.url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold transition hover:bg-white/15"
                          >
                            <ArrowDownToLine size={17} />
                            Download Video
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>

              {/* EMPTY STATE */}
              {audio.length === 0 &&
                videos.length === 0 && (
                  <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
                    <Download
                      size={42}
                      className="mx-auto mb-4 text-[#D4AF37]"
                    />

                    <h2 className="text-xl font-bold">
                      Media library is being prepared
                    </h2>

                    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/40">
                      Check back soon for sermons, teachings,
                      audio messages and programme videos.
                    </p>

                    <Link
                      href="/"
                      className="mt-6 inline-flex rounded-xl bg-[#D4AF37] px-5 py-3 font-bold text-[#071B4D]"
                    >
                      Return Home
                    </Link>
                  </div>
                )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
