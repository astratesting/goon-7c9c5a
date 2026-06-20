"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const materials = [
  { name: "PLA", description: "Easy to print, great for prototypes", colors: ["White", "Black", "Red", "Blue", "Green"] },
  { name: "PLA+", description: "Stronger than standard PLA", colors: ["White", "Black", "Gray", "Indigo"] },
  { name: "PETG", description: "Chemical resistant, translucent options", colors: ["Clear", "Black", "Translucent Cyan"] },
  { name: "ABS", description: "Heat resistant, durable", colors: ["White", "Black", "Gray"] },
  { name: "TPU", description: "Flexible, rubber-like", colors: ["Black", "White"] },
  { name: "Nylon", description: "Strong, wear-resistant", colors: ["Natural", "Black"] },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [layerHeight, setLayerHeight] = useState("0.20");

  const activeMaterial = materials.find((m) => m.name === selectedMaterial);

  function handleSubmit() {
    // Demo: just redirect to dashboard with a fake success
    router.push("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold">New Project</h1>
        <p className="text-muted text-sm mt-1">
          Upload a file or describe what you want to print.
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
                step >= s
                  ? "bg-indigo text-white"
                  : "bg-surface border border-white/10 text-muted"
              }`}
            >
              {step > s ? (
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                s
              )}
            </div>
            <span className={`text-xs font-mono ${step >= s ? "text-white" : "text-muted"}`}>
              {s === 1 ? "Details" : s === 2 ? "Material" : "Review"}
            </span>
            {s < 3 && <div className={`w-12 h-px ${step > s ? "bg-indigo" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-surface border border-white/5 rounded-xl p-6">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Phone Stand v2"
                className="w-full px-4 py-3 bg-ink border border-white/10 rounded-xl text-sm text-white placeholder:text-muted/40 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Description (optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you want to print, or paste a URL to a 3D file..."
                rows={4}
                className="w-full px-4 py-3 bg-ink border border-white/10 rounded-xl text-sm text-white placeholder:text-muted/40 focus:outline-none focus:border-indigo/50 focus:ring-1 focus:ring-indigo/30 transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1.5">Upload File (optional)</label>
              <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-indigo/30 transition-colors">
                <svg className="w-8 h-8 text-muted mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p className="text-sm text-muted">
                  Drag and drop STL, OBJ, 3MF, or STEP files
                </p>
                <p className="text-xs text-muted/50 mt-1">Max 50MB</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-muted mb-3">Material</label>
              <div className="grid grid-cols-2 gap-3">
                {materials.map((mat) => (
                  <button
                    key={mat.name}
                    onClick={() => {
                      setSelectedMaterial(mat.name);
                      setSelectedColor(mat.colors[0]);
                    }}
                    className={`p-4 rounded-xl border text-left transition-colors ${
                      selectedMaterial === mat.name
                        ? "border-indigo/50 bg-indigo/5"
                        : "border-white/5 bg-ink hover:border-white/10"
                    }`}
                  >
                    <span className="text-sm font-semibold">{mat.name}</span>
                    <p className="text-xs text-muted mt-1">{mat.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {activeMaterial && (
              <div>
                <label className="block text-xs font-medium text-muted mb-3">Color</label>
                <div className="flex flex-wrap gap-2">
                  {activeMaterial.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                        selectedColor === color
                          ? "border-cyan/50 bg-cyan/5 text-cyan"
                          : "border-white/5 bg-ink text-muted hover:text-white"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-muted mb-3">Layer Height</label>
              <div className="flex gap-3">
                {["0.08", "0.12", "0.16", "0.20"].map((h) => (
                  <button
                    key={h}
                    onClick={() => setLayerHeight(h)}
                    className={`px-4 py-2 rounded-lg text-xs font-mono border transition-colors ${
                      layerHeight === h
                        ? "border-purple/50 bg-purple/5 text-purple"
                        : "border-white/5 bg-ink text-muted hover:text-white"
                    }`}
                  >
                    {h}mm
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="font-heading text-lg font-semibold">Review Your Project</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-sm text-muted">Project Name</span>
                <span className="text-sm font-medium">{projectName || "Untitled"}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-sm text-muted">Material</span>
                <span className="text-sm font-medium">{selectedMaterial || "Not selected"}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-sm text-muted">Color</span>
                <span className="text-sm font-medium">{selectedColor || "Not selected"}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-sm text-muted">Layer Height</span>
                <span className="text-sm font-mono">{layerHeight}mm</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-sm text-muted">Estimated Cost</span>
                <span className="text-sm font-mono text-cyan">~$8.50</span>
              </div>
            </div>
            <p className="text-xs text-muted/60">
              Final pricing depends on actual material usage and print time.
            </p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : router.push("/dashboard")}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-white transition-colors"
        >
          {step > 1 ? "Back" : "Cancel"}
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity glow-indigo"
          >
            Submit Print Job
          </button>
        )}
      </div>
    </div>
  );
}
