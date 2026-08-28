import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import TeamLeadSection from "@/components/sections/TeamLeadSection"
import PartnerSection from "@/components/sections/PartnerSection"

export default function PartnerWithUsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#0B1635]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#071B4D] pt-32">
        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-[#3B82F6]/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center lg:px-8 lg:py-32">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
            Kingdom Partnership
          </p>

          <h1 className="mt-4 text-5xl font-bold text-white sm:text-7xl">
            Partner With Us
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-blue-100/70">
            Join hands with us to propagate the Gospel of Grace beyond
            borders, support the work of ministry and help transform lives.
          </p>
        </div>
      </section>

      <TeamLeadSection />
      <PartnerSection />

      <Footer />
    </main>
  )
}
