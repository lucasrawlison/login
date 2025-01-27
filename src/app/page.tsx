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
  },[session, router])
  
  if (status === "loading") {
    return <p>Loading...</p>; // Exibe enquanto a sessão é carregada
  }

  if (session?.user) {
    return (
      <div>
        Dashboard de {session.user.name}
        <button onClick={() => signOut()}>Sign Out</button>;
      </div>
    );
    
  }

  return null; // Evita renderização até o redirecionamento ser concluído


}

 
