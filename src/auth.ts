import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const providers: Provider[] = [
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
    providers: [GitHub, Credentials({
      credentials:{
        email:{label:"Email", placeholder:"youremail@email.com", type: "email"},
        password: {label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if(!credentials.email || !credentials.password){
          return null
        }

        if (typeof credentials.email !== 'string') {
          throw new Error("O email deve ser uma string");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if(!user){
          throw new Error("Usuário não encontrado")
        }
        
        if(user.password !== credentials.password){
          throw new Error("Senha incorreta")
        }

        return { id: "1", email: user.email };

      }


    })],
    pages: {
      signIn: "/login",
    },
  });