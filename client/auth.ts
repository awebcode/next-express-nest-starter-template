import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { loginUser, refreshToken } from "./app/server_actions/auth";
import type { User } from "@prisma/client";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Github({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials.email) {
          throw new Error("No credentials provided");
        }
        try {
          const { email, password } = credentials as Pick<User, "email" | "password">;
          const user = await loginUser({ email, password });
          if (user) {
            return user;
          }
          return null;
        } catch {
          // throw new Error(error.message);
          throw new Error("Invalid credentials");
          // console.log({error})
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      if (new Date().getTime() < token.backendTokens.expiresAccessTokenAt) return token;
      return await refreshToken(token); //*generate new access token
    },

    async session({ token, session }) {
      session.user = token.user as any;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },

  theme: {
    colorScheme: "light",
  },
  // secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
  debug: false,
  logger: {
    error(code, ...metadata) {
      console.error(code, metadata);
    },
  },
});
