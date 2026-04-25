"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type DocStatus = "empty" | "uploading" | "verified" | "error" | "review";

export interface UserDetails {
  fullName: string;
  dob: string;
  phone: string;
  address: string;
  employmentType: string;
  monthlyIncome: string;
}

export interface DocumentState {
  id: string;
  label: string;
  status: DocStatus;
  fileName?: string;
  importance: number; // weight for credit score
}

export interface SearchLog {
  address: string;
  timestamp: string;
  status: string;
  score: number;
}

interface AppState {
  userDetails: UserDetails;
  documents: DocumentState[];
  isVerified: boolean;
  creditScore: number;
  stats: {
    identityScore: number;
    financialScore: number;
    stabilityScore: number;
  };
  loanEligibility: {
    level: "Low" | "Medium" | "High";
    min: number;
    max: number;
  };
  searchHistory: SearchLog[];
}

interface AppContextType {
  state: AppState;
  setUserDetails: (details: UserDetails) => void;
  updateDocumentStatus: (id: string, status: DocStatus, fileName?: string) => void;
  calculateResults: () => void;
  addSearchLog: (address: string, score: number) => void;
  resetAll: () => void;
}

const initialDocs: DocumentState[] = [
  { id: "aadhaar", label: "Aadhaar Card", status: "empty", importance: 20 },
  { id: "pan", label: "PAN Card", status: "empty", importance: 20 },
  { id: "passport", label: "Passport", status: "empty", importance: 15 },
  { id: "bank", label: "Bank Statement", status: "empty", importance: 25 },
  { id: "salary", label: "Salary Slips", status: "empty", importance: 10 },
  { id: "tax", label: "Tax Returns (ITR)", status: "empty", importance: 10 },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    userDetails: {
      fullName: "",
      dob: "",
      phone: "",
      address: "",
      employmentType: "",
      monthlyIncome: "",
    },
    documents: initialDocs,
    isVerified: false,
    creditScore: 0,
    stats: {
      identityScore: 0,
      financialScore: 0,
      stabilityScore: 0,
    },
    loanEligibility: {
      level: "Low",
      min: 0,
      max: 0,
    },
    searchHistory: [],
  });

  const setUserDetails = (details: UserDetails) => {
    setState((prev) => ({ ...prev, userDetails: details }));
  };

  const updateDocumentStatus = (id: string, status: DocStatus, fileName?: string) => {
    setState((prev) => ({
      ...prev,
      documents: prev.documents.map((d) =>
        d.id === id ? { ...d, status, fileName } : d
      ),
    }));
  };

  const calculateResults = () => {
    // Simulated credit score calculation logic
    let score = 300; // Base score
    const verifedDocs = state.documents.filter((d) => d.status === "verified");
    
    verifedDocs.forEach(d => {
      score += (d.importance / 100) * 600;
    });

    // Add some variation based on income if provided
    const income = parseInt(state.userDetails.monthlyIncome) || 0;
    if (income > 100000) score += 50;
    else if (income > 50000) score += 20;

    const finalScore = Math.min(Math.round(score), 900);
    
    let level: "Low" | "Medium" | "High" = "Low";
    let min = 0;
    let max = 0;

    if (finalScore > 750) {
      level = "High";
      min = 500000;
      max = 2500000;
    } else if (finalScore > 600) {
      level = "Medium";
      min = 100000;
      max = 500000;
    } else {
      level = "Low";
      min = 0;
      max = 100000;
    }

    setState((prev) => ({
      ...prev,
      isVerified: true,
      creditScore: finalScore,
      stats: {
        identityScore: Math.round(finalScore * 0.95),
        financialScore: Math.round(finalScore * 0.88),
        stabilityScore: Math.round(finalScore * 0.92),
      },
      loanEligibility: { level, min, max },
    }));
  };

  const addSearchLog = (address: string, score: number) => {
    const log: SearchLog = {
      id: Math.random().toString(36).substr(2, 9),
      address,
      score,
      timestamp: new Date().toLocaleString(),
    };
    setState((prev) => ({
      ...prev,
      searchHistory: [log, ...prev.searchHistory.slice(0, 9)],
    }));
  };

  const resetAll = () => {
    setState({
      userDetails: { fullName: "", dob: "", phone: "", address: "", employmentType: "", monthlyIncome: "" },
      documents: initialDocs,
      isVerified: false,
      creditScore: 0,
      stats: { identityScore: 0, financialScore: 0, stabilityScore: 0 },
      loanEligibility: { level: "Low", min: 0, max: 0 },
    });
  };

  return (
    <AppContext.Provider value={{ state, setUserDetails, updateDocumentStatus, calculateResults, addSearchLog, resetAll }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
}
