"use client"

import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ministries } from "@/data/ministries"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ministriesOpen, setMinistriesOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#071B4D]/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
              <img
                src="/images/comi.jpg"
                alt="COMI logo"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                COMI
              </p>

              <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]">
                CONTINENTAL OUTREACH
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">

            <Link
              href="/"
              className="text-sm text-white/80 transition hover:text-[#D4AF37]"
            >
              Home
            </Link>

            <div className="relative">
              <button
                onClick={() => setMinistriesOpen(!ministriesOpen)}
                className="flex items-center gap-1 text-sm text-white/80 transition hover:text-[#D4AF37]"
              >
                Ministries

                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    ministriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {ministriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#071B4D] p-2 shadow-2xl"
                  >
                    {ministries.map((ministry) => (
                      <Link
                        key={ministry.id}
                        href={ministry.route}
                        onClick={() => setMinistriesOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-[#D4AF37]"
                      >
                        {ministry.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/#programs"
              className="text-sm text-white/80 transition hover:text-[#D4AF37]"
            >
              Programs
            </Link>

            <Link
              href="/contact"
              className="rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-[#071B4D] transition hover:scale-105 hover:bg-[#F0D477]"
            >
              Contact Us
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="space-y-2 pb-2 pt-5">

                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-white/80 hover:bg-white/10"
                >
                  Home
                </Link>

                <p className="px-4 pt-3 text-xs uppercase tracking-widest text-[#D4AF37]">
                  Ministries
                </p>

                {ministries.map((ministry) => (
                  <Link
                    key={ministry.id}
                    href={ministry.route}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/10"
                  >
                    {ministry.name}
                  </Link>
                ))}

                <Link
                  href="/#programs"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-white/80 hover:bg-white/10"
                >
                  Programs
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-xl bg-[#D4AF37] px-4 py-3 text-center font-semibold text-[#071B4D]"
                >
                  Contact Us
                </Link>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
