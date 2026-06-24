"use client";

import { useState } from "react";
import SubscriptionGate from "@/components/SubscriptionGate";

const examplePrompts = [
  "A medieval knight with a shield, 8cm tall",
  "A low-poly dragon figurine, 12cm",
  "A gear mechanism with interlocking teeth",
  "A custom phone stand with cable routing",
];

export default function AiStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  function handleGenerate() {
    if (!prompt.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert("AI generation is a demo feature in this build. In production, this would generate a 3D model from your prompt.");
    }, 2000);
  }

  return (
    <SubscriptionGate>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="font-heading text-3xl font-bold">AI Studio</h1>
          <p className="text-muted text-sm mt-1">
            Describe what you want to 3D print and our AI will generate a model.
          </p>
        </div>

        <div className="bg-surface border border-white/5 rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Describe your model
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A detailed bust of a wolf, 10cm tall, ready for FDM printing..."
              rows={4}
              className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-indigo/40 transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating || !prompt.trim()}
            className="px-6 py-3 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              "Generate Model"
            )}
          </button>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white mb-3">Try an example</h3>
          <div className="grid gap-2">
            {examplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => setPrompt(p)}
                className="text-left px-4 py-3 bg-surface border border-white/5 rounded-lg text-sm text-muted hover:text-white hover:border-indigo/20 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SubscriptionGate>
  );
}
