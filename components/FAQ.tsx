"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What file formats do you accept?",
    answer:
      "We accept STL, OBJ, 3MF, STEP, and SketchUp (.skp) files. Our slicer automatically handles format conversion and mesh repair if needed.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing is based on material usage and print time. Upload a file or describe your project and we'll give you an instant quote. No hidden fees — what you see is what you pay.",
  },
  {
    question: "What materials are available?",
    answer:
      "We offer PLA, PLA+, PETG, ABS, TPU, and Nylon. Each material comes with tested print profiles for consistent, high-quality results. Pro and Workshop plans unlock specialty materials.",
  },
  {
    question: "How long does printing take?",
    answer:
      "Most prints ship within 3–5 business days. Pro plan members get priority queue access with 3-day delivery, and Workshop members get next-day delivery on standard orders.",
  },
  {
    question: "What if my print fails quality checks?",
    answer:
      "Every print is inspected before shipping. If it doesn't pass, we reprint it at no extra cost. We want you to be happy with the result.",
  },
  {
    question: "Can I describe an idea instead of uploading a file?",
    answer:
      "Yes. Describe what you need in plain language and we'll help you get from concept to a printable model. We also accept hand-drawn sketches.",
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
            Everything you need to know about getting started with Goon.
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
