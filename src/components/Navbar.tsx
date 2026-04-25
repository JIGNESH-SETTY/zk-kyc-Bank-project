"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Bank Portal", href: "/bank-portal" },
  ];

  return (
    <header
      className="navbar"
      style={{ boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,.06)" : "none" }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{
            width: 34, height: 34,
            background: "var(--accent)",
            borderRadius: 9,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ShieldCheck size={19} color="#fff" strokeWidth={2.2} />
          </div>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em" }}>
            zk<span style={{ color: "var(--accent)" }}>KYC</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }} className="desktop-nav">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "10px 16px",
                borderRadius: "var(--radius-full)",
                transition: "all .2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 12px" }} />
          <Link href="/connect" className="btn btn-primary" style={{ padding: "10px 24px", fontSize: "0.875rem" }}>
            Get Verified
          </Link>

          <button
            onClick={toggleTheme}
            style={{
              background: "var(--bg-subtle)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              width: 38, height: 38,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              marginLeft: 8,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none", border: "none", cursor: "pointer",
            padding: 6, borderRadius: 8, color: "var(--text)"
          }}
          className="mobile-toggle"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              borderTop: "1px solid var(--border)",
              background: "#fff",
              padding: "16px 24px 20px",
              display: "flex", flexDirection: "column", gap: 4
            }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: "11px 14px",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/verification"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary"
              style={{ marginTop: 8, justifyContent: "center" }}
            >
              Get Verified
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
