"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Scan, Lock, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2, RefreshCw } from "lucide-react";

type Step = 1 | 2 | 3;

const STEPS = [
  { id: 1, icon: Scan,        label: "Scan Passport" },
  { id: 2, icon: Lock,        label: "Generate Proof" },
  { id: 3, icon: ShieldCheck, label: "Claim Token" },
];

export default function VerificationPage() {
  const [step, setStep] = useState<Step>(1);
  const [nfcError, setNfcError] = useState<string | null>(null);
  const [proofProgress, setProofProgress] = useState(0);

  /* ── Proof simulation ──────────────────────────────────── */
  useEffect(() => {
    if (step !== 2) return;
    setProofProgress(0);
    const start = Date.now();
    const duration = 3800;
    let rafId: number;
    
    const frame = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProofProgress(Math.round(pct));
      
      if (pct < 100) {
        rafId = requestAnimationFrame(frame);
      } else {
        setTimeout(() => setStep(3), 400);
      }
    };
    
    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [step]);

  /* ── NFC handler ───────────────────────────────────────── */
  const startNFC = async () => {
    setNfcError(null);
    if ("NDEFReader" in window) {
      try {
        // @ts-ignore
        const reader = new NDEFReader();
        await reader.scan();
        reader.onreading = () => setStep(2);
      } catch (e: any) {
        setNfcError("NFC permission denied. Simulating scan for demo.");
        setTimeout(() => setStep(2), 2000);
      }
    } else {
      setNfcError("NFC not supported on this device — simulating scan.");
      setTimeout(() => setStep(2), 2000);
    }
  };

  const progressPct = ((step - 1) / 2) * 100;

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg-muted)", minHeight: "calc(100vh - 68px)", padding: "56px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* ── Stepper ─────────────────────────────────────── */}
          <div style={{ marginBottom: 44 }}>
            {/* Labels */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              {STEPS.map((s) => (
                <div key={s.id} style={{ flex: 1, textAlign: "center" }}>
                  <span style={{
                    fontSize: "0.8rem", fontWeight: 600,
                    color: step >= s.id ? "var(--accent)" : "var(--text-muted)",
                    transition: "color .3s"
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bar */}
            <div style={{ position: "relative", height: 6, background: "var(--border)", borderRadius: 999 }}>
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPct}%` }}
              />
              {/* Dot markers */}
              {STEPS.map((s, i) => {
                const pct = (i / 2) * 100;
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <div
                    key={s.id}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: `${pct}%`,
                      transform: "translate(-50%, -50%)",
                      width: active ? 18 : 14,
                      height: active ? 18 : 14,
                      borderRadius: "50%",
                      background: done || active ? "var(--accent)" : "var(--border)",
                      border: `3px solid ${done || active ? "var(--accent)" : "var(--border)"}`,
                      boxShadow: active ? "var(--shadow-accent)" : "none",
                      transition: "all .3s",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      zIndex: 2,
                    }}
                  >
                    {done && <CheckCircle2 size={9} color="#fff" />}
                  </div>
                );
              })}
            </div>

            {/* Step counter */}
            <div style={{ textAlign: "right", marginTop: 10, fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>
              Step {step} of 3
            </div>
          </div>

          {/* ── Content Card ─────────────────────────────────── */}
          <div className="card" style={{ overflow: "hidden", minHeight: 420 }}>
            <AnimatePresence mode="wait">

              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  style={{ padding: "52px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
                >
                  {/* Animated NFC rings */}
                  <div style={{ position: "relative", width: 96, height: 96, marginBottom: 32 }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      borderRadius: "50%", background: "var(--accent-dim)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Scan size={38} color="var(--accent)" strokeWidth={2} />
                    </div>
                    {[1, 2].map((r) => (
                      <div
                        key={r}
                        className="scan-ring"
                        style={{
                          position: "absolute", inset: -12,
                          borderRadius: "50%",
                          border: "2px solid var(--accent-light)",
                          boxShadow: "0 0 20px var(--accent-glow)",
                          animationDelay: `${r * 0.6}s`,
                          opacity: 0,
                        }}
                      />
                    ))}
                  </div>

                  <h2 className="heading-md" style={{ marginBottom: 12 }}>Scan Your Passport</h2>
                  <p className="body-md" style={{ maxWidth: 380, marginBottom: 32, fontSize: "0.9rem" }}>
                    Hold your biometric passport against the top-back of your phone. The NFC chip will be read
                    locally — nothing is uploaded.
                  </p>

                  {nfcError && (
                    <div style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      background: "#FEF3C7", border: "1px solid #FDE68A",
                      borderRadius: 10, padding: "12px 14px",
                      marginBottom: 24, maxWidth: 400, textAlign: "left"
                    }}>
                      <AlertCircle size={16} color="#D97706" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: "0.82rem", color: "#92400E", lineHeight: 1.5 }}>{nfcError}</span>
                    </div>
                  )}

                  <button onClick={startNFC} className="btn btn-primary btn-lg glow-pulse">
                    Initialize NFC Scan <ArrowRight size={17} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                  style={{ padding: "52px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
                >
                  {/* Spinner */}
                  <div style={{
                    position: "relative",
                    width: 96, height: 96,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 32,
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      borderRadius: "50%",
                      border: "4px solid var(--border)",
                    }} />
                    <div
                      className="spinner"
                      style={{
                        position: "absolute", inset: 0,
                        borderRadius: "50%",
                        border: "4px solid transparent",
                        borderTopColor: "var(--accent)",
                      }}
                    />
                    <Lock size={28} color="var(--accent)" strokeWidth={2} />
                  </div>

                  <h2 className="heading-md" style={{ marginBottom: 10 }}>Generating Privacy Proof</h2>
                  <p className="body-md" style={{ maxWidth: 380, marginBottom: 32, fontSize: "0.9rem" }}>
                    Running the Groth16 ZK circuit on your device. Your passport data never leaves this browser.
                  </p>

                  {/* Progress */}
                  <div style={{ width: "100%", maxWidth: 380 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>Proof generation</span>
                      <span style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700 }}>{proofProgress}%</span>
                    </div>
                    <div style={{ height: 6, background: "var(--border)", borderRadius: 999 }}>
                      <div className="progress-bar-fill" style={{ width: `${proofProgress}%` }} />
                    </div>
                    <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
                      {[
                        { label: "Parsing MRZ data", done: proofProgress > 20 },
                        { label: "Building witness", done: proofProgress > 50 },
                        { label: "Running Groth16 circuit", done: proofProgress > 80 },
                        { label: "Finalizing calldata", done: proofProgress >= 100 },
                      ].map((item) => (
                        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {item.done
                            ? <CheckCircle2 size={15} color="#16A34A" />
                            : <div style={{ width: 15, height: 15, borderRadius: "50%", border: "2px solid var(--border)", flexShrink: 0 }} />
                          }
                          <span style={{ fontSize: "0.82rem", color: item.done ? "var(--text)" : "var(--text-muted)", fontWeight: item.done ? 600 : 400 }}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ padding: "52px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
                    style={{
                      width: 96, height: 96, borderRadius: "50%",
                      background: "var(--accent-dim)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 24,
                    }}
                    className="verified-glow"
                  >
                    <ShieldCheck size={44} color="var(--accent)" strokeWidth={2} />
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <span className="badge badge-green" style={{ marginBottom: 16 }}>
                      <span style={{ width:7, height:7, borderRadius:"50%", background:"#16A34A", display:"inline-block" }}/>
                      Proof Verified
                    </span>
                    <h2 className="heading-md" style={{ marginBottom: 12 }}>
                      You are now verified on-chain.
                    </h2>
                    <p className="body-md" style={{ maxWidth: 400, marginBottom: 32, fontSize: "0.9rem" }}>
                      Your Zero-Knowledge proof has been validated. Claim your Soulbound Token to unlock compliant DeFi access.
                    </p>

                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                      <Link href="/dashboard" className="btn btn-primary btn-lg">
                        Claim Soulbound Token <ArrowRight size={17} />
                      </Link>
                      <button
                        onClick={() => setStep(1)}
                        className="btn btn-ghost"
                        style={{ padding: "13px 20px" }}
                      >
                        <RefreshCw size={15} /> Start Over
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Security note ─────────────────────────────────── */}
          <div style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <ShieldCheck size={14} color="var(--text-muted)" />
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>
              End-to-end private · No personal data stored · Open-source circuits
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
