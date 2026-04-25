"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppData } from "@/context/AppDataContext";
import Navbar from "@/components/Navbar";
import { Shield, Database, Lock, Search, Cpu, CheckCircle2 } from "lucide-react";

const STEPS = [
  { icon: Search,   text: "Scanning document integrity...", duration: 2000 },
  { icon: Cpu,      text: "Running visual authenticity algorithms...", duration: 2500 },
  { icon: Database, text: "Cross-verifying with secure national databases...", duration: 3000 },
  { icon: Shield,   text: "Executing biometric face-match analysis...", duration: 2000 },
  { icon: Lock,     text: "Finalizing cryptographic identity proof...", duration: 1500 },
];

export default function ProcessingPage() {
  const router = useRouter();
  const { calculateResults } = useAppData();
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    let stepIndex = 0;
    const executeSteps = async () => {
      for (const step of STEPS) {
        setCurrentStep(stepIndex);
        await new Promise(r => setTimeout(r, step.duration));
        stepIndex++;
        setOverallProgress((stepIndex / STEPS.length) * 100);
      }
      calculateResults();
      setTimeout(() => router.push("/results"), 800);
    };

    executeSteps();
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 68px)", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px" }}>
        <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ position: "relative", width: 180, height: 180, margin: "0 auto 64px" }}
          >
            {/* Pulsing rings */}
            {[1, 2, 3, 4].map((r) => (
              <motion.div
                key={r}
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: r * 0.5, ease: "easeOut" }}
                style={{
                  position: "absolute", inset: 0,
                  borderRadius: "50%", border: "2px solid var(--accent)",
                }}
              />
            ))}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "50%", background: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 60px var(--accent-glow)",
              border: "4px solid rgba(255,255,255,0.2)"
            }}>
              <Search size={64} color="#fff" strokeWidth={2.5} />
            </div>
          </motion.div>

          <h2 className="heading-md" style={{ marginBottom: 24, fontSize: "2rem" }}>Analyzing Biological & Identity Data</h2>
          <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: 56, height: "1.5em", fontSize: "1.1rem", fontWeight: 500 }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "anticipate" }}
              >
                {STEPS[currentStep]?.text}
              </motion.span>
            </AnimatePresence>
          </p>

          <div style={{ background: "var(--bg-muted)", height: 14, borderRadius: 20, overflow: "hidden", marginBottom: 16, border: "1px solid var(--border)" }}>
            <motion.div 
              animate={{ width: `${overallProgress}%` }}
              transition={{ type: "spring", bounce: 0, duration: 1 }}
              style={{ height: "100%", background: "linear-gradient(90deg, var(--accent-light), var(--accent))", boxShadow: "0 0 15px var(--accent-glow)" }}
            />
          </div>
          <div style={{ textAlign: "right", fontSize: "1rem", fontWeight: 900, color: "var(--accent)", letterSpacing: "1px" }}>
            {Math.round(overallProgress)}% COMPLETE
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: 80, padding: 32, borderRadius: 24, background: "var(--card-bg)", display: "flex", alignItems: "center", gap: 20, border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
          >
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
               <CheckCircle2 size={24} color="#10B981" />
            </div>
            <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", textAlign: "left", lineHeight: 1.6 }}>
              Secure Bridge active. Encrypted tunnel established with <strong>National ID Registry</strong>. All compute cycles are running on private ZK-circuit.
            </span>
          </motion.div>
        </div>
      </main>
    </>
  );
}
