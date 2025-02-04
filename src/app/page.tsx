"use client"
import {useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios";
import {LoaderCircle} from "lucide-react"


export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loadingStatus, setLoadingStatus] = useState("Carregando aplicação")
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  useEffect(()=>{
    const handleUserVerify = async () =>{
      if(status === "unauthenticated"){
        router.push("/login");
        return;
      }

      if(status === "authenticated"){
        setIsLoadingUser(true)
        if(session?.user){
          setLoadingStatus("Carregando Usuário")
          try {
            const response = await axios.post('/api/user-verify-create', {
              email: session.user?.email,
              name: session.user?.name || "User"
            })
            const {exists, user} = response.data;
              console.log(user)
              console.log(user.configs)
            if(!user.configs){
              try {
                setLoadingStatus("Criando configurações do usuário")
                const configResponse = axios.post("/api/createUserConfigs",{
                  user
                })

                console.log(configResponse)
              } catch (error) {
                console.error("Error creating user configs", error)

              }
            }

            if(exists || user){

              router.push("/app/dashboard")
            }else{
              console.error("Failed to handle user data")
            }
          } catch (error) {
            console.error("Error checking or creating user", error)
          }
        }
      }
    }
    
    handleUserVerify();
  },[session, router, status])
  
  if (status === "loading") {
    return (
    <div className=" h-screen w-screen flex items-center justify-center flex-col gap-2">
      <span>{loadingStatus}</span>
      <LoaderCircle className=" animate-spin"/>
    </div>  
    )
  }
  
  if(isLoadingUser){
    return (
    <div className=" h-screen w-screen flex items-center justify-center flex-col gap-2">
      <span>{loadingStatus}</span>
      <LoaderCircle className=" animate-spin"/>
    </div>  
    )
    
  }

  return null; // Evita renderização até o redirecionamento ser concluído


}

 
