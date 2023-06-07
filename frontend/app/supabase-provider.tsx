"use client";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  Session,
  createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import Moralis from "moralis";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

Moralis.start({
  apiKey: "your_api_key_here",
});

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient;
  session: MaybeSession;
};

export async function requestMessage({
  address,
  chain,
  network,
}: {
  address: string;
  chain: string;
  network: "evm";
}) {
  const result = await Moralis.Auth.requestMessage({
    address,
    chain,
    network,
    domain: "defi.finance",
    statement: "Please sign this message to confirm your identity.",
    uri: "https://defi.finance",
    expirationTime: "2023-01-01T00:00:00.000Z",
    timeout: 15,
  });

  const { message } = result.toJSON();

  return message;
}

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: MaybeSession;
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
