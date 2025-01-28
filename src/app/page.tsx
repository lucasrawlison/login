"use client"
import {useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import axios from "axios";
import {LoaderCircle} from "lucide-react"


export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(()=>{
    const handleUserVerify = async () =>{
      if(status === "unauthenticated"){
        router.push("/login");
        return;
      }

      if(session){
        try {
          const response = await axios.post('/api/user-verify-create', {
            email: session.user?.email,
            name: session.user?.name || "User"
          })
          const {exists, user} = response.data;
          
          if(exists || user){
            router.push("/app/dashboard")
          }else{
            console.error("Failed to handle user data")
          }
        } catch (error) {
          console.error("Error checking or creating user")
        }
      }
    }
    handleUserVerify();

  },[session, router, status])
  
  if (status === "loading") {
    return (
    <div className=" h-screen w-screen flex items-center justify-center">
      <LoaderCircle className=" animate-spin"/>
    </div>  
    )
  }

  return null; // Evita renderização até o redirecionamento ser concluído


}

 
