"use client"

import { motion } from "framer-motion"
import {
  Music2,
  UserRound,
  Landmark,
} from "lucide-react"
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6"

export default function TeamLeadSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 lg:px-8">
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-[#3B82F6]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Our Team Lead
          </p>

          <h2 className="text-4xl font-bold text-[#071B4D] sm:text-6xl">
            Meet the Team Lead
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-500">
            The man entrusted with leading the various expressions of God
            represented through this ministry.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 shadow-xl"
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex min-h-[420px] items-center justify-center bg-[#071B4D] p-10">
              <div className="text-center">
                <div className="mx-auto flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border-4 border-[#D4AF37]/40 bg-white/10 shadow-2xl">
                  <UserRound size={90} className="text-[#D4AF37]" />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                  Team Lead
                </p>

                <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  Timothy Kolawole Babalola
                </h3>
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-14">
              <p className="text-lg leading-8 text-slate-600">
                I am Timothy Kolawole Babalola, the Team Lead of the various
                expressions of God detailed on this website.
              </p>

              <p className="mt-6 leading-8 text-slate-600">
                I am a Son of God, ordained and commissioned to raise a
                generation of spiritual giants and ignite the world through
                the word of God, sound doctrine, and transforming lives
                according to God&apos;s will and pattern.
              </p>

              <p className="mt-6 leading-8 text-slate-600">
                I am envisioned and sent to raise a generation of
                spiritual/holy leaders in the Church and the Marketplace.
              </p>

              <p className="mt-6 leading-8 text-slate-600">
                My journey of faith has been filled with divine guidance,
                and I will be glad to lead you through the obscurity and
                uncertainties of life.
              </p>

              <div className="mt-9 border-t border-slate-200 pt-8">
                <p className="font-bold text-[#071B4D]">
                  Follow me on social media
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://facebook.com/Timothykolawolebabalola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#071B4D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B286B]"
                  >
                    <FaFacebookF size={15} />
                    Facebook
                  </a>

                  <a
                    href="https://instagram.com/Timothykolawolebabalola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#071B4D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B286B]"
                  >
                    <FaInstagram size={15} />
                    Instagram
                  </a>

                  <a
                    href="https://tiktok.com/@Timothykolawolebabalola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#071B4D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B286B]"
                  >
                    <FaTiktok size={15} />
                    TikTok
                  </a>

                  <a
                    href="https://youtube.com/@Timothykolawolebabalola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#071B4D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B286B]"
                  >
                    <FaYoutube size={15} />
                    YouTube
                  </a>

                  <a
                    href="https://x.com/Tkbabalola"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#071B4D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B286B]"
                  >
                    <FaXTwitter size={15} />
                    X
                  </a>
                </div>
              </div>

              <div className="mt-9 rounded-3xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#071B4D]">
                    <Landmark size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#071B4D]/60">
                      To Give to Timothy
                    </p>

                    <p className="mt-1 font-bold text-[#071B4D]">
                      Guarantee Trust Bank (GTBank Savings)
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-2xl font-black tracking-wider text-[#071B4D]">
                  0156712254
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  Account Name: Timothy Kolawole Babalola
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
