"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppData } from "@/context/AppDataContext";
import Navbar from "@/components/Navbar";
import { Landmark, ArrowRight, CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function LoanEligibilityPage() {
  const router = useRouter();
  const { state } = useAppData();

  const getLevelColor = () => {
    if (state.loanEligibility.level === "High") return "#10B981";
    if (state.loanEligibility.level === "Medium") return "#F59E0B";
    return "#EF4444";
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 68px)", background: "var(--bg-muted)", padding: "120px 24px" }}>
        <div className="container" style={{ maxWidth: 840 }}>
          
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div style={{ width: 72, height: 72, borderRadius: 20, background: "var(--accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 10px 30px var(--accent-glow)" }}>
                <Landmark size={36} />
              </div>
              <h1 className="heading-lg" style={{ marginBottom: 12 }}>Liquidity Authorization</h1>
              <p className="body-md" style={{ color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto" }}>Pre-approved lending limits based on your authenticated zk-Identity profile.</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{ padding: 64, textAlign: "center", marginBottom: 40, borderTop: `6px solid ${getLevelColor()}` }}
          >
            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>Authorized Tier</div>
            <div style={{ fontSize: "4rem", fontWeight: 900, color: getLevelColor(), lineHeight: 1, marginBottom: 12, letterSpacing: "-2px" }}>{state.loanEligibility.level} Access</div>
            
            {/* Visual Gauge Bar */}
            <div style={{ width: "100%", height: 16, background: "var(--border)", borderRadius: 20, margin: "48px 0", overflow: "hidden", position: "relative", border: "1px solid var(--border)" }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: state.loanEligibility.level === "High" ? "100%" : state.loanEligibility.level === "Medium" ? "65%" : "35%" }}
                transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
                style={{ height: "100%", background: getLevelColor(), boxShadow: `0 0 15px ${getLevelColor()}66` }}
              />
              {/* Markers */}
              <div style={{ position: "absolute", left: "33%", top: 0, bottom: 0, width: 2, background: "rgba(0,0,0,0.1)" }} />
              <div style={{ position: "absolute", left: "66%", top: 0, bottom: 0, width: 2, background: "rgba(0,0,0,0.1)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, padding: "40px", background: "var(--bg-muted)", borderRadius: 24, border: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase", marginBottom: 8, letterSpacing: "1px" }}>Approved Credit Line</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text)" }}>
                  ₹{state.loanEligibility.min.toLocaleString()} – ₹{state.loanEligibility.max.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase", marginBottom: 8, letterSpacing: "1px" }}>Preferential APR</div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text)" }}>8.49% <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>p.a.</span></div>
              </div>
            </div>
          </motion.div>

          {/* Quick Checks */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              { icon: CheckCircle2, text: "Collateral-free eligibility for verified SBT holders.", color: "#10B981" },
              { icon: CheckCircle2, text: "Cross-border liquidity enabled via Polygon Network.", color: "#10B981" },
            ].map((check, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="card" 
                style={{ padding: 24, display: "flex", gap: 16, alignItems: "center" }}
              >
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <check.icon size={18} color={check.color} />
                </div>
                <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 600, lineHeight: 1.4 }}>{check.text}</span>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 80, textAlign: "center" }}>
            <button className="btn btn-primary btn-lg" onClick={() => router.push("/report")} style={{ width: "100%", maxWidth: 440, padding: "20px" }}>
              Generate Audit Report <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
