"use client";

const features = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "AI-Assisted Design",
    description:
      "Describe your character or prop in text — our AI generates a print-ready 3D model. No modeling skills required.",
    color: "indigo",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Print-Optimized Output",
    description:
      "Every model is automatically repaired and optimized for high-detail printing — clean meshes, proper tolerances, no failed prints.",
    color: "purple",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "72-Hour Fulfillment",
    description:
      "From design to your doorstep in three days, not three weeks. Fast turnaround for gamers and cosplayers on a deadline.",
    color: "cyan",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "No Skills Required",
    description:
      "Zero 3D modeling experience needed — if you can describe it, we can print it. From idea to figurine, effortlessly.",
    color: "indigo",
  },
];

const colorMap: Record<
  string,
  { border: string; bg: string; text: string }
> = {
  indigo: {
    border: "border-indigo/20",
    bg: "bg-indigo/10",
    text: "text-indigo",
  },
  purple: {
    border: "border-purple/20",
    bg: "bg-purple/10",
    text: "text-purple",
  },
  cyan: {
    border: "border-cyan/20",
    bg: "bg-cyan/10",
    text: "text-cyan",
  },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-cyan mb-4 block">
            WHAT WE&apos;RE BUILDING
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Custom figurines,{" "}
            <span className="text-gradient">zero friction</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Everything you need to go from a text description to a
            high-detail, full-color 3D print — delivered to your door.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color];
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl border ${colors.border} bg-surface/50 hover:bg-surface transition-colors group`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 ${colors.text} group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
