"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useAppData } from "@/context/AppDataContext";
import { 
  Building2, Search, CheckCircle2, ShieldCheck, 
  TrendingUp, Landmark, AlertTriangle, FileText, UserCheck,
  History, Globe, Lock, Activity, ArrowRight,
  Loader2, BadgeCheck
} from "lucide-react";

export default function BankPortal() {
  const { state, addSearchLog } = useAppData();
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [approving, setApproving] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleSearch = () => {
    if (!searchQuery) return;
    setSearching(true);
    setSearchResult(null);
    setApproved(false);

    // Institutional simulation delay
    setTimeout(() => {
      const demoAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
      const isDemo = searchQuery.toLowerCase().includes("demo") || 
                     searchQuery === demoAddress || 
                     state.isVerified;
      if (isDemo) {
        const mockResult = {
          name: state.userDetails.fullName || "Demo Applicant",
          address: searchQuery,
          creditScore: state.creditScore || 785,
          eligibility: state.loanEligibility.level || "High",
          id: `ZK-PORTAL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        };
        setSearchResult(mockResult);
        addSearchLog(searchQuery, mockResult.creditScore);
      } else {
        setSearchResult(false); // not found
      }
      setSearching(false);
    }, 1800);
  };

  const handleApprove = () => {
    setApproving(true);
    // Simulate smart contract execution
    setTimeout(() => {
      setApproving(false);
      setApproved(true);
    }, 2500);
  };

  const inputStyle = {
    width: "100%",
    padding: "16px 20px",
    borderRadius: "14px",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--text)",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s",
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 68px)", background: "var(--bg-muted)", padding: "120px 24px" }}>
        <div className="container" style={{ maxWidth: 1200 }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
            <div>
              <div style={{ display: "inline-flex", padding: "8px 16px", background: "#DBEAFE", borderRadius: "var(--radius-full)", color: "#1D4ED8", fontSize: "0.85rem", fontWeight: 800, marginBottom: 12, letterSpacing: "1px" }}>
                 Institutional Gateway V4.0
              </div>
              <h1 className="heading-lg">Risk Assessment Portal</h1>
              <p className="body-md" style={{ color: "var(--text-secondary)", marginTop: 8 }}>Cryptographic audit interface for authorized financial institutions.</p>
            </div>
            <div style={{ display: "flex", gap: 32 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>System Status</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text)" }}><span style={{ color: "#10B981" }}>Operational</span></div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Audit Sessions</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--text)" }}>{state.searchHistory.length}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 32 }}>
            
            {/* Sidebar Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="card" style={{ padding: 32 }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                  <Search size={18} color="var(--accent)" /> Identity Search
                </h3>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: 8 }}>DEMO AUDIT IDENTITY (Click to copy)</div>
                  <code 
                    onClick={() => {
                      setSearchQuery("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
                      navigator.clipboard.writeText("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
                    }}
                    style={{ 
                      display: "block", background: "var(--bg-muted)", padding: "10px", borderRadius: "8px", 
                      fontSize: "0.75rem", cursor: "pointer", border: "1px solid var(--border)", color: "var(--accent)",
                      wordBreak: "break-all"
                    }}
                  >
                    0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                  </code>
                </div>

                <input 
                  type="text" 
                  placeholder="Enter Wallet Address..."
                  style={inputStyle}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  className="btn btn-primary" 
                  onClick={handleSearch}
                  disabled={searching}
                  style={{ width: "100%", marginTop: 16, padding: "14px" }}
                >
                  {searching ? "Auditing..." : "Perform Audit"}
                </button>
              </div>

              <div className="card" style={{ padding: 32, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                   <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Audit History</h3>
                   <History size={16} color="var(--text-muted)" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {state.searchHistory.length === 0 ? (
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>No recent logs.</p>
                  ) : (
                    state.searchHistory.slice().reverse().map((log) => (
                      <div 
                        key={log.id} 
                        style={{ padding: "14px", borderRadius: 12, background: "var(--bg-muted)", cursor: "pointer", border: "1px solid var(--border)", transition: "all 0.2s" }}
                        onClick={() => {
                          setSearchQuery(log.address);
                        }}
                      >
                        <div style={{ fontSize: "0.82rem", fontWeight: 700, fontFamily: "monospace", color: "var(--text)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis" }}>
                          {log.address}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 700 }}>{log.timestamp}</span>
                          <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "var(--accent)" }}>{log.score}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <AnimatePresence mode="wait">
                {searching ? (
                  <motion.div 
                    key="searching"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ padding: 120, textAlign: "center" }}
                    className="card"
                  >
                    <div className="spinner" style={{ width: 44, height: 44, margin: "0 auto 24px", border: "4px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%" }} />
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 800 }}>Authenticating ZK-Proof Hash</h3>
                    <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Cross-referencing with decentralised ID registries...</p>
                  </motion.div>
                ) : searchResult ? (
                  <motion.div 
                    key="result"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: "flex", flexDirection: "column", gap: 32 }}
                  >
                    <div className="card" style={{ padding: 56, borderTop: "6px solid var(--accent)", position: "relative", overflow: "hidden" }}>
                      
                      {/* Success Overlay for Approval */}
                      <AnimatePresence>
                        {approved && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.95)", zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 40 }}
                          >
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <BadgeCheck size={100} color="#10B981" />
                            </motion.div>
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginTop: 24, letterSpacing: "-1px" }}>Capital Authorized</h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: 460, marginTop: 12 }}>
                              The institutional smart contract has successfully executed. Disbursement of <strong>₹{state.loanEligibility.max.toLocaleString()}</strong> has been initiated.
                            </p>
                            <button className="btn btn-ghost" style={{ marginTop: 32, border: "1px solid var(--border)" }} onClick={() => setApproved(false)}>
                              Close Confirmation
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 56 }}>
                         <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                               <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px #10B981" }} />
                               <span style={{ fontSize: "0.9rem", fontWeight: 900, color: "#10B981", textTransform: "uppercase", letterSpacing: "1px" }}>Verification Success</span>
                            </div>
                            <h2 style={{ fontSize: "2.8rem", fontWeight: 900, color: "var(--text)", letterSpacing: "-1.5px" }}>{searchResult.name}</h2>
                            <div style={{ fontSize: "0.95rem", color: "var(--text-muted)", fontFamily: "monospace", marginTop: 8 }}>SESSION: {searchResult.id}</div>
                         </div>
                         <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase" }}>Zk-Credit Score</div>
                            <div style={{ fontSize: "4.5rem", fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>{searchResult.creditScore}</div>
                         </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                        {[
                          { label: "Lending Tier", value: searchResult.eligibility, icon: Landmark, color: "var(--accent)" },
                          { label: "Assets Audited", value: "6 / 6 Files", icon: FileText, color: "var(--accent)" },
                          { label: "Fraud Risk", value: "Minimal", icon: ShieldCheck, color: "#10B981" },
                        ].map((stat) => (
                          <div key={stat.label} style={{ padding: "24px", background: "var(--bg-muted)", borderRadius: 16, border: "1px solid var(--border)" }}>
                            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                               <stat.icon size={18} color={stat.color} />
                               <span style={{ fontSize: "0.75rem", fontWeight: 900, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.label}</span>
                            </div>
                            <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text)" }}>{stat.value}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: 56, paddingTop: 40, borderTop: "1px solid var(--border)", display: "flex", gap: 16 }}>
                         <button 
                           className="btn btn-primary" 
                           onClick={handleApprove}
                           disabled={approving}
                           style={{ flex: 1, padding: "18px", position: "relative" }}
                         >
                           {approving ? (
                             <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                               <Loader2 size={20} className="spinner" /> Signing Contract...
                             </span>
                           ) : "Approve Authorized Lending"}
                         </button>
                         <button className="btn btn-ghost" style={{ flex: 1, border: "1px solid var(--border)", padding: "18px" }} onClick={() => window.open("/report")}>View Original Audit Report</button>
                      </div>
                    </div>
                  </motion.div>
                ) : searchResult === false ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    style={{ padding: 80, textAlign: "center" }}
                    className="card"
                  >
                    <AlertTriangle size={64} color="#EF4444" style={{ marginBottom: 24 }} />
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 900 }}>Hash Not Resolved</h3>
                    <p style={{ color: "var(--text-secondary)", marginTop: 8, maxWidth: 400, margin: "8px auto 0" }}>This wallet address has no authenticated identity records within the zk-KYC ecosystem.</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ padding: 120, textAlign: "center", border: "2px dashed var(--border)", borderRadius: 24 }}
                  >
                    <Building2 size={80} color="var(--border)" style={{ marginBottom: 24 }} />
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--text-muted)" }}>Awaiting Parameters</h3>
                    <p style={{ color: "var(--text-muted)", marginTop: 12, maxWidth: 380, margin: "12px auto 0" }}>Enter a public identifier to perform an institutional-grade risk audit.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
