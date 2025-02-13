"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState("Carregando aplicação");
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  const handleUserVerify = useCallback(async () => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      setIsLoadingUser(true);
      if (session?.user) {
        setLoadingStatus("Carregando Usuário");
        try {
          const response = await axios.post("/api/user-verify-create", {
            email: session.user?.email,
            name: session.user?.name || "User",
            imgLink: session.user.image
          });

          const { exists, user } = response.data;
          console.log(user);
          console.log(user.configs);

          if (!user.configs) {
            try {
              setLoadingStatus("Criando configurações do usuário");
              await axios.post("/api/createUserConfigs", {
                user,
              });
            } catch (error) {
              console.error("Error creating user configs", error);
            }
          }

          if (exists || user) {
            router.replace("/app/dashboard"); // Usa replace para evitar navegações extras
          } else {
            console.error("Failed to handle user data");
          }
        } catch (error) {
          console.error("Error checking or creating user", error);
        }
      }
    }
  }, [session, status, router]);

  useEffect(() => {
    handleUserVerify();
  }, [handleUserVerify]);

  if (status === "loading" || isLoadingUser) {
    return (
      <div className="h-screen w-screen flex items-center justify-center flex-col gap-2">
        <span>{loadingStatus}</span>
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  return null;
}
