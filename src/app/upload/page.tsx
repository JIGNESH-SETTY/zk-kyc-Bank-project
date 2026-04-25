"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppData } from "@/context/AppDataContext";
import Navbar from "@/components/Navbar";
import { Upload, CheckCircle2, FileText, AlertCircle, ArrowRight, Shield } from "lucide-react";

export default function DocumentUploadPage() {
  const router = useRouter();
  const { state, updateDocumentStatus } = useAppData();
  
  const uploadedCount = state.documents.filter(d => d.status === "uploading" || d.status === "verified").length;
  const totalCount = state.documents.length;

  const handleFileUpload = (id: string, fileName: string) => {
    updateDocumentStatus(id, "uploading", fileName);
    // Simulate upload completion
    setTimeout(() => {
      updateDocumentStatus(id, "verified", fileName);
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 68px)", background: "var(--bg-muted)", padding: "120px 24px" }}>
        <div className="container" style={{ maxWidth: 1040 }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ display: "inline-flex", padding: "8px 16px", background: "var(--accent-dim)", borderRadius: "var(--radius-full)", color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700, marginBottom: 12 }}
              >
                Verification Step 04
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="heading-lg" 
              >
                Document Dossier
              </motion.h1>
              <p style={{ color: "var(--text-secondary)", marginTop: 8, fontSize: "1.05rem" }}>Upload the following documents to achieve "High" trust level.</p>
            </div>
            
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
                Identity Integrity: {uploadedCount} / {totalCount} Verify Files
              </div>
              <div style={{ width: 280, height: 10, background: "var(--border)", borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(uploadedCount / totalCount) * 100}%` }}
                  style={{ height: "100%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent-glow)" }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
            {state.documents.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card card-lift"
                style={{ padding: 32, position: "relative", overflow: "hidden" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: "var(--accent-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FileText size={26} color="var(--accent)" />
                  </div>
                  <AnimatePresence>
                    {doc.status === "verified" ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 size={26} color="#10B981" /></motion.div>
                    ) : doc.status === "uploading" ? (
                      <div className="spinner" style={{ width: 24, height: 24, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%" }} />
                    ) : null}
                  </AnimatePresence>
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 8, color: "var(--text)" }}>{doc.label}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
                  {doc.status === "verified" 
                    ? `Encrypted: ${doc.fileName?.slice(0, 15)}...` 
                    : `Mandatory for ${doc.importance}% score weight.`}
                </p>

                <div style={{ position: "relative" }}>
                  <input 
                    type="file" 
                    id={`file-${doc.id}`}
                    style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", zIndex: 10 }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(doc.id, file.name);
                    }}
                  />
                  <div style={{
                    padding: "16px",
                    borderRadius: "var(--radius-md)",
                    border: "2px dashed var(--border)",
                    textAlign: "center",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: doc.status === "verified" ? "var(--accent-dim)" : "var(--bg)",
                    borderColor: doc.status === "verified" ? "var(--accent)" : "var(--border)"
                  }}
                  className="upload-area"
                  >
                    <Upload size={20} style={{ marginBottom: 6, color: doc.status === "verified" ? "var(--accent)" : "var(--text-muted)" }} />
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: doc.status === "verified" ? "var(--accent)" : "var(--text-secondary)" }}>
                      {doc.status === "verified" ? "Update Document" : "Upload File"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 80, display: "flex", justifyContent: "center" }}
          >
            <button 
              className="btn btn-primary btn-lg"
              disabled={uploadedCount === 0}
              onClick={() => router.push("/processing")}
              style={{ width: "100%", maxWidth: 440, padding: "20px" }}
            >
              Analyze Identity Data <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* Security Banner */}
          <div style={{ marginTop: 40, padding: "20px", borderRadius: "16px", background: "var(--card-bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
            <Shield size={24} color="var(--accent)" />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>Military-Grade Security</div>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Your documents are encrypted using AES-256 and never stored on public servers.</p>
            </div>
          </div>
        </div>
      </main>
      <style>{`
        .upload-area:hover { border-color: var(--accent); background: var(--accent-dim); }
        @media (max-width: 600px) {
          .heading-lg { font-size: 1.5rem !important; }
        }
      `}</style>
    </>
  );
}
