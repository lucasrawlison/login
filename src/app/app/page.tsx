"use client"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(()=>{
    if(status === "unauthenticated"){
      router.push("/login");
    }

    if(session){
      router.push("/app/dashboard");
    }
  },[session, router])
  
  if (status === "loading") {
    return null // Exibe enquanto a sessão é carregada
  }

    
  

  return null; // Evita renderização até o redirecionamento ser concluído


}

 
