"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Globe2,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react"
import Navbar from "@/components/Navbar"

export default function ContinentalOutreachPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#0B1635]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071B4D] pt-32">
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[#3B82F6]/20 blur-3xl" />
          <div className="absolute right-0 top-10 h-[400px] w-[400px] rounded-full bg-[#D4AF37]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-blue-100/60 transition hover:text-[#D4AF37]"
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
                <Globe2 size={16} />
                Our Ministry
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                Continental
                <span className="block text-[#D4AF37]">
                  Outreach Ministries
                </span>
                <span className="block text-2xl text-blue-200/70 sm:text-3xl">
                  Int&apos;l
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-blue-100/70">
                Igniting the world through the Word and spreading the transforming
                message of Jesus Christ across communities, territories and
                nations.
              </p>

              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-[#071B4D] transition hover:scale-105 hover:bg-[#F0D477]"
              >
                Connect With Us
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative mx-auto h-[350px] w-[350px] sm:h-[450px] sm:w-[450px]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/30"
              />

              <div className="absolute inset-10 flex items-center justify-center rounded-full border border-[#3B82F6]/30 bg-[#0B286B]/50 p-8 backdrop-blur-xl">
                <img
                  src="/images/comi.jpg"
                  alt="Continental Outreach Ministries International"
                  className="h-full w-full rounded-full object-contain"
                />
              </div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute right-0 top-20 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
              >
                <Heart className="text-[#D4AF37]" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-0 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
              >
                <MapPin className="text-[#3B82F6]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                Our mandate
              </p>

              <h2 className="text-4xl font-bold leading-tight text-[#071B4D] sm:text-6xl">
                Taking Christ
                <span className="block text-[#3B82F6]">
                  beyond boundaries.
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-slate-500"
            >
              <p className="text-lg leading-8">
                Continental Outreach Ministries Int&apos;l is focused on
                extending the reach of the Gospel across communities,
                territories and nations.
              </p>

              <p className="leading-8">
                We believe that every person deserves the opportunity to hear
                the Gospel, encounter God and discover the purpose for which
                they were created.
              </p>

              <p className="leading-8">
                Through outreach initiatives, evangelism, leadership
                development and strategic partnerships, we seek to make a
                lasting Kingdom impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-slate-50 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              What drives us
            </p>

            <h2 className="text-4xl font-bold text-[#071B4D] sm:text-5xl">
              Our core focus
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Globe2,
                title: "Reach",
                text: "Taking the message of Christ to people and communities wherever they may be.",
              },
              {
                icon: Heart,
                title: "Transform",
                text: "Creating opportunities for people to encounter God and experience meaningful transformation.",
              },
              {
                icon: Sparkles,
                title: "Raise",
                text: "Equipping believers and raising people who can continue the work of the Kingdom.",
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
                  className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
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

      {/* CTA */}
      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#071B4D] p-10 text-center sm:p-16 lg:p-24">
          <Sparkles className="mx-auto mb-7 text-[#D4AF37]" size={30} />

          <h2 className="mx-auto max-w-3xl text-4xl font-bold text-white sm:text-6xl">
            Be part of the mission.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-blue-100/60">
            Join us as we continue taking the Gospel beyond boundaries and
            touching lives across communities and nations.
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-[#071B4D] transition hover:scale-105"
          >
            Get Connected
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  )
}
