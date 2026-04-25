# zk-KYC | Privacy-Preserving On-Chain Identity

zk-KYC is a premium, privacy-first identity verification platform. It allows users to verify their identity once using their passport's NFC chip and receive a **Soulbound Token (SBT)** on the blockchain as proof of verification—without revealing a single byte of their personal data.

## 🚀 Key Features

- **NFC Passport Scanning:** Read biometric passport chips directly in the browser via Web NFC API.
- **Zero-Knowledge Proofs (ZKP):** Generate cryptographic proofs locally using SnarkJS and Circom circuits.
- **Soulbound Tokens (SBT):** Receive a non-transferable ERC-721 token on Polygon as permanent on-chain verification.
- **Privacy First:** No personal data ever leaves the user's device. No cloud storage, no databases.
- **Institution Portal:** Banks and DeFi apps can verify identity status instantly via smart contract calls.

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide React
- **Web3:** Wagmi, RainbowKit, Viem, Ethers.js
- **ZK Circuit:** SnarkJS, Circom (Groth16)
- **Blockchain:** Polygon Amoy Testnet, Solidity, Hardhat
- **Authentication:** Wallet-based (RainbowKit)

## 📁 Project Structure

- `src/app/` - Next.js pages and API routes
  - `verification/` - 3-step ZKP generation flow
  - `dashboard/` - User identity and platform access panel
  - `bank/` - Institution verification portal
- `src/lib/` - ZK proof generation and utility logic
- `contracts/` - Solidity Soulbound Token and Verifier contracts
- `scripts/` - Deployment and utility scripts

## 🚦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_id_here
AMOY_RPC_URL=https://rpc-amoy.polygon.technology
PRIVATE_KEY=your_wallet_private_key
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### 4. Deploy Smart Contracts
```bash
npx hardhat run scripts/deploy.ts --network amoy
```

## 🔐 Privacy & Security

The core principle of zk-KYC is that **Identity is a proof, not a record.** We utilize the `kyc_verifier.wasm` and `kyc_verifier_final.zkey` to generate proofs on the client side. The smart contract only sees the result of the proof, ensuring maximum privacy.

---

Built for the future of compliant DeFi. ✨
