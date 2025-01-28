"use client"
import {useSession } from "next-auth/react"
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
      router.push("/app");
    }
    
  },[session, router, status])
  

  return null; // Evita renderização até o redirecionamento ser concluído


}

 
