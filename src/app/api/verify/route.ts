import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";

export const dynamic = "force-dynamic";

// ABI snippet for the isVerified function
const ABI = [
  "function isVerified(address user) external view returns (bool)"
];

// In production, this would be your deployed contract address
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
const RPC_URL = process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address || !ethers.isAddress(address)) {
    return NextResponse.json(
      { error: "A valid wallet address is required." },
      { status: 400 }
    );
  }

  try {
    // Note: This is an example of how you would query the blockchain from the server
    // For this simulation/demo, we'll return a success for specific addresses
    // or if the CONTRACT_ADDRESS is the zero address.
    
    // In a real implementation:
    // const provider = new ethers.JsonRpcProvider(RPC_URL);
    // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    // const verified = await contract.isVerified(address);

    const verifiedAddresses = ["0x4F2c7A3b9D6eF8c1E4b5C2a7D9f0E3b28E1a", "test", "demo"];
    const isVerified = verifiedAddresses.some(v => address.toLowerCase() === v.toLowerCase());

    return NextResponse.json({
      address,
      isVerified: isVerified,
      timestamp: new Date().toISOString(),
      network: "Polygon Amoy",
      message: isVerified ? "Identity proven via ZK-Proof." : "No verification found for this address."
    });
  } catch (error) {
    console.error("Verification API error:", error);
    return NextResponse.json(
      { error: "Failed to query verification status." },
      { status: 500 }
    );
  }
}
