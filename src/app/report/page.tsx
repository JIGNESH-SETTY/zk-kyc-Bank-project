"use client";

import { motion } from "framer-motion";
import { useAppData } from "@/context/AppDataContext";
import Navbar from "@/components/Navbar";
import { 
  ShieldCheck, User, Calendar, MapPin, 
  Landmark, TrendingUp, Download, Printer, 
  FileCheck, ShieldAlert, Award
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const router = useRouter();
  const { state } = useAppData();
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleString());
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const verifiedCount = state.documents.filter(d => d.status === "verified").length;
  const totalCount = state.documents.length;
  const accuracy = 90 + (verifiedCount / totalCount) * 8.4;
  const riskIndex = (1 - verifiedCount / totalCount) * 10;

  return (
    <>
      <Navbar />
      <main style={{ 
        minHeight: "calc(100vh - 68px)", 
        background: "var(--bg-muted)", 
        padding: "120px 24px 80px",
        position: "relative"
      }}>
        <div className="container" style={{ maxWidth: 900 }}>
          
          {/* Controls - Hidden in print */}
          <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <h2 className="heading-md" style={{ margin: 0 }}>Official Verification Report</h2>
            <div style={{ display: "flex", gap: 16 }}>
               <button onClick={handlePrint} className="btn btn-ghost" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                 <Printer size={18} /> Print Official Copy
               </button>
               <button className="btn btn-primary">
                 <Download size={18} /> Export as Evidence (PDF)
               </button>
            </div>
          </div>

          {/* Actual Report Document */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="report-container"
            style={{ 
              background: "#fff", 
              padding: "80px", 
              borderRadius: "4px", // More document-like
              boxShadow: "0 40px 100px rgba(0,0,0,0.1)",
              color: "#000",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Watermark */}
            <div style={{ 
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-30deg)",
              fontSize: "8rem", fontWeight: 900, color: "rgba(0,0,0,0.02)", pointerEvents: "none", whiteSpace: "nowrap"
            }}>
              ZK-VERIFIED IDENTITY
            </div>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "3px solid #f8f8f8", paddingBottom: "48px", marginBottom: "56px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--accent)", marginBottom: 16 }}>
                  <ShieldCheck size={40} />
                  <span style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-1.5px", color: "#000" }}>zk<span style={{ color: "var(--accent)" }}>KYC</span> NETWORK</span>
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>
                  Secured Identity Verification Output<br />
                  Batch ID: ZK-AUTH-{state.userDetails.fullName?.slice(0,3).toUpperCase() || "DEM"}-2025<br />
                  Validator Node: #PX-8802 (Polygon Mainnet)
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ padding: "10px 20px", background: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0", display: "inline-block" }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#16a34a", textTransform: "uppercase", letterSpacing: "1px" }}>
                    STATUS: {verifiedCount >= totalCount / 2 ? "VERIFIED" : "PARTIAL"}
                  </span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "#999", marginTop: 12, fontWeight: 600 }}>Issued: {timestamp}</div>
              </div>
            </div>

            {/* User Info Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", marginBottom: "64px" }}>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 900, color: "#aaa", textTransform: "uppercase", marginBottom: "20px", letterSpacing: "2px" }}>01. Applicant Profile</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}><User size={18} color="#ccc" /> <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{state.userDetails.fullName || "N/A"}</span></div>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}><Calendar size={18} color="#ccc" /> <span style={{ color: "#444" }}>DOB: {state.userDetails.dob || "N/A"}</span></div>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}><MapPin size={18} color="#ccc" style={{ marginTop: 2 }} /> <span style={{ fontSize: "0.9rem", color: "#444", lineHeight: 1.5 }}>{state.userDetails.address || "No address provided"}</span></div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 900, color: "#aaa", textTransform: "uppercase", marginBottom: "20px", letterSpacing: "2px" }}>02. Financial Verification</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}><Landmark size={18} color="#ccc" /> <span style={{ fontWeight: 700, color: "#444" }}>{state.userDetails.employmentType || "N/A"}</span></div>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}><TrendingUp size={18} color="#ccc" /> <span style={{ color: "#444" }}>Monthly Yield: ₹{parseInt(state.userDetails.monthlyIncome).toLocaleString() || "0"}</span></div>
                </div>
              </div>
            </div>

            {/* Main Scores Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px", marginBottom: "64px" }}>
              {[
                { label: "CREDIT SCORE", value: state.creditScore, footer: state.loanEligibility.level.toUpperCase() + " LEVEL", color: "#000" },
                { label: "IDENTITY TRUST", value: `${accuracy.toFixed(1)}%`, footer: `${verifiedCount}/${totalCount} ASSETS VALID`, color: verifiedCount < totalCount ? "#f59e0b" : "#16a34a" },
                { label: "FRAUD RISK INDEX", value: `${riskIndex.toFixed(2)}%`, footer: riskIndex < 2 ? "STATUS: LOWEST" : "STATUS: MODERATE", color: "#000" }
              ].map((card) => (
                <div 
                  key={card.label}
                  style={{ padding: "32px", background: "#f9fafb", borderRadius: "12px", border: "1px solid #eee", textAlign: "center" } as any}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#999", marginBottom: "12px", letterSpacing: "1px" }}>{card.label}</div>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: card.color }}>{card.value}</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#666", marginTop: 4 }}>{card.footer}</div>
                </div>
              ))}
            </div>

            {/* Asset Audit Log - Mandatory for Dynamic Feeling */}
            <div style={{ marginBottom: "64px" }}>
               <div style={{ fontSize: "0.75rem", fontWeight: 900, color: "#aaa", textTransform: "uppercase", marginBottom: "20px", letterSpacing: "2px" }}>03. Cryptographic Asset Inventory</div>
               <div style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                    <thead style={{ background: "#f9fafb", borderBottom: "1px solid #eee" }}>
                       <tr>
                         <th style={{ textAlign: "left", padding: "12px 20px" }}>Asset Identifier</th>
                         <th style={{ textAlign: "left", padding: "12px 20px" }}>Verification Hash</th>
                         <th style={{ textAlign: "right", padding: "12px 20px" }}>Status</th>
                       </tr>
                    </thead>
                    <tbody>
                       {state.documents.map((doc) => (
                         <tr key={doc.id} style={{ borderBottom: "1px solid #f8f8f8" }}>
                           <td style={{ padding: "12px 20px", fontWeight: 700 }}>{doc.label}</td>
                           <td style={{ padding: "12px 20px", color: "#666", fontFamily: "monospace" }}>
                             {doc.status === "verified" ? `0x${Math.random().toString(36).substr(2, 10).toUpperCase()}...` : "UNAVAILABLE"}
                           </td>
                           <td style={{ padding: "12px 20px", textAlign: "right", fontWeight: 800, color: doc.status === "verified" ? "#16a34a" : "#ccc" }}>
                             {doc.status === "verified" ? "AUTHENTIC" : "PENDING"}
                           </td>
                         </tr>
                       ))}
                    </tbody>
                  </table>
               </div>
            </div>

            {/* Eligibility Table */}
            <div style={{ background: "#000", padding: "48px", borderRadius: "12px", marginBottom: "64px", color: "#fff" }}>
              <h4 style={{ margin: "0 0 20px", fontSize: "0.9rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", opacity: 0.6 }}>04. Authorized Lending Threshold</h4>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-1px" }}>₹{state.loanEligibility.min.toLocaleString()} – ₹{state.loanEligibility.max.toLocaleString()}</div>
                  <div style={{ fontSize: "0.9rem", color: "#aaa", marginTop: 8 }}>Final liquidity recommendation generated by internal risk engine.</div>
                </div>
                <div style={{ padding: "12px 24px", background: "var(--accent)", borderRadius: "6px", fontWeight: 900, fontSize: "1rem", color: "#fff", textTransform: "uppercase" }}>
                  {state.loanEligibility.level} TIER
                </div>
              </div>
            </div>

            {/* Seal & Sign */}
            <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ color: "#aaa", fontSize: "0.8rem", fontWeight: 500 }}>
                Verification ID: {state.userDetails.fullName?.slice(0, 3).toUpperCase() || "ZKID"}-{(verifiedCount * 1234).toFixed(0)}<br/>
                Signed via ZK-Rollup Proof #40288
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "130px", height: "130px", borderRadius: "50%", border: "2px dashed var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.6, marginBottom: 12, color: "var(--accent)", transform: "rotate(-10deg)" }}>
                   <div style={{ fontSize: "0.7rem", fontWeight: 900 }}>DIGITALLY<br/>EXECUTED<br/>ZK-PROOF</div>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#000", fontWeight: 800 }}>zk-KYC Authority</div>
                <div style={{ fontSize: "0.75rem", color: "#999", fontWeight: 600 }}>Secured Verification Node</div>
              </div>
            </div>
            
            <p style={{ textAlign: "center", marginTop: 80, fontSize: "0.75rem", color: "#999", maxWidth: "600px", margin: "80px auto 0" }}>
              Disclaimer: This document is a cryptographic simulation. For legal verification, use the original SBT token address on the Polygon network. The data reflects verified assets as of the issuance timestamp.
            </p>
          </motion.div>

          <div className="no-print" style={{ marginTop: 64, display: "flex", gap: 24, justifyContent: "center" }}>
            <button className="btn btn-primary btn-lg" onClick={() => router.push("/dashboard")} style={{ padding: "18px 48px" }}>
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          nav { display: none !important; }
          body { background: #fff !important; }
          main { padding: 0 !important; background: #fff !important; }
          .report-container { 
            box-shadow: none !important; 
            border: none !important; 
            padding: 20px !important;
            border-radius: 0 !important;
          }
           @page {
            margin: 20mm;
          }
        }
      `}</style>
    </>
  );
}
