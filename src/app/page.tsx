"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ShieldCheck, Scan, Lock, ArrowRight, CheckCircle2,
  Zap, Globe, Database, Eye, ChevronRight, Star,
} from "lucide-react";

/* ── Scroll reveal hook ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Mock dashboard for hero right-side ─────────────────── */
function HeroDashboardCard() {
  return (
    <div
      className="float-card"
      style={{
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 24px 80px rgba(79,70,229,.15), 0 4px 16px rgba(0,0,0,.08)",
        padding: 28,
        width: "100%",
        maxWidth: 400,
        border: "1px solid var(--border)",
      }}
    >
      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"var(--accent-dim)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <ShieldCheck size={20} color="var(--accent)" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>Identity Token</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)" }}>zkKYC Pass</div>
          </div>
        </div>
        <span className="badge badge-green" style={{ fontSize: "0.75rem" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#16A34A", display:"inline-block" }} />
          Verified
        </span>
      </div>

      {/* Stats row */}
      {[
        { label: "Wallet", value: "0x4F2c...8E1a" },
        { label: "Issued", value: "Apr 17, 2025" },
        { label: "Token ID", value: "#0042" },
        { label: "Network", value: "Polygon Amoy" },
      ].map((r) => (
        <div
          key={r.label}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 0", borderBottom: "1px solid var(--border)",
            fontSize: "0.875rem",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>{r.label}</span>
          <span style={{ color: "var(--text)", fontWeight: 600 }}>{r.value}</span>
        </div>
      ))}

      {/* Platform badges */}
      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Platforms Unlocked
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["Aave Pro", "Uniswap KYC", "Coinbase"].map((p) => (
            <span key={p} className="badge badge-accent" style={{ fontSize: "0.75rem" }}>✓ {p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Feature card ────────────────────────────────────────── */
function FeatureCard({
  icon, title, desc, delay,
}: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="card card-lift"
      style={{ padding: 28 }}
    >
      <div
        style={{
          width: 48, height: 48, borderRadius: 13,
          background: "var(--accent-dim)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 18,
        }}
      >
        {icon}
      </div>
      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: "var(--text)" }}>{title}</h3>
      <p className="body-md" style={{ fontSize: "0.9rem", margin: 0 }}>{desc}</p>
    </motion.div>
  );
}

/* ── Alternating section ─────────────────────────────────── */
function AlternatingSection({
  label, title, desc, bullets, visual, reversed, delay,
}: {
  label: string; title: string; desc: string; bullets: string[];
  visual: React.ReactNode; reversed?: boolean; delay?: number;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 64,
        alignItems: "center",
        flexDirection: reversed ? "row-reverse" : "row",
      }}
      className="alt-grid"
    >
      <motion.div
        initial={{ opacity: 0, x: reversed ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: delay ?? 0 }}
        style={{ order: reversed ? 2 : 1 }}
      >
        <span className="section-tag">{label}</span>
        <h2 className="heading-md" style={{ marginBottom: 14, marginTop: 4 }}>{title}</h2>
        <p className="body-md" style={{ marginBottom: 24 }}>{desc}</p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {bullets.map((b) => (
            <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <CheckCircle2 size={17} color="var(--accent)" strokeWidth={2.5} style={{ marginTop: 3, flexShrink: 0 }} />
              <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reversed ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: (delay ?? 0) + 0.1 }}
        style={{ order: reversed ? 1 : 2, display: "flex", justifyContent: "center" }}
      >
        {visual}
      </motion.div>

      <style>{`@media (max-width: 768px) { .alt-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

/* ── Visual mock cards ──────────────────────────────────── */
function PrivacyCard() {
  return (
    <div className="card" style={{ padding: 28, maxWidth: 360, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ width:42, height:42, borderRadius:12, background:"var(--accent-dim)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Eye size={20} color="var(--accent)" />
        </div>
        <div>
          <div style={{ fontWeight: 700, color: "var(--text)" }}>Privacy Shield</div>
          <div style={{ fontSize:"0.8rem", color:"var(--text-muted)" }}>Your data stays on-device</div>
        </div>
      </div>
      {["No server upload", "Client-side ZK proof", "Passport data encrypted", "Hash-only on-chain"].map((item, i) => (
        <div key={item} style={{
          display:"flex", alignItems:"center", gap:10,
          padding:"9px 12px", borderRadius:10,
          background: i === 0 ? "var(--accent-dim)" : "var(--bg-subtle)",
          marginBottom:6,
          fontSize:"0.85rem", fontWeight:500, color: i===0 ? "var(--accent)" : "var(--text-secondary)"
        }}>
          <CheckCircle2 size={14} color={i===0?"var(--accent)":"var(--text-muted)"} />
          {item}
        </div>
      ))}
    </div>
  );
}

function NoStorageCard() {
  return (
    <div className="card" style={{ padding:28, maxWidth:360, width:"100%" }}>
      <div style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:16 }}>Data flow</div>
      {[
        { from:"Passport NFC", to: "Local Device", icon:<Scan size={14}/> },
        { from:"Local Device", to:"ZK Circuit", icon:<Lock size={14}/> },
        { from:"ZK Circuit", to:"Blockchain", icon:<ShieldCheck size={14}/> },
      ].map((step, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <div style={{ flex:1, padding:"10px 14px", borderRadius:10, background:"var(--bg-subtle)", fontSize:"0.82rem", fontWeight:600, color:"var(--text-secondary)" }}>{step.from}</div>
          <ChevronRight size={16} color="var(--text-muted)" style={{flexShrink:0}}/>
          <div style={{ flex:1, padding:"10px 14px", borderRadius:10, background: i===2?"var(--accent-dim)":"var(--bg-subtle)", fontSize:"0.82rem", fontWeight:600, color:i===2?"var(--accent)":"var(--text-secondary)" }}>{step.to}</div>
        </div>
      ))}
      <div style={{ marginTop:16, padding:"12px 16px", borderRadius:12, background:"#DCFCE7", display:"flex", alignItems:"center", gap:10 }}>
        <CheckCircle2 size={16} color="#16A34A" />
        <span style={{fontSize:"0.85rem", fontWeight:600, color:"#15803D"}}>Zero personal data stored on-chain</span>
      </div>
    </div>
  );
}

function AccessCard() {
  const apps = [
    { name:"Aave Pro", tag:"Lending", color:"#8B5CF6" },
    { name:"Uniswap KYC Pools", tag:"DEX", color:"#EC4899" },
    { name:"Coinbase Prime", tag:"Trading", color:"#0EA5E9" },
  ];
  return (
    <div className="card" style={{ padding:28, maxWidth:360, width:"100%" }}>
      <div style={{ fontWeight:700, marginBottom:16, color:"var(--text)" }}>Instant DeFi Access</div>
      {apps.map((a) => (
        <div key={a.name} style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"12px 14px", borderRadius:12, border:"1px solid var(--border)",
          marginBottom:8,
          background:"var(--bg)"
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:`${a.color}20`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Globe size={14} color={a.color} />
            </div>
            <div>
              <div style={{ fontSize:"0.875rem", fontWeight:600, color:"var(--text)" }}>{a.name}</div>
              <div style={{ fontSize:"0.75rem", color:"var(--text-muted)" }}>{a.tag}</div>
            </div>
          </div>
          <span className="badge badge-green" style={{fontSize:"0.72rem"}}>✓ Unlocked</span>
        </div>
      ))}
    </div>
  );
}

/* ── Live Verification Feed ─────────────────────────────── */
function LiveFeed() {
  const [items, setItems] = useState([
    { wallet: "0x71...2b88", status: "Minted", time: "2m ago" },
    { wallet: "0x1a...f92a", status: "Verified", time: "5m ago" },
    { wallet: "0xe2...31c4", status: "Proof Gen", time: "8m ago" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newItem = {
          wallet: `0x${Math.random().toString(16).slice(2, 4)}...${Math.random().toString(16).slice(2, 6)}`,
          status: Math.random() > 0.5 ? "Minted" : "Verified",
          time: "Just now"
        };
        return [newItem, ...prev.slice(0, 2)];
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: 24,
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }} className="live-feed">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <motion.div
            key={item.wallet}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="glass"
            style={{
              padding: "10px 16px",
              borderRadius: 14,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 200,
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16A34A" }} className="glow-pulse" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text)" }}>{item.wallet}</div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{item.status} · {item.time}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <style>{`@media(max-width:1024px){.live-feed{display:none!important;}}`}</style>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
export default function Home() {
  useReveal();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const features = [
    {
      icon: <Scan size={22} color="var(--accent)" strokeWidth={2}/>,
      title: "NFC Passport Scan",
      desc: "Read your biometric passport chip directly in the browser using Web NFC API — no app download required.",
    },
    {
      icon: <Lock size={22} color="var(--accent)" strokeWidth={2}/>,
      title: "Zero-Knowledge Proof",
      desc: "Generate a cryptographic proof of your identity client-side. Your passport data never leaves your device.",
    },
    {
      icon: <ShieldCheck size={22} color="var(--accent)" strokeWidth={2}/>,
      title: "Soulbound Token",
      desc: "Receive a non-transferable ERC-721 identity token on Polygon that serves as permanent on-chain verification.",
    },
    {
      icon: <Zap size={22} color="var(--accent)" strokeWidth={2}/>,
      title: "Instant Access",
      desc: "Once verified, automatically unlock compliant DeFi platforms, exchanges, and regulated financial services.",
    },
    {
      icon: <Globe size={22} color="var(--accent)" strokeWidth={2}/>,
      title: "Universal Credential",
      desc: "One verification works everywhere. Any DeFi app can query your on-chain status without accessing your data.",
    },
    {
      icon: <Database size={22} color="var(--accent)" strokeWidth={2}/>,
      title: "Zero Data Storage",
      desc: "No personal data stored on any server or blockchain. Only a cryptographic nullifier exists on-chain.",
    },
  ];

  const trustLogos = ["Polygon", "Ethereum", "Circom", "Hardhat", "RainbowKit", "SnarkJS"];

  return (
    <>
      <Navbar />
      {mounted && <LiveFeed />}
      <main>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section
          className="bg-gradient-hero"
          style={{ 
            paddingTop: 100, paddingBottom: 120, 
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Animated Grid Backdrop */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(var(--accent-glow) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 80%)",
            opacity: 0.4,
            pointerEvents: "none"
          }} />

          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 64,
                alignItems: "center",
              }}
              className="hero-grid"
            >
              {/* Left */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div style={{ marginBottom: 20 }}>
                  <span className="badge badge-accent">
                    <Star size={11} />
                    Zero-Knowledge Identity
                  </span>
                </div>
                <h1 className="heading-xl" style={{ marginBottom: 20 }}>
                  Verify Once.<br />
                  <span className="gradient-text">Stay Private.</span>
                </h1>
                <p className="body-lg" style={{ maxWidth: 460, marginBottom: 36 }}>
                  Scan your passport via NFC, generate a ZK proof locally, and receive a
                  Soulbound Token — without exposing any personal data.
                </p>

                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                  <Link href="/details" className="btn btn-primary btn-lg">
                    Start Verification <ArrowRight size={20} />
                  </Link>
                  <Link href="#how-it-works" className="btn btn-ghost btn-lg">
                    See How it Works
                  </Link>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 40 }}>
                  {[
                    { val: "100%", label: "On-device processing" },
                    { val: "0 bytes", label: "Personal data stored" },
                    { val: "<30s", label: "To get verified" },
                  ].map((s) => (
                    <div key={s.val}>
                      <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent)", lineHeight:1 }}>{s.val}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <HeroDashboardCard />
              </motion.div>
            </div>
          </div>

          <style>{`@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ── TRUST STRIP ──────────────────────────────────────── */}
        <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "#fff", padding: "28px 0" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Built with
              </span>
              {trustLogos.map((l) => (
                <span
                  key={l}
                  style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-muted)", opacity: 0.6 }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────── */}
        <section id="features" className="section">
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="section-tag">Features</span>
              <h2 className="heading-lg" style={{ marginTop: 8, marginBottom: 14 }}>Everything you need for on-chain identity</h2>
              <p className="body-lg" style={{ maxWidth: 520, margin: "0 auto" }}>
                A complete privacy-preserving identity stack built on proven cryptographic primitives.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 22,
              }}
              className="feature-grid"
            >
              {features.map((f, i) => (
                <FeatureCard key={f.title} {...f} delay={i * 0.07} />
              ))}
            </div>
          </div>

          <style>{`@media(max-width:1024px){.feature-grid{grid-template-columns:repeat(2,1fr)!important;}}@media(max-width:600px){.feature-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section id="how-it-works" className="section" style={{ background: "var(--bg-muted)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="section-tag">Process</span>
              <h2 className="heading-lg" style={{ marginTop: 8, marginBottom: 14 }}>Three steps to verified</h2>
              <p className="body-lg" style={{ maxWidth: 480, margin: "0 auto" }}>
                From passport scan to on-chain badge in under 30 seconds.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, position: "relative" }} className="steps-grid">
              {[
                { num: "01", icon: <Scan size={26} color="var(--accent)" />, title: "Scan Passport", desc: "Hold your biometric passport near your phone's NFC sensor to read the chip securely in-browser." },
                { num: "02", icon: <Lock size={26} color="var(--accent)" />, title: "Generate Proof", desc: "A Groth16 ZK circuit runs entirely on your device producing a cryptographic proof — never a scan upload." },
                { num: "03", icon: <ShieldCheck size={26} color="var(--accent)" />, title: "Claim Token", desc: "Submit the proof on-chain to mint your non-transferable Soulbound Token and unlock DeFi services." },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  style={{ position: "relative" }}
                >
                  {i < 2 && (
                    <div style={{
                      position: "absolute",
                      top: 24,
                      left: "calc(50% + 28px)",
                      right: "calc(-50% + 28px)",
                      height: 1,
                      background: "linear-gradient(90deg, var(--accent-light), var(--border))",
                    }} className="step-connector" />
                  )}
                  <div className="card" style={{ padding: "32px 28px", textAlign: "center", position: "relative", zIndex: 1 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: "var(--accent-dim)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 16px",
                    }}>
                      {step.icon}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: "0.75rem", color: "var(--accent)", letterSpacing: "0.08em", marginBottom: 8 }}>
                      STEP {step.num}
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>{step.title}</h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <style>{`@media(max-width:768px){.steps-grid{grid-template-columns:1fr!important;}.step-connector{display:none!important;}}`}</style>
        </section>

        {/* ── ALTERNATING SECTIONS ──────────────────────────────── */}
        <section className="section">
          <div className="container" style={{ display: "flex", flexDirection: "column", gap: 96 }}>
            <AlternatingSection
              label="Privacy"
              title="Your data never leaves your device"
              desc="All verification happens locally using SnarkJS and Circom circuits compiled to WebAssembly. Zero data is uploaded to any server."
              bullets={[
                "Passport chip read directly in-browser via Web NFC API",
                "Groth16 ZK circuit runs entirely client-side in WASM",
                "Only a cryptographic nullifier hash is published on-chain",
              ]}
              visual={<PrivacyCard />}
            />
            <AlternatingSection
              label="Zero Storage"
              title="Nothing personal is ever recorded"
              desc="Unlike traditional KYC, zk-KYC never stores your name, date of birth, or any biometric data — not even encrypted."
              bullets={[
                "No database, no cloud — zero infrastructure for personal data",
                "On-chain proof verifiable by anyone with no data exposure",
                "Passport nullifier prevents double-minting without linking identity",
              ]}
              visual={<NoStorageCard />}
              reversed
            />
            <AlternatingSection
              label="Access"
              title="Instant compliance for DeFi platforms"
              desc="Any smart contract or DeFi app calls isVerified() on our SBT contract to confirm compliance instantly with no data sharing."
              bullets={[
                "Single on-chain call for any platform to check KYC status",
                "Non-transferable Soulbound Token prevents identity resale",
                "Open-source verifier contract auditable by anyone",
              ]}
              visual={<AccessCard />}
            />
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <section
          className="section bg-gradient-cta"
          style={{ textAlign: "center" }}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,.15)",
                color: "rgba(255,255,255,.9)",
                fontSize: "0.8rem", fontWeight: 700,
                padding: "6px 14px", borderRadius: 999,
                marginBottom: 24, letterSpacing: "0.06em",textTransform:"uppercase"
              }}>
                <ShieldCheck size={13} />
                Privacy-first KYC
              </div>
              <h2 className="heading-lg" style={{ color: "#fff", marginBottom: 16 }}>
                Ready to prove your identity<br />without revealing it?
              </h2>
              <p style={{ color: "rgba(255,255,255,.75)", fontSize: "1.1rem", marginBottom: 36, maxWidth: 440, margin: "0 auto 36px" }}>
                Join users who've verified once and unlocked compliant DeFi — permanently.
              </p>
              <Link
                href="/verification"
                className="btn btn-lg"
                style={{ background: "#fff", color: "var(--accent)", fontWeight: 700, display:"inline-flex" }}
              >
                Start Verification <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────── */}
        <footer style={{ background: "var(--text)", color: "rgba(255,255,255,.5)", padding: "40px 0" }}>
          <div
            className="container"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width:28, height:28, borderRadius:7, background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <ShieldCheck size={14} color="#fff" />
              </div>
              <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>zkKYC</span>
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              {["Privacy Policy", "Terms", "Docs", "GitHub"].map((l) => (
                <a key={l} href="#" style={{ color: "rgba(255,255,255,.45)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>{l}</a>
              ))}
            </div>
            <div style={{ fontSize: "0.8rem" }}>© 2025 zkKYC. MIT License.</div>
          </div>
        </footer>
      </main>
    </>
  );
}
