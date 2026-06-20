"use client";

const steps = [
  {
    number: "01",
    title: "Upload or Describe",
    description:
      "Drop a 3D file (STL, OBJ, 3MF, STEP) or describe what you need in plain language. We support sketches, too.",
    color: "from-indigo to-indigo/50",
  },
  {
    number: "02",
    title: "Choose Materials",
    description:
      "Pick your material, color, and quality settings. We'll show you cost and estimated print time upfront.",
    color: "from-purple to-purple/50",
  },
  {
    number: "03",
    title: "We Print & Ship",
    description:
      "Your model is sliced, printed on calibrated machines, inspected for quality, and shipped to your door.",
    color: "from-cyan to-cyan/50",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-purple mb-4 block">PROCESS</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Three steps. <span className="text-gradient">Zero friction.</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            From concept to your doorstep — the simplest path to custom 3D prints.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent" />
              )}

              <div className="text-center md:text-left">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} mb-6`}>
                  <span className="font-mono text-sm font-bold text-white">{step.number}</span>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
