"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function GithubLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <>
      {["github"].map((provider) => (
        <Button
          key={provider}
          className="bg-gray-800 text-white py-2 px-4 rounded-md flex items-center gap-2"
          onClick={() => signIn(provider, { callbackUrl })}
        >
          <GithubIcon />
          Sign in with {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </Button>
      ))}
    </>
  );
}
