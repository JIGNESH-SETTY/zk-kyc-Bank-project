"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppData } from "@/context/AppDataContext";
import Navbar from "@/components/Navbar";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, ShieldCheck, FileCheck } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();
  const { state } = useAppData();

  const total = state.documents.length;
  const verifiedCount = state.documents.filter(d => d.status === "verified").length;
  const accuracy = 98.4; // Simulated accuracy

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 68px)", background: "var(--bg-muted)", padding: "120px 24px" }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ width: 100, height: 100, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: "0 10px 40px rgba(22, 163, 74, 0.2)" }}
            >
              <ShieldCheck size={48} color="#10B981" />
            </motion.div>
            <h1 className="heading-lg" style={{ marginBottom: 12 }}>Dossier Analysis Complete</h1>
            <p className="body-md" style={{ color: "var(--text-secondary)", maxWidth: 580, margin: "0 auto" }}>
              Our automated gatekeeper has finished the cryptographic audit of your submitted assets.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 40 }} className="results-grid">
            {/* Summary Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card" 
                style={{ padding: 40, textAlign: "center", borderTop: "4px solid var(--accent)" }}
              >
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>{verifiedCount}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>Verified Assets</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card" 
                style={{ padding: 40, textAlign: "center", borderTop: "4px solid #10B981" }}
              >
                <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "#10B981", lineHeight: 1 }}>{accuracy}%</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>Data Reliability</div>
              </motion.div>
            </div>

            {/* Document List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card" 
              style={{ padding: 48 }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 32, color: "var(--text)" }}>Audit Classification Results</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {state.documents.map((doc, i) => {
                  // Simulate some variation for demo
                  const status: "Verified" | "Needs Review" | "Invalid" = 
                    doc.status === "verified" ? (i === 4 ? "Needs Review" : "Verified") : "Invalid";
                    
                  const colors = {
                    Verified: { bg: "#f0fdf4", text: "#16a34a", icon: CheckCircle2 },
                    "Needs Review": { bg: "#fefce8", text: "#a16207", icon: AlertCircle },
                    Invalid: { bg: "#fef2f2", text: "#dc2626", icon: XCircle }
                  };

                  const Theme = colors[status];
                  
                  return (
                    <div key={doc.id} style={{ 
                      display: "flex", alignItems: "center", justifyContent: "space-between", 
                      padding: "20px 24px", borderRadius: 16, background: "var(--bg-muted)",
                      border: "1px solid var(--border)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ padding: 10, borderRadius: 12, background: "var(--card-bg)" }}>
                          <FileCheck size={20} color="var(--accent)" />
                        </div>
                        <span style={{ fontWeight: 700, color: "var(--text)", fontSize: "1.05rem" }}>{doc.label}</span>
                      </div>
                      <div style={{ 
                        display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", 
                        borderRadius: "var(--radius-full)", background: Theme.bg, color: Theme.text,
                        fontSize: "0.8rem", fontWeight: 800
                      }}>
                        <Theme.icon size={16} /> {status}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div style={{ marginTop: 80, display: "flex", justifyContent: "center" }}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => router.push("/credit-score")}
              style={{ width: "100%", maxWidth: 440, padding: "20px" }}
            >
              Generate Credit Insights <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </main>
      <style>{`
        @media (max-width: 768px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
