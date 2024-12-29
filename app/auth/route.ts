// app/auth/route.ts
import NextAuth from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { supabase } from "@/lib/supabase"; // Adjust the import path as necessary
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: SupabaseAdapter(supabase),
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page
  },
});

export { handler as GET, handler as POST };