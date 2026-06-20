"use client";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Multiple Materials",
    description:
      "PLA, PETG, ABS, TPU, Nylon — choose the right material for your project. Each comes with tested profiles for consistent results.",
    color: "indigo",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Describe What You Need",
    description:
      "Don't have a 3D file yet? Describe your idea in plain language and we'll help you get from concept to printable model.",
    color: "purple",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Sketch-to-Print",
    description:
      "Upload a hand-drawn sketch or rough diagram. We'll interpret the geometry and prepare it for printing with proper tolerances.",
    color: "cyan",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Real-Time Print Tracking",
    description:
      "Watch your print progress in real time. Get notified at key milestones: slicing complete, print started, print finished.",
    color: "indigo",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: "Quality Guarantee",
    description:
      "Every print is inspected before shipping. If a print fails quality checks, we reprint it at no extra cost. Your satisfaction matters.",
    color: "purple",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "File Format Support",
    description:
      "Upload STL, OBJ, 3MF, STEP, or even SketchUp files. Our slicer handles format conversion and mesh repair automatically.",
    color: "cyan",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  indigo: { border: "border-indigo/20", bg: "bg-indigo/10", text: "text-indigo" },
  purple: { border: "border-purple/20", bg: "bg-purple/10", text: "text-purple" },
  cyan: { border: "border-cyan/20", bg: "bg-cyan/10", text: "text-cyan" },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-cyan mb-4 block">CAPABILITIES</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Everything you need to <span className="text-gradient">go from idea to object</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Professional 3D printing tools designed for makers who care about quality, speed, and control.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color];
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl border ${colors.border} bg-surface/50 hover:bg-surface transition-colors group`}
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 ${colors.text} group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
