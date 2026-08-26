"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Flame,
  Heart,
  Sparkles,
  Star,
} from "lucide-react"
import Navbar from "@/components/Navbar"

export default function GloryArenaPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#0B1635]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#071B4D] pt-32">
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#3B82F6]/20 blur-3xl" />
          <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#D4AF37]/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-blue-100/60 hover:text-[#D4AF37]"
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>

          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#F0D477]">
                <Flame size={16} />
                Our Ministry
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                The
                <span className="block text-[#D4AF37]">Glory Arena</span>
                <span className="block">Global</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-blue-100/70">
                A place of encounter, worship, spiritual growth and the
                manifestation of God&apos;s glory.
              </p>

              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-[#071B4D] transition hover:scale-105"
              >
                Connect With Us
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative mx-auto flex h-[350px] w-[350px] items-center justify-center sm:h-[450px] sm:w-[450px]"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl"
              />

              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-gradient-to-br from-[#0B286B] to-[#071B4D] shadow-2xl sm:h-80 sm:w-80">
                <div className="text-center">
                  <Flame
                    size={85}
                    strokeWidth={1}
                    className="mx-auto text-[#D4AF37]"
                  />

                  <p className="mt-5 text-xs uppercase tracking-[0.4em] text-blue-200/60">
                    Encounter
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    His Glory
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-dashed border-[#3B82F6]/30"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                The vision
              </p>

              <h2 className="text-4xl font-bold text-[#071B4D] sm:text-6xl">
                An atmosphere for
                <span className="block text-[#3B82F6]">
                  divine encounters.
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-500">
              <p className="text-lg leading-8">
                The Glory Arena Global is a ministry expression built around
                the desire to create an atmosphere where people can encounter
                God and experience His presence.
              </p>

              <p className="leading-8">
                Through worship, teaching, prayer and fellowship, we encourage
                people to deepen their relationship with God and grow in their
                faith.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Encounter",
                text: "Creating environments where people can experience the presence of God.",
              },
              {
                icon: Heart,
                title: "Worship",
                text: "Expressing genuine love and devotion to God through worship.",
              },
              {
                icon: Star,
                title: "Growth",
                text: "Helping believers grow deeper in faith, understanding and purpose.",
              },
            ].map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="rounded-[2rem] bg-white p-8 shadow-sm"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#071B4D] text-[#D4AF37]">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-2xl font-bold text-[#071B4D]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {item.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-gradient-to-br from-[#071B4D] to-[#0B286B] p-10 text-center sm:p-20">
          <h2 className="text-4xl font-bold text-white sm:text-6xl">
            Come into the Arena.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-blue-100/60">
            Experience worship, fellowship, prayer and the transforming
            presence of God.
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-[#071B4D]"
          >
            Get Connected
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
