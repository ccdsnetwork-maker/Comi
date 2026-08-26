"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Flame,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react"
import Navbar from "@/components/Navbar"

export default function YoungMinistersHavenPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#0B1635]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#071B4D] pt-32">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-[#3B82F6]/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
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
                <Users size={16} />
                Our Ministry
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                Young
                <span className="block text-[#D4AF37]">Ministers</span>
                <span className="block text-[#3B82F6]">Haven</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-blue-100/70">
                Raising, equipping and empowering the next generation of
                ministers to serve God and impact their world.
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
                className="absolute inset-0 rounded-[35%] border border-dashed border-[#D4AF37]/30"
              />

              <div className="absolute inset-12 flex items-center justify-center rounded-[30%] bg-gradient-to-br from-[#0B286B] to-[#071B4D] shadow-2xl">
                <div className="text-center">
                  <GraduationCap
                    size={80}
                    strokeWidth={1}
                    className="mx-auto text-[#D4AF37]"
                  />

                  <p className="mt-5 text-xs uppercase tracking-[0.35em] text-blue-200/60">
                    Raise
                  </p>

                  <p className="mt-2 text-2xl font-bold text-white">
                    The Next Generation
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute right-0 top-16 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
              >
                <Flame className="text-[#D4AF37]" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-16 left-0 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
              >
                <BookOpen className="text-[#3B82F6]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                Our mandate
              </p>

              <h2 className="text-4xl font-bold text-[#071B4D] sm:text-6xl">
                Raising ministers
                <span className="block text-[#3B82F6]">
                  for tomorrow.
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-500">
              <p className="text-lg leading-8">
                Young Ministers Haven is a platform dedicated to the growth,
                development and empowerment of young people called into
                ministry.
              </p>

              <p className="leading-8">
                We believe that the next generation should not only inherit
                ministry but should be prepared and equipped to lead with
                wisdom, character and spiritual depth.
              </p>

              <p className="leading-8">
                Through teaching, mentorship, fellowship and practical
                opportunities, we help young ministers discover and develop
                their God-given assignments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Our pillars
            </p>

            <h2 className="text-4xl font-bold text-[#071B4D] sm:text-5xl">
              Equip. Develop. Deploy.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Teach",
                text: "Building strong foundations through biblical teaching and sound spiritual understanding.",
              },
              {
                icon: GraduationCap,
                title: "Equip",
                text: "Developing practical ministry skills, leadership capacity and character.",
              },
              {
                icon: Flame,
                title: "Deploy",
                text: "Creating opportunities for young ministers to serve, lead and make Kingdom impact.",
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
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#071B4D] p-10 text-center sm:p-20">
          <Sparkles className="mx-auto mb-7 text-[#D4AF37]" size={30} />

          <h2 className="text-4xl font-bold text-white sm:text-6xl">
            Your calling deserves preparation.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-blue-100/60">
            Connect with Young Ministers Haven and become part of a community
            committed to raising the next generation.
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
