"use client";

import * as React from "react";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "zk-KYC",
  projectId: "placeholder_project_id", // In production, use a real ID from WalletConnect
  chains: [polygonAmoy],
  ssr: true, // Switched to true to improve SSR compatibility with Next.js
});

export default function WalletProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: "#4F46E5",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
