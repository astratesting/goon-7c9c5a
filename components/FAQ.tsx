"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What kind of products can I order?",
    answer:
      "Custom 3D printed figurines, miniatures, cosplay props, and maker projects. Describe what you want and we'll create it.",
  },
  {
    question: "Do I need to know 3D modeling?",
    answer:
      "Not at all. Just describe your idea in text and our AI handles the rest.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "We're targeting 72-hour turnaround from design approval to delivery.",
  },
  {
    question: "When will Goon launch?",
    answer:
      "We're building now. Join the waitlist to be first in line when we open.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-cyan mb-4 block">FAQ</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Common <span className="text-gradient">questions</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Everything you need to know about Goon.
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-white/5 rounded-xl bg-surface/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-heading text-sm font-semibold pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
