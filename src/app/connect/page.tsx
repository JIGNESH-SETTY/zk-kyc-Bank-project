"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAccount, useConnect } from "wagmi";
import { Wallet, ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConnectWalletPage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // If already connected, user can just proceed
  const handleContinue = () => {
    router.push("/details");
  };

  return (
    <>
      <Navbar />
      <main style={{ 
        minHeight: "calc(100vh - 68px)", 
        background: "var(--bg-muted)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        padding: "40px 24px" 
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.4,
          pointerEvents: "none"
        }} />

        <div className="container" style={{ maxWidth: 600, position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{ padding: "60px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}
          >
            {/* Top Shine */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, height: "4px",
              background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
              opacity: 0.6
            }} />

            <div style={{ 
              width: 80, height: 80, borderRadius: 24, 
              background: "var(--accent-dim)", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              margin: "0 auto 32px",
              boxShadow: "0 12px 30px var(--accent-glow)"
            }}>
              <Wallet size={36} color="var(--accent)" strokeWidth={2} />
            </div>

            <h1 className="heading-md" style={{ marginBottom: 16 }}>Connect Your Identity</h1>
            <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: 44 }}>
              Unlock government-grade identity verification and credit scoring by connecting your secure Web3 wallet.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {isConnected ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ 
                    padding: "20px", 
                    background: "var(--bg-subtle)", 
                    borderRadius: 16, 
                    border: "1px solid var(--accent)",
                    marginBottom: 8
                  }}
                >
                  <div style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>Connected Wallet</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", fontFamily: "monospace" }}>
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </div>
                </motion.div>
              ) : (
                <div style={{ padding: "32px", border: "2px dashed var(--border)", borderRadius: 20, marginBottom: 8 }}>
                   <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0 }}>Please use the "Connect Wallet" button in the menu or browser extension.</p>
                </div>
              )}

              <button 
                className="btn btn-primary" 
                style={{ width: "100%", padding: "18px", fontSize: "1.05rem" }}
                onClick={handleContinue}
                disabled={!isConnected}
              >
                {isConnected ? "Continue to Details" : "Awaiting Connection..."} <ArrowRight size={20} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
               {[
                 { icon: ShieldCheck, label: "Encrypted" },
                 { icon: Lock, label: "Private" },
                 { icon: Zap, label: "Instant" },
               ].map((item, i) => (
                 <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <item.icon size={18} color="var(--text-muted)" />
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>{item.label}</span>
                 </div>
               ))}
            </div>
          </motion.div>

          <p style={{ textAlign: "center", marginTop: 32, fontSize: "0.8rem", color: "var(--text-muted)", opacity: 0.7 }}>
            By connecting, you agree to the zk-KYC Privacy Policy & Terms of Service.
          </p>
        </div>
      </main>
    </>
  );
}
