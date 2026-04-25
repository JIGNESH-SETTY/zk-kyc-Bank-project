"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAppData } from "@/context/AppDataContext";
import { useAccount } from "wagmi";
import {
  ShieldCheck, Copy, CheckCircle2, ExternalLink,
  Activity, Key, CalendarDays, Globe, TrendingUp, Award,
  Wallet, FileText, Landmark, ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const { state } = useAppData();
  const { address: userAddress } = useAccount();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const displayAddress = userAddress 
    ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`
    : "0x4F2c...8E1a";

  const copy = () => {
    const toCopy = userAddress || "0x4F2c7A3b9D6eF8c1E4b5C2a7D9f0E3b28E1a";
    navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verifiedDocs = state.documents.filter(d => d.status === "verified").length;

  return (
    <>
      <Navbar />
      <main style={{ 
        background: "var(--bg-muted)", 
        minHeight: "calc(100vh - 68px)", 
        padding: "120px 24px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Subtle Mesh Glow */}
        <div style={{
          position: "absolute",
          top: "-5%",
          right: "-5%",
          width: "35%",
          height: "35%",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.6,
          pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
            <div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Unified Command</motion.div>
              <h1 className="heading-lg">Welcome, {state.userDetails.fullName.split(" ")[0] || "Authorized User"}</h1>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
               <Link href="/upload" className="btn btn-ghost" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                 <CheckCircle2 size={18} /> Update Docs
               </Link>
               <Link href="/report" className="btn btn-primary">
                 <FileText size={18} /> Generate Report
               </Link>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(380px, 1.2fr) 1fr 1fr", gap: 32, marginBottom: 32 }}>
            
            {/* Identity Card */}
            <motion.div 
              style={{ gridRow: "span 2" }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="card" style={{ padding: 40, height: "100%", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, var(--card-bg) 0%, var(--bg-muted) 100%)", border: "1px solid var(--accent-light)" }}>
                {/* Holographic effect */}
                <div style={{ position: "absolute", top: "-50%", right: "-50%", width: "100%", height: "100%", background: "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)", opacity: 0.3 }} />
                
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 48 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 25px var(--accent-glow)" }}>
                    <ShieldCheck size={32} color="#fff" />
                  </div>
                  <div className="badge badge-green" style={{ height: 32, padding: "0 16px", fontSize: "0.85rem", fontWeight: 900 }}>
                    TRUSTED PASSPORT
                  </div>
                </div>

                <div style={{ marginBottom: 48 }}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8 }}>Authorized Node Address</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.5px" }}>{state.userDetails.fullName || "DEMO_ENTITY"}</div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 48 }}>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>Primary Net</div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <Globe size={16} color="var(--accent)" /> Polygon PoS
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 800, textTransform: "uppercase" }}>SBT Identity</div>
                    <div style={{ fontSize: "1rem", fontWeight: 800, marginTop: 4 }}>#ZK-409288</div>
                  </div>
                </div>

                <div style={{ padding: "20px", background: "rgba(0,0,0,0.03)", borderRadius: 16, border: "1px solid var(--border)" }}>
                   <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, marginBottom: 12 }}>Secured Wallet Hash</div>
                   <button 
                     onClick={copy}
                     style={{ 
                       width: "100%", textAlign: "left", background: "var(--card-bg)", border: "1px solid var(--border)", 
                       borderRadius: 12, padding: "12px 16px", fontSize: "0.95rem", color: "var(--text)", 
                       display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer",
                       fontWeight: 700, fontFamily: "monospace"
                     }}
                   >
                     {displayAddress}
                     {copied ? <CheckCircle2 size={16} color="#10B981" /> : <Copy size={16} color="var(--text-muted)" />}
                   </button>
                </div>
              </div>
            </motion.div>

            {/* Credit Score Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
              style={{ padding: 40 }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <TrendingUp size={24} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Reliability Score</h3>
              </div>
              <div style={{ fontSize: "4.5rem", fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>{state.creditScore || "N/A"}</div>
              <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "#10B981" }}>OPTIMAL</span>
                <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 10 }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} style={{ height: "100%", background: "#10B981", borderRadius: 10, boxShadow: "0 0 10px rgba(16, 185, 129, 0.3)" }} />
                </div>
              </div>
            </motion.div>

            {/* Loan Eligibility Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
              style={{ padding: 40 }}
            >
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Landmark size={24} color="var(--accent)" />
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>Lending Limit</h3>
              </div>
              <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-1px" }}>₹{state.loanEligibility.max.toLocaleString() || "0"}</div>
              <p style={{ marginTop: 12, fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 600, lineHeight: 1.5 }}>
                Pre-approved for immediate disbursement.
              </p>
              <Link href="/loan-eligibility" style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.9rem", fontWeight: 800, color: "var(--accent)", textDecoration: "none" }}>
                VIEW PARAMETERS <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Documents Tracker */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
              style={{ gridColumn: "span 2", padding: 40 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, display: "flex", gap: 12, alignItems: "center" }}>
                  <FileText size={24} color="var(--accent)" /> Asset Verification Log
                </h3>
                <span style={{ fontSize: "0.95rem", fontWeight: 900, color: "var(--text-secondary)", background: "var(--bg-muted)", padding: "6px 14px", borderRadius: 10 }}>{verifiedDocs} / 6 VALIDATED</span>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {state.documents.map((doc) => (
                  <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", background: "var(--bg-muted)", borderRadius: 16, border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>{doc.label}</div>
                    {doc.status === "verified" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#10B981", fontSize: "0.8rem", fontWeight: 900 }}>
                         <CheckCircle2 size={18} /> FULL
                      </div>
                    ) : (
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 700 }}>PENDING</div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </main>
    </>
  );
}
