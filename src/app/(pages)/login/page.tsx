"use client";

import { useSearchParams } from "next/navigation";
import LoginForm from "./components/login-form"
import GithubLogin from "./components/github-login"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const searchParams = useSearchParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* <h1 className="text-xl font-bold">Login</h1> */}
      {/* Formulário de Login */}

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Entre com as credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">Or continue with</span>
          </div>
          <div className="mt-4 text-center">
            <GithubLogin />
          </div>
        </CardContent>
      </Card>

      {/* Provedores */}
      {/* <div className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-medium">Or sign in with:</h2>
        {["github"].map((provider) => (
          <button
            key={provider}
            className="bg-gray-800 text-white py-2 px-4 rounded-md"
            onClick={() => signIn(provider, { callbackUrl })}
          >
            Sign in with {provider}
          </button>
        ))}
      </div> */}
    </div>
  );
}
