"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import {
  ArrowRight,
  Play,
  Sparkles,
  Globe2,
  Users,
  Flame,
  Eye,
} from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import { ministries } from "@/data/ministries"

const icons = [Globe2, Flame, Users]

type MediaItem = {
  id: string
  url: string
  title?: string
  caption?: string
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




function ProgramsSection() {
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProgrammes() {
      try {
        const response = await fetch("/api/programmes")

        if (!response.ok) {
          throw new Error("Unable to load programmes.")
        }

        const data = await response.json()
        setProgrammes(data.programmes || [])
      } catch (error) {
        console.error("Unable to load programmes:", error)
        setProgrammes([])
      } finally {
        setLoading(false)
      }
    }

    loadProgrammes()
  }, [])

  useEffect(() => {
    if (currentIndex >= programmes.length && programmes.length > 0) {
      setCurrentIndex(0)
    }
  }, [programmes.length, currentIndex])

  const programme = programmes[currentIndex]

  function previousProgramme() {
    setCurrentIndex((current) =>
      current === 0 ? programmes.length - 1 : current - 1
    )
  }

  function nextProgramme() {
    setCurrentIndex((current) =>
      current === programmes.length - 1 ? 0 : current + 1
    )
  }

  return (
    <section
      id="programs"
      className="relative overflow-hidden bg-[#071B4D] px-6 py-28 lg:px-8"
    >
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#3B82F6]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
          Programs
        </p>

        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Watch, listen and experience what God is doing.
          </h2>

          {!loading && programmes.length > 0 && (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={previousProgramme}
                aria-label="Previous programme"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              >
                ←
              </button>

              <span className="min-w-[70px] text-center text-sm font-semibold text-white/70">
                {currentIndex + 1} / {programmes.length}
              </span>

              <button
                type="button"
                onClick={nextProgramme}
                aria-label="Next programme"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
              >
                →
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-white/50">
              Loading programmes...
            </p>
          </div>
        ) : !programme ? (
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-white/50">
              No programmes have been published yet.
            </p>
          </div>
        ) : (
          <article className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl backdrop-blur-xl">
            <div className="grid lg:grid-cols-2">
              {(() => {
                const image =
                  programme.coverImage ||
                  programme.photos?.[0]?.url ||
                  ""

                return image ? (
                  <div className="flex min-h-[280px] items-center justify-center overflow-hidden bg-white/5 p-4 sm:p-6 lg:min-h-[500px]">
                    <img
                      src={image}
                      alt={programme.title}
                      className="max-h-[600px] w-full rounded-2xl object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[280px] items-center justify-center bg-gradient-to-br from-[#0B286B] to-[#071B4D] lg:min-h-[500px]">
                    <Play size={60} className="text-[#D4AF37]" />
                  </div>
                )
              })()}

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                {programme.category && (
                  <span className="w-fit rounded-full bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#071B4D]">
                    {programme.category}
                  </span>
                )}

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  {programme.date}
                </p>

                <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  {programme.title}
                </h3>

                {programme.description && (
                  <p className="mt-5 text-sm leading-7 text-blue-100/60">
                    {programme.description}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/60">
                  {programme.time && (
                    <span className="rounded-full bg-white/5 px-3 py-2">
                      {programme.time}
                    </span>
                  )}

                  {programme.venue && (
                    <span className="rounded-full bg-white/5 px-3 py-2">
                      {programme.venue}
                    </span>
                  )}
                </div>

                <Link
                  href={`/programmes/${programme.id}`}
                  className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#071B4D] transition hover:bg-[#F0D477]"
                >
                  View Programme
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#0B1635]">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-[#071B4D]">
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#3B82F6]/20 blur-3xl" />

          <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#3B82F6]/10 blur-3xl" />
        </div>

        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-32 lg:px-8">
          <div className="grid w-full items-center gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#F0D477]"
              >
                <Sparkles size={15} />
                Welcome to our ministry
              </motion.div>

              <h1 className="max-w-5xl text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-8xl">
                Taking the Gospel
                <span className="mt-2 block text-[#D4AF37]">
                  beyond boundaries.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-blue-100/70 sm:text-lg">
                Continental Outreach Ministries Int&apos;l exists to reach
                lives, raise leaders and create platforms where people can
                encounter God and fulfil their purpose.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="#ministries"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-[#071B4D] shadow-xl transition hover:scale-[1.03] hover:bg-[#F0D477]"
                >
                  Explore Our Ministries
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="#programs"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-medium text-white backdrop-blur transition hover:bg-white/10"
                >
                  <Play size={17} />
                  Watch Programs
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto aspect-square max-w-md">
                <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20" />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-8 rounded-full border border-dashed border-[#3B82F6]/40"
                />

                <div className="absolute inset-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#0B286B] to-[#071B4D] shadow-2xl">
                  <div className="text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#D4AF37] text-3xl font-black text-[#071B4D] shadow-xl">
                      C
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F0D477]">
                      Faith
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                      Beyond Boundaries
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -right-2 top-20 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl"
                >
                  <Globe2 className="text-[#D4AF37]" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-16 -left-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl"
                >
                  <Users className="text-[#3B82F6]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* INTRODUCTION */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Who we are
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-[#071B4D] sm:text-6xl">
              One vision.
              <br />
              <span className="text-[#3B82F6]">Multiple expressions.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-base leading-8 text-slate-500 sm:text-lg"
          >
            Through our different ministry expressions, we create spaces for
            outreach, worship, spiritual development and the raising of the
            next generation of ministers.
          </motion.p>
        </div>
      </section>

      {/* MINISTRIES */}
      <section
        id="ministries"
        className="bg-slate-50 px-6 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
                Our ministries
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-[#071B4D] sm:text-6xl">
                Find your place.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500">
              Explore the different expressions of our ministry and discover
              the community that speaks to your journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {ministries.map((ministry, index) => {
              const Icon = icons[index]

              return (
                <motion.article
                  key={ministry.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                  }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-2xl"
                >
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#3B82F6]/5 blur-3xl transition group-hover:bg-[#3B82F6]/15" />

                  <div className="relative">
                    <div className="mb-16 flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#071B4D] text-[#D4AF37] transition group-hover:bg-[#D4AF37] group-hover:text-[#071B4D]">
                        <Icon size={25} />
                      </div>

                      <span className="text-sm font-bold text-slate-300">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold leading-tight text-[#071B4D]">
                      {ministry.name}
                    </h3>

                    <p className="mt-5 text-sm leading-7 text-slate-500">
                      {ministry.description}
                    </p>

                    <Link
                      href={ministry.route}
                      className="group/link mt-8 inline-flex items-center gap-2 font-semibold text-[#071B4D]"
                    >
                      Learn More
                      <ArrowRight
                        size={17}
                        className="text-[#D4AF37] transition-transform group-hover/link:translate-x-2"
                      />
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <ProgramsSection />

      {/* CONTACT CTA */}
      <section className="px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071B4D] to-[#0B286B] p-8 sm:p-12 lg:p-20"
        >
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
              Connect with us
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              There is a place for you here.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-blue-100/60">
              We would love to hear from you, pray with you and help you
              connect with the right ministry expression.
            </p>

            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-[#071B4D] transition hover:scale-105 hover:bg-[#F0D477]"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
