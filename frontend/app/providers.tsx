"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";
import { chains, config } from "../wagmi";

type Web3Context = {
  mounted: boolean;
};

const Context = createContext<Web3Context | undefined>(undefined);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Context.Provider value={{ mounted }}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    </Context.Provider>
  );
}

export const useWeb3 = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useWeb3 must be used inside Web3Provider");
  }

  return context;
};
