import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import axios from "axios"
 
interface User {
  email: string,
  password: string
}
const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      console.log(credentials)
      const user : User = await axios.post("/api/verifyUser", {credentials})
      console.log(user)
      

      if(credentials.email === user.email && credentials.password === user.password) {
        return user 
      }else{
        throw new Error("invalid credentials")
      }
    },
  }), 
  GitHub,
];



// Para que todos os providers apareçam no menu de login, é necessário criar um mapa com os dados de cada um deles.

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")


  export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub, Credentials],
    pages: {
      signIn: "/login",
    },
  });