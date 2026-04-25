"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppData } from "@/context/AppDataContext";
import Navbar from "@/components/Navbar";
import { TrendingUp, Shield, Wallet, Activity, ArrowRight } from "lucide-react";

export default function CreditScorePage() {
  const router = useRouter();
  const { state } = useAppData();
  const [displayScore, setDisplayScore] = useState(300);

  useEffect(() => {
    const target = state.creditScore || 720;
    const duration = 2000;
    const start = Date.now();

    const timer = setInterval(() => {
      const timePassed = Date.now() - start;
      const progress = Math.min(timePassed / duration, 1);
      setDisplayScore(Math.floor(300 + (target - 300) * progress));
      if (progress === 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [state.creditScore]);

  const dashArray = 2 * Math.PI * 90;
  const targetPct = (state.creditScore - 300) / (900 - 300);
  const dashOffset = dashArray * (1 - targetPct);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 68px)", background: "var(--bg-muted)", padding: "120px 24px" }}>
        <div className="container" style={{ maxWidth: 1100 }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" }} className="score-grid">
            
            {/* Visual Gauge */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ position: "relative", display: "flex", justifyContent: "center" }}
            >
              <svg width="420" height="420" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="var(--border)" strokeWidth="12" />
                <motion.circle 
                  cx="100" cy="100" r="90" fill="none" 
                  stroke="var(--accent)" strokeWidth="12" 
                  strokeDasharray={dashArray}
                  initial={{ strokeDashoffset: dashArray }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{ duration: 2.5, ease: [0.34, 1.56, 0.64, 1] }}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", width: "100%" }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "4px", marginBottom: 8 }}>Credit Standing</div>
                <div style={{ fontSize: "7rem", fontWeight: 900, color: "var(--text)", lineHeight: 1, letterSpacing: "-4px" }}>{displayScore}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent)", marginTop: 8 }}>PLATINUM TIER</div>
              </div>
            </motion.div>

            {/* Breakdown Content */}
            <div>
              <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}>
                <div style={{ display: "inline-flex", padding: "8px 16px", background: "var(--accent-dim)", borderRadius: "var(--radius-full)", color: "var(--accent)", fontSize: "0.85rem", fontWeight: 800, marginBottom: 16 }}>
                   Audit Results Released
                </div>
                <h1 className="heading-lg" style={{ marginBottom: 24, fontSize: "2.8rem" }}>Financial Reliability Quotient</h1>
                <p className="body-md" style={{ marginBottom: 48, fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>Your ZK-Score is a synthesized metric based on high-integrity document cross-referencing and behavioral stability patterns.</p>
              </motion.div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { label: "Identity Integrity", value: state.stats.identityScore, icon: Shield, pct: "98%" },
                  { label: "Asset Stability", value: state.stats.stabilityScore, icon: TrendingUp, pct: "92%" },
                  { label: "Finance Health", value: state.stats.financialScore, icon: Wallet, pct: "87%" },
                  { label: "Fraud Risk Level", value: "Minimal", icon: Activity, pct: "0.4%" },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="card"
                    style={{ padding: "24px 28px", borderLeft: "4px solid var(--accent)" }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                      <stat.icon size={16} color="var(--accent)" />
                      <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                       <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text)" }}>{stat.value}</div>
                       <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#10B981" }}>{stat.pct}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{ marginTop: 56 }}
              >
                <button className="btn btn-primary btn-lg" onClick={() => router.push("/loan-eligibility")} style={{ width: "100%", padding: "20px" }}>
                  Analyze Loan Eligibility <ArrowRight size={20} />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </main>
      <style>{`
        @media (max-width: 800px) {
          .score-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .heading-lg { font-size: 2.2rem !important; }
        }
      `}</style>
    </>
  );
}
