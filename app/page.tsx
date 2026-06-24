import WaitlistForm from "@/components/WaitlistForm";

const faqs = [
  {
    q: "When does Prismflow launch?",
    a: "We're in development and don't have a confirmed launch date yet. Joining the waitlist means you'll be among the first to know when we open our doors.",
  },
  {
    q: "What services will Prismflow offer?",
    a: "Prismflow will be a full-service salon and spa — haircuts, grooming, facials, body treatments, and more. Every service is designed with the specific needs and preferences of gay men in mind.",
  },
  {
    q: "Where will Prismflow be located?",
    a: "Location details will be shared with waitlist members first. We're targeting a premium, centrally located space that's easy to get to and comfortable to spend time in.",
  },
  {
    q: "Is Prismflow only for gay men?",
    a: "Prismflow is designed specifically for gay men — that's our focus and what makes the experience different. That said, everyone is welcome. Our goal is to create a space where our community feels seen and prioritized.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1A365D] text-white font-['Source_Sans_3',sans-serif]">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A365D] via-[#1c3a66] to-[#0f2240]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#319795_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-28">
          <span className="inline-block rounded-full border border-teal-400/40 bg-teal-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-300">
            Coming Soon
          </span>

          <h1 className="mt-8 font-['Manrope',sans-serif] text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent">
              Prismflow
            </span>
          </h1>

          <p className="mt-6 text-xl font-semibold tracking-tight text-teal-300 font-['Manrope',sans-serif] sm:text-2xl">
            A premium salon and spa designed for gay men.
          </p>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Tailored grooming and wellness services in a space built around you.
            No compromises, no code-switching — just a salon experience that
            actually gets it.
          </p>

          <div className="mt-10 mx-auto max-w-lg">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ── What We're Building ─────────────────────────── */}
      <section className="bg-white/[0.04]">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
          <h2 className="text-center font-['Manrope',sans-serif] text-3xl font-bold tracking-tight sm:text-4xl">
            What We&apos;re Building
          </h2>
          <p className="mt-4 text-center text-lg text-slate-300">
            Prismflow isn&apos;t just another salon. Here&apos;s what makes it different.
          </p>

          <ul className="mt-12 space-y-6">
            <li className="flex items-start gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-sm text-teal-400">
                01
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white font-['Manrope',sans-serif]">
                  Services tuned to you
                </h3>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  Skincare routines, hair textures, grooming styles — everything
                  is informed by what gay men actually want, not what a generic
                  salon assumes.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-sm text-teal-400">
                02
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white font-['Manrope',sans-serif]">
                  A space that feels like yours
                </h3>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  Modern, warm, and intentionally designed. You should feel
                  comfortable from the moment you walk in — not like you&apos;re
                  fitting into someone else&apos;s idea of a salon.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-sm text-teal-400">
                03
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white font-['Manrope',sans-serif]">
                  Wellness, not just grooming
                </h3>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  Facials, bodywork, and recovery alongside traditional salon
                  services. Prismflow treats the whole person, not just the
                  surface.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-500/15 text-sm text-teal-400">
                04
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white font-['Manrope',sans-serif]">
                  Community by default
                </h3>
                <p className="mt-1 text-slate-300 leading-relaxed">
                  Built to bring people together — not through gimmicks, but by
                  being the kind of place you actually want to return to.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ── Email Waitlist CTA ──────────────────────────── */}
      <section className="bg-gradient-to-b from-transparent to-[#1A365D]">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center sm:py-28">
          <h2 className="font-['Manrope',sans-serif] text-3xl font-bold tracking-tight sm:text-4xl">
            Be first in line
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Join the waitlist and we&apos;ll let you know the moment Prismflow is ready.
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="bg-white/[0.04]">
        <div className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
          <h2 className="text-center font-['Manrope',sans-serif] text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-white font-['Manrope',sans-serif]">
                  {faq.q}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#0f2240]">
        <div className="mx-auto max-w-3xl px-6 py-10 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Prismflow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
