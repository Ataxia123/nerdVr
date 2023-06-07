"use client";
import Card from "@/app/components/ui/Card";
import Field from "@/app/components/ui/Field";
import PageHeading from "@/app/components/ui/PageHeading";
import { useSupabase } from "@/app/supabase-provider";
import { useToast } from "@/lib/hooks/useToast";

import { redirect } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";
import { MagicLinkLogin } from "./components/MagicLinkLogin";

export default function Login() {
  const { supabase, session } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { publish } = useToast();
  const { address } = useAccount();
  const handleLogin = async () => {
    setIsPending(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      publish({
        variant: "danger",
        text: error.message,
      });
    } else if (data) {
      publish({
        variant: "success",
        text: "Successfully logged in",
      });
    }
    setIsPending(false);
  };

  if (session?.user !== undefined) {
    redirect("/upload");
  }

  return (
    <main>
      <section className="w-full h-full outline-none flex flex-col gap-5 items-center justify-center p-6">
        <PageHeading title="Login" subtitle="Welcome back" />

        <Card className="max-w-md w-full p-5 sm:p-10 text-left">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-2"
          >
            <Field
              name="email"
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <MagicLinkLogin email={email} setEmail={setEmail} />
          </form>
        </Card>
      </section>
    </main>
  );
}
