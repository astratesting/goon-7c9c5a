"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

const steps = [
  { label: "Upload File", description: "Select your 3D model" },
  { label: "Details", description: "Name your project" },
  { label: "Review", description: "Confirm & submit" },
];

const acceptedFormats = [
  { ext: "STL", desc: "Most common for FDM/SLA printing" },
  { ext: "OBJ", desc: "Supports color and texture data" },
  { ext: "3MF", desc: "Modern format with metadata support" },
  { ext: "STEP", desc: "CAD-native, precise geometry" },
];

const designTips = [
  'Export with proper units (millimeters recommended)',
  "Ensure your model is watertight / manifold — no holes or inverted faces",
  "Include built-in supports if your design has overhangs > 45°",
  "Keep polygon count reasonable (under 1M faces for faster processing)",
  "Name your file descriptively — helps our team quote faster",
];

export default function UploadPage() {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [dragging, setDragging] = useState(false);
  const [infoExpanded, setInfoExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      setFile(dropped);
      if (!projectName) {
        setProjectName(dropped.name.replace(/\.[^/.]+$/, ""));
      }
    }
  }, [projectName]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      if (!projectName) {
        setProjectName(selected.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleNext = () => {
    if (step === 0 && file) setStep(1);
    else if (step === 1 && projectName.trim()) setStep(2);
  };

  const handleSubmit = () => {
    // Demo mode — redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link href="/dashboard" className="text-sm text-muted hover:text-white transition-colors mb-2 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h1 className="font-heading text-3xl font-bold">Upload Your Design</h1>
        <p className="text-muted text-sm mt-1">
          Follow the steps below to get your 3D model ready for printing.
        </p>
      </div>

      {/* Progress stepper */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono shrink-0 ${
                  i < step
                    ? "bg-indigo text-white"
                    : i === step
                    ? "bg-indigo/20 text-indigo border border-indigo/40"
                    : "bg-surface-light text-muted"
                }`}
              >
                {i < step ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-medium truncate ${i <= step ? "text-white" : "text-muted"}`}>
                  {s.label}
                </p>
                <p className="text-xs text-muted truncate hidden sm:block">{s.description}</p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-3 ${i < step ? "bg-indigo" : "bg-white/5"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-surface border border-white/5 rounded-xl p-6">
        {step === 0 && (
          <div className="space-y-6">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                dragging
                  ? "border-indigo bg-indigo/5"
                  : file
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-white/10 hover:border-indigo/30 hover:bg-surface-light/30"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".stl,.obj,.3mf,.step,.stp"
                className="hidden"
                onChange={handleFileSelect}
              />

              {file ? (
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                  </div>
                  <p className="font-medium text-white">{file.name}</p>
                  <p className="text-xs text-muted font-mono">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <p className="text-xs text-green-400">File selected — click to change</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-indigo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>
                  <p className="text-white font-medium">
                    Drag & drop your 3D file here
                  </p>
                  <p className="text-sm text-muted">or click to browse</p>
                  <p className="text-xs text-muted font-mono">
                    STL, OBJ, 3MF, STEP — up to 100 MB
                  </p>
                </div>
              )}
            </div>

            {/* Accepted formats */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Accepted File Formats</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {acceptedFormats.map((f) => (
                  <div key={f.ext} className="bg-surface-light rounded-lg p-3 border border-white/5">
                    <p className="font-mono text-sm font-semibold text-indigo">.{f.ext}</p>
                    <p className="text-xs text-muted mt-1">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Design tips */}
            <div className="bg-cyan/5 border border-cyan/10 rounded-xl p-4">
              <h3 className="text-sm font-medium text-cyan mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Design Tips for Best Results
              </h3>
              <ul className="space-y-1.5">
                {designTips.map((tip) => (
                  <li key={tip} className="text-xs text-muted flex items-start gap-2">
                    <span className="text-cyan mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Expandable info */}
            <button
              type="button"
              onClick={() => setInfoExpanded(!infoExpanded)}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between py-3 border-t border-white/5">
                <span className="text-sm font-medium text-white">What makes a good print file?</span>
                <svg
                  className={`w-4 h-4 text-muted transition-transform ${infoExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>
            {infoExpanded && (
              <div className="bg-surface-light rounded-xl p-5 border border-white/5 space-y-4 animate-fade-in-up">
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Watertight Mesh</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Your model should be a closed, manifold mesh with no holes, self-intersections, or inverted normals. Most slicers will flag issues, but fixing them in your CAD tool produces better results.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Correct Scale & Units</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Export in millimeters. A common mistake is exporting in inches, which produces models 25.4× too large. Check your export settings before uploading.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Reasonable Polygon Count</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    For FDM printing, 100K–500K faces is plenty. For resin/SLA with fine detail, up to 1M faces works well. Higher counts slow down slicing without improving print quality.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Flat Bottom / Print Bed Contact</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Designs with a flat base print more reliably and cost less. If your model has no natural flat surface, consider adding a small raft or chamfer in your CAD tool.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                Project Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Phone Stand v2"
                className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-indigo/40 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">
                Description <span className="text-muted text-xs">(optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project, material preferences, or special requirements..."
                rows={4}
                className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-indigo/40 transition-colors resize-none"
              />
            </div>
            {file && (
              <div className="bg-surface-light rounded-lg p-4 border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted font-mono">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div className="bg-indigo/5 border border-indigo/10 rounded-xl p-5">
              <h3 className="font-heading text-lg font-semibold text-white mb-4">Submission Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-sm text-muted">Project Name</span>
                  <span className="text-sm font-medium">{projectName || "Untitled"}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-sm text-muted">File</span>
                  <span className="text-sm font-medium font-mono">{file?.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-sm text-muted">File Size</span>
                  <span className="text-sm font-medium font-mono">
                    {file ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-sm text-muted">Description</span>
                  <span className="text-sm text-muted max-w-[200px] text-right truncate">
                    {description || "None"}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-cyan/5 border border-cyan/10 rounded-lg p-4">
              <p className="text-xs text-muted leading-relaxed">
                <span className="text-cyan font-medium">What happens next?</span> Our team reviews your file for printability within 24 hours. You&apos;ll receive a detailed quote with material options and estimated delivery. No payment required until you approve.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-white transition-colors"
            >
              &larr; Back
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-white transition-colors"
          >
            Cancel
          </Link>
          {step < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={(step === 0 && !file) || (step === 1 && !projectName.trim())}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo to-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Submit for Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
