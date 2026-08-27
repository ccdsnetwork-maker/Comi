import Link from "next/link"
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa"

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/comiconnects",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/comiconnects",
    icon: FaInstagram,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@comiconnects",
    icon: FaTiktok,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@comiconnects",
    icon: FaYoutube,
  },
  {
    name: "Telegram",
    href: "https://t.me/comiconects",
    icon: FaTelegramPlane,
  },
]

const quickLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Continental Outreach Ministries",
    href: "/continental-outreach",
  },
  {
    label: "The Glory Arena Global",
    href: "/glory-arena",
  },
  {
    label: "Young Ministers Haven",
    href: "/young-ministers-haven",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#06183F] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="grid gap-9 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                <img
                  src="/images/comi.jpg"
                  alt="COMI logo"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="font-bold leading-tight">
                  COMI
                </p>

                <p className="text-xs text-white/80">
                  Continental Outreach Ministries Int&apos;l
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/85">
              Connecting people, raising ministers and advancing God&apos;s
              purpose through our family of ministries.
            </p>

            <div className="mt-5 flex gap-2">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#06183F]"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              Quick Links
            </h3>

            <nav className="grid gap-2.5">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="w-fit text-sm text-white/85 transition duration-200 hover:text-[#D4AF37]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              Contact Us
            </h3>

            <div className="grid gap-2.5 text-sm text-white/85">

              <a
                href="tel:08101684398"
                className="transition hover:text-[#D4AF37]"
              >
                08101684398
              </a>

              <a
                href="tel:09013754164"
                className="transition hover:text-[#D4AF37]"
              >
                09013754164
              </a>

              <a
                href="tel:08139318139"
                className="transition hover:text-[#D4AF37]"
              >
                08139318139
              </a>

              <a
                href="mailto:comiconnects@gmail.com"
                className="break-all transition hover:text-[#D4AF37]"
              >
                comiconnects@gmail.com
              </a>

              <a
                href="https://wa.me/2348101684398"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 w-fit rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#06183F] transition hover:-translate-y-0.5 hover:bg-[#F0D477]"
              >
                WhatsApp Us
              </a>

            </div>
          </div>

        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Continental Outreach Ministries Int&apos;l.
            All rights reserved.
          </p>

          <p>
            Built with faith, purpose and excellence.
          </p>
        </div>

      </div>
    </footer>
  )
}
