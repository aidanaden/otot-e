import NextAuth, { type NextAuthOptions } from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // EmailProvider({
    //   server: env.EMAIL_SERVER,
    //   from: env.EMAIL_FROM,
    // }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    // ...add more providers here
  ],
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);