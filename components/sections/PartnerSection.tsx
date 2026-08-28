"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Building2,
  Bus,
  HeartHandshake,
  Lightbulb,
  Megaphone,
  Mic2,
  Monitor,
  Music,
  Radio,
  Wallet,
} from "lucide-react"

const needs = [
  {
    number: "01",
    title: "A place of worship",
    description: "A place of worship around the Ojodu/Berger axis.",
    icon: Building2,
  },
  {
    number: "02",
    title: "Musical Instruments",
    description: "Musical instruments to support worship and ministry.",
    icon: Music,
  },
  {
    number: "03",
    title: "Sound Equipments",
    description: "Sound equipment for services, outreaches and conferences.",
    icon: Mic2,
  },
  {
    number: "04",
    title: "Media Gadgets",
    description: "Media gadgets to help us reach more people beyond borders.",
    icon: Monitor,
  },
  {
    number: "05",
    title: "Evangelism Buses",
    description: "Evangelism buses for outreaches and Gospel missions.",
    icon: Bus,
  },
  {
    number: "06",
    title: "Technical Equipments",
    description: "Technical equipment required for effective ministry operations.",
    icon: Radio,
  },
  {
    number: "07",
    title: "Lighting",
    description: "Lighting equipment for worship, media and ministry events.",
    icon: Lightbulb,
  },
]

export default function PartnerSection() {
  return (
    <section className="relative overflow-hidden bg-[#071B4D] px-6 py-24 lg:px-8">
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-[#3B82F6]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#071B4D]">
            <HeartHandshake size={30} />
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Kingdom Partnership
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white sm:text-6xl">
            Partner With Us
          </h2>

          <p className="mt-6 text-lg leading-8 text-blue-100/70">
            Join hands with us to build a place to worship the Lord,
            fellowship with the brethren and propagate the Gospel of Grace
            beyond borders.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-14 max-w-5xl rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl sm:p-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Luke 8
          </p>

          <div className="mt-7 space-y-6 text-base leading-8 text-blue-100/75">
            <p>
              And also some women who had been cured of evil spirits and
              diseases: Mary, called Magdalene, from whom seven demons had
              been expelled;
            </p>

            <p>
              And Joanna, the wife of Chuza, Herod&apos;s household manager;
              and Susanna; and many others, who ministered to and provided
              for Him and them out of their property and personal belongings.
            </p>

            <p>
              Jesus, during his earthly ministry, received the help and
              partnership of men because the Kingdom of God needs money to
              advance beyond borders.
            </p>

            <p>
              We call on kingdom partners to join hands with us to build a
              place to worship the Lord, fellowship with the brethren and
              also propagate the gospel of Grace beyond borders.
            </p>

            <p>
              The 21st Century Church requires money to advance beyond
              borders, and we implore you to honour the Lord with your
              substance by partnering with us.
            </p>

            <p>
              You could partner with us weekly, monthly and/or as the Holy
              Spirit inspires you to do so.
            </p>
          </div>
        </motion.div>

        <div className="mt-20">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              Our Needs
            </p>

            <h3 className="mt-4 text-3xl font-bold text-white sm:text-5xl">
              Help us advance the work
            </h3>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-blue-100/60">
              You could be stirred by the Lord to partner with us materially
              or financially.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {needs.map((need, index) => {
              const Icon = need.icon

              return (
                <motion.div
                  key={need.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#071B4D]">
                      <Icon size={22} />
                    </div>

                    <span className="text-xs font-bold tracking-widest text-white/30">
                      {need.number}
                    </span>
                  </div>

                  <h4 className="mt-6 text-xl font-bold text-white">
                    {need.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-blue-100/55">
                    {need.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-[2.5rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-8 sm:p-12"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#071B4D]">
                  <Wallet size={23} />
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#F0D477]">
                  Our Budget
                </p>
              </div>

              <p className="mt-6 text-4xl font-black text-white sm:text-6xl">
                ₦5bn – ₦10bn
              </p>

              <p className="mt-5 max-w-2xl leading-8 text-blue-100/65">
                You could partner with Timothy Kolawole Babalola and the
                various expressions of God through him. When you do so, you
                play a pivotal role in helping lives get transformed,
                destinies shaped, and people fulfil purpose.
              </p>
            </div>

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#D4AF37] text-[#071B4D]">
              <Megaphone size={38} />
            </div>
          </div>
        </motion.div>

        <div className="mt-14 text-center">
          <p className="mx-auto max-w-3xl text-lg leading-8 text-blue-100/70">
            You could partner with us weekly, monthly and/or as the Holy
            Spirit inspires you. Every contribution helps us take the Gospel
            further and serve more lives.
          </p>

          <a
            href="https://wa.me/2348101684398"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-bold text-[#071B4D] transition hover:scale-105 hover:bg-[#F0D477]"
          >
            Partner With Us
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
