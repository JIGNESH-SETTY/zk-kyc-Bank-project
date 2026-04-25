"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppData } from "@/context/AppDataContext";
import Navbar from "@/components/Navbar";
import { User, Calendar, Phone, MapPin, Briefcase, IndianRupee, ArrowRight } from "lucide-react";

export default function UserDetailsPage() {
  const router = useRouter();
  const { state, setUserDetails } = useAppData();
  const [formData, setFormData] = useState(state.userDetails);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserDetails(formData);
    router.push("/upload");
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    paddingLeft: "44px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
    background: "var(--card-bg)",
    color: "var(--text)",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const iconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--text-muted)",
  } as const;

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 68px)", background: "var(--bg-muted)", padding: "120px 24px" }}>
        <div className="container" style={{ maxWidth: 840 }}>
          
          {/* Progress hint */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
             <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "var(--accent-dim)", borderRadius: "var(--radius-full)", color: "var(--accent)", fontSize: "0.8rem", fontWeight: 700 }}>
                Step 03 — Personal Profile
             </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-lg"
              style={{ paddingBottom: 16 }}
            >
              Identity Information
            </motion.h1>
            <p className="body-md" style={{ color: "var(--text-secondary)", maxWidth: 540, margin: "0 auto" }}>
              Our zero-knowledge system ensures your PII (Personally Identifiable Information) never touches a central server.
            </p>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
            style={{ padding: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
          >
            {/* Full Name */}
            <div style={{ gridColumn: "span 2", position: "relative" }}>
              <label style={{ display: "block", marginBottom: 12, fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", textTransform: "uppercase", letterSpacing: "1px" }}>Legal Full Name</label>
              <div style={{ position: "relative" }}>
                <User size={18} style={iconStyle} />
                <input 
                  type="text" 
                  required
                  placeholder="Enter as per Aadhaar / Passport"
                  style={inputStyle}
                  className="input-premium"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            {/* DOB */}
            <div style={{ position: "relative" }}>
              <label style={{ display: "block", marginBottom: 12, fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", textTransform: "uppercase", letterSpacing: "1px" }}>Date of Birth</label>
              <div style={{ position: "relative" }}>
                <Calendar size={18} style={iconStyle} />
                <input 
                  type="date"
                  required
                  style={inputStyle}
                  className="input-premium"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              </div>
            </div>

            {/* Phone */}
            <div style={{ position: "relative" }}>
              <label style={{ display: "block", marginBottom: 12, fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", textTransform: "uppercase", letterSpacing: "1px" }}>Phone Number</label>
              <div style={{ position: "relative" }}>
                <Phone size={18} style={iconStyle} />
                <input 
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  style={inputStyle}
                  className="input-premium"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Address */}
            <div style={{ gridColumn: "span 2", position: "relative" }}>
              <label style={{ display: "block", marginBottom: 12, fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", textTransform: "uppercase", letterSpacing: "1px" }}>Residential Address</label>
              <div style={{ position: "relative" }}>
                <MapPin size={18} style={iconStyle} />
                <input 
                  type="text"
                  required
                  placeholder="Street, City, State, Zip"
                  style={inputStyle}
                  className="input-premium"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>

            {/* Employment Type */}
            <div style={{ position: "relative" }}>
              <label style={{ display: "block", marginBottom: 12, fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", textTransform: "uppercase", letterSpacing: "1px" }}>Employment</label>
              <div style={{ position: "relative" }}>
                <Briefcase size={18} style={iconStyle} />
                <select 
                  required
                  style={{ ...inputStyle, appearance: "none" }}
                  className="input-premium"
                  value={formData.employmentType}
                  onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Salaried">Salaried Employee</option>
                  <option value="Self-Employed">Self-Employed / Freelance</option>
                  <option value="Business">Business Owner</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>
            </div>

            {/* Monthly Income */}
            <div style={{ position: "relative" }}>
              <label style={{ display: "block", marginBottom: 12, fontWeight: 700, fontSize: "0.85rem", color: "var(--text)", textTransform: "uppercase", letterSpacing: "1px" }}>Monthly Income</label>
              <div style={{ position: "relative" }}>
                <IndianRupee size={18} style={iconStyle} />
                <input 
                  type="number"
                  required
                  placeholder="Total net monthly (₹)"
                  style={inputStyle}
                  className="input-premium"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                />
              </div>
            </div>

            <div style={{ gridColumn: "span 2", marginTop: 24 }}>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "20px", fontSize: "1.1rem" }}>
                Confirm and Continue <ArrowRight size={20} />
              </button>
            </div>
          </motion.form>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: "0.8rem", color: "var(--text-muted)" }}>
            * This is a simulated verification system for demonstration purposes only.
          </p>
        </div>
      </main>
      <style>{`
        @media (max-width: 640px) {
          form { grid-template-columns: 1fr !important; padding: 24px !important; }
          form > div { grid-column: span 1 !important; }
        }
      `}</style>
    </>
  );
}
