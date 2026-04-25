"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-muted)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      textAlign: "center",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: "var(--accent-dim)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <ShieldCheck size={30} color="var(--accent)" strokeWidth={2} />
        </div>
        <div style={{ fontSize: "5rem", fontWeight: 900, color: "var(--accent)", lineHeight: 1, marginBottom: 8 }}>404</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Page not found</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: 32, maxWidth: 340 }}>
          The page you're looking for doesn't exist. Head back home and get verified.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          <ArrowLeft size={17} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
