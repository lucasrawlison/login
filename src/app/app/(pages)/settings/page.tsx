"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession()
    const router = useRouter()
  
     useEffect(()=>{
        if(status === "unauthenticated"){
          router.push("/login");
        }
      },[session, router, status])
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        <h3 className="text-gray-700 text-3xl font-medium">Configurações</h3>
      </div>
    </main>
  );
}
