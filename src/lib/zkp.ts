import * as snarkjs from "snarkjs";

/**
 * Interface representing the structure of a ZK Proof
 */
export interface ZKProof {
  proof: any;
  publicSignals: string[];
}

/**
 * Generates a Zero-Knowledge Proof using SnarkJS
 * @param input - The private and public inputs for the circuit
 * @param wasmPath - Path to the compiled circuit's WASM file
 * @param zkeyPath - Path to the prover key file
 * @returns The generated proof and public signals
 */
export async function generateProof(
  input: any,
  wasmPath: string = "/circuits/kyc_verifier.wasm",
  zkeyPath: string = "/circuits/kyc_verifier_final.zkey"
): Promise<ZKProof> {
  try {
    // In a real application, these files would be in the public directory
    // or loaded from a CDN.
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      input,
      wasmPath,
      zkeyPath
    );

    return { proof, publicSignals };
  } catch (error) {
    console.error("Error generating ZK proof:", error);
    throw new Error("Failed to generate Zero-Knowledge proof locally.");
  }
}

/**
 * Prepares the calldata for the smart contract's mint function
 * @param zkProof - The generated ZK proof and public signals
 * @returns Arguments ready for a contract call
 */
export function formatCalldata(zkProof: ZKProof) {
  const { proof, publicSignals } = zkProof;

  // This follows the standard formatting for SnarkJS to Solidity
  const pA = [proof.pi_a[0], proof.pi_a[1]];
  const pB = [
    [proof.pi_b[0][1], proof.pi_b[0][0]],
    [proof.pi_b[1][1], proof.pi_b[1][0]],
  ];
  const pC = [proof.pi_c[0], proof.pi_c[1]];

  return { pA, pB, pC, publicSignals };
}
