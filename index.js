import 'dotenv/config';

import base58 from 'bs58';
import { SolanaTracker } from 'solana-swap';

import {
  Connection,
  Keypair,
  PublicKey,
} from '@solana/web3.js';

import { performSwap } from './lib.js';

const {
    RPC_URL,
    PRIVKEY,
    TOKEN_ADDR,
    SOL_BUY_AMOUNT,
    FEES,
    SLIPPAGE,
    SOL_ADDR,
    BUY_COUNT
} = process.env;

async function swap(tokenIn, tokenOut, solanaTracker, keypair, connection, amount) {
    try {
        const swapResponse = await solanaTracker.getSwapInstructions(
            tokenIn, // From Token
            tokenOut, // To Token
            amount, // Amount to swap
            SLIPPAGE, // Slippage
            keypair.publicKey.toBase58(), // Payer public key
            FEES, // Priority fee (Recommended while network is congested) => you can adapt to increase / decrease the speed of your transactions
            false // Force legacy transaction for Jupiter
        );

        console.log("Send swap transaction...");

        const tx = await performSwap(swapResponse, keypair, connection, amount, tokenIn, {
            sendOptions: { skipPreflight: true },
            confirmationRetries: 30,
            confirmationRetryTimeout: 1000,
            lastValidBlockHeightBuffer: 150,
            resendInterval: 1000,
            confirmationCheckInterval: 1000,
            skipConfirmationCheck: true
        });

        console.log("Swap sent : " + tx);
    } catch (e) {
        console.log("Error when trying to swap")
    }
}

async function getTokenBalance(connection, owner, tokenAddr) {
    const result = await connection.getTokenAccountsByOwner(owner, { mint: new PublicKey(tokenAddr) });
    const info = await connection.getTokenAccountBalance(result.value[0].pubkey);
    if (info.value.uiAmount == null) throw new Error('No balance found');
    return info.value.uiAmount;
}

async function main() {
    const keypair = Keypair.fromSecretKey(base58.decode(PRIVKEY));
    const solanaTracker = new SolanaTracker(keypair, RPC_URL);
    const connection = new Connection(RPC_URL);

    while (true) {
        // Buy
        const promises = [];
        for (let i = 0; i < BUY_COUNT; i++) {
            promises.push(swap(SOL_ADDR, TOKEN_ADDR, solanaTracker, keypair, connection, SOL_BUY_AMOUNT));
        }
       await Promise.all(promises);
        // Sell
        const balance = Math.round(await getTokenBalance(connection, keypair.publicKey, TOKEN_ADDR));
        await swap(TOKEN_ADDR, SOL_ADDR, solanaTracker, keypair, connection, balance);
        // Pause
        await new Promise(r => setTimeout(r, 2000)); // it's in milliseconds
    }
}

main();
