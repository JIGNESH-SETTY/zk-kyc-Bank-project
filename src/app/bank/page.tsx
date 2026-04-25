"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  ShieldCheck, Search, CheckCircle2, XCircle, AlertCircle,
  Globe, ArrowRight, Building2,
} from "lucide-react";

type Status = "idle" | "loading" | "verified" | "not-verified";

const KNOWN_VERIFIED = [
  "0x4F2c...8E1a",
  "0x1234",
  "0xabcd",
  "test",
  "demo",
];

export default function BankPortal() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [meta, setMeta] = useState<{ tokenId: string; issuedOn: string } | null>(null);

  const check = async () => {
    if (!address.trim()) return;
    setStatus("loading");
    setMeta(null);

    // Simulate contract call
    await new Promise((r) => setTimeout(r, 1600));

    const isKnown = KNOWN_VERIFIED.some((v) => address.toLowerCase().includes(v.toLowerCase()));
    if (isKnown) {
      setStatus("verified");
      setMeta({ tokenId: "#0042", issuedOn: "April 17, 2025" });
    } else {
      setStatus("not-verified");
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg-muted)", minHeight: "calc(100vh - 68px)", padding: "64px 24px 96px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>

          {/* ── Header ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: 48 }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: "var(--accent-dim)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Building2 size={26} color="var(--accent)" strokeWidth={2} />
            </div>
            <h1 className="heading-md" style={{ marginBottom: 12 }}>Financial Institution Portal</h1>
            <p className="body-md" style={{ fontSize: "0.9rem", maxWidth: 440, margin: "0 auto" }}>
              Enter a wallet address to verify zkKYC compliance status on-chain.
              No personal data is revealed — only a verified / not verified result.
            </p>
          </motion.div>

          {/* ── Search card ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
            style={{ padding: 32 }}
          >
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.875rem", color: "var(--text)", marginBottom: 8 }}>
              Wallet Address
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                className="input"
                placeholder="0x... or paste full wallet address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setStatus("idle");
                }}
                onKeyDown={(e) => e.key === "Enter" && check()}
                style={{ flex: 1 }}
              />
              <button
                onClick={check}
                className="btn btn-primary"
                disabled={!address.trim() || status === "loading"}
                style={{ flexShrink: 0 }}
              >
                {status === "loading" ? (
                  <div className="spinner" style={{
                    width: 16, height: 16,
                    border: "2px solid rgba(255,255,255,.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                  }} />
                ) : (
                  <><Search size={16} /> Check</>
                )}
              </button>
            </div>

            {/* Hint */}
            <p style={{ marginTop: 10, fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Try <code style={{ background: "var(--bg-subtle)", padding: "1px 5px", borderRadius: 4, fontWeight: 600 }}>demo</code> or <code style={{ background: "var(--bg-subtle)", padding: "1px 5px", borderRadius: 4, fontWeight: 600 }}>0x4F2c...8E1a</code> to see a verified result.
            </p>
          </motion.div>

          {/* ── Result ────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {status === "verified" && (
              <motion.div
                key="verified"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                style={{ marginTop: 20 }}
              >
                <div className="card" style={{ padding: 28, borderColor: "#BBF7D0", background: "#F0FDF4" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: "#DCFCE7",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <CheckCircle2 size={24} color="#16A34A" strokeWidth={2.2} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#15803D", marginBottom: 4 }}>
                        ✓ Verified — KYC Compliant
                      </div>
                      <p style={{ fontSize: "0.875rem", color: "#166534", margin: "0 0 16px", lineHeight: 1.55 }}>
                        This wallet holds a valid zkKYC Soulbound Token on Polygon. The holder has passed
                        biometric identity verification via Zero-Knowledge Proof.
                      </p>
                      {meta && (
                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                          {[
                            { label: "Token ID", value: meta.tokenId },
                            { label: "Issued On", value: meta.issuedOn },
                            { label: "Standard", value: "ERC-721 (SBT)" },
                            { label: "Network", value: "Polygon Amoy" },
                          ].map((d) => (
                            <div key={d.label} style={{
                              background: "#DCFCE7", borderRadius: 8,
                              padding: "8px 14px", fontSize: "0.8rem",
                            }}>
                              <div style={{ color: "#16A34A", fontWeight: 700 }}>{d.value}</div>
                              <div style={{ color: "#166534", fontWeight: 500, marginTop: 2 }}>{d.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {status === "not-verified" && (
              <motion.div
                key="not-verified"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                style={{ marginTop: 20 }}
              >
                <div className="card" style={{ padding: 28, borderColor: "#FECACA", background: "#FEF2F2" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: "#FEE2E2",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <XCircle size={24} color="#DC2626" strokeWidth={2.2} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#B91C1C", marginBottom: 4 }}>
                        ✗ Not Verified
                      </div>
                      <p style={{ fontSize: "0.875rem", color: "#991B1B", margin: 0, lineHeight: 1.55 }}>
                        No valid zkKYC Soulbound Token found for this wallet address. The holder has not
                        completed identity verification or the token may have been revoked.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── How it works for banks ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card"
            style={{ padding: "28px 32px", marginTop: 24 }}
          >
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", marginBottom: 16, display:"flex", alignItems:"center", gap:8 }}>
              <AlertCircle size={16} color="var(--accent)" />
              How Smart Contract Verification Works
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Your system calls isVerified(walletAddress) on the deployed SBT contract.",
                "The contract returns a boolean — true if a valid Soulbound Token exists.",
                "Zero personal data is ever revealed or stored. The answer is simply verified or not.",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "var(--accent-dim)", color: "var(--accent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", fontWeight: 800, flexShrink: 0, marginTop: 1,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 20, padding: "12px 14px",
              background: "var(--bg-subtle)", borderRadius: 10,
              fontFamily: "monospace", fontSize: "0.82rem",
              color: "var(--accent)", wordBreak: "break-all",
            }}>
              bool verified = ZkKycSBT.isVerified(0x...walletAddress);
            </div>
          </motion.div>

          {/* Back link */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/dashboard" style={{ fontSize: "0.85rem", color: "var(--accent)", fontWeight: 600, textDecoration: "none", display:"inline-flex", alignItems:"center", gap:6 }}>
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
