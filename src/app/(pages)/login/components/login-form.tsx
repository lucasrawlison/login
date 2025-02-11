"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", email, password)
    const response = await signIn("credentials", {
      email,
      password,
      redirect:false
    });

    if (response?.error) {
      // Se a resposta contiver erro, exibe a mensagem de erro
      console.log(response); // Aqui você pode tratar ou mostrar o erro ao usuário
      alert(response.error); // Exemplo: Alerta para o usuário
    } else if (response?.ok) {
      // Caso o login seja bem-sucedido
      console.log("Login bem-sucedido!");
    } else {
      // Se não for possível identificar o erro, exibe uma mensagem padrão
      console.log("Erro desconhecido, tente novamente.");
    }

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <Button type="submit" className="w-full">
        Log in
      </Button>
    </form>
  )
}

