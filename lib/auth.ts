import { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/db";
import User from "./models/user.model";

interface ExtendedUser extends NextAuthUser {
  name?: string | null;
  image?: string | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: ExtendedUser;
      account: Account | null;
    }) {
      if (account?.provider === "google" && user.email) {
        await connectDB();

        try {
          await User.findOneAndUpdate(
            { email: user.email },
            {
              name: user.name,
              image: user.image,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );

          return true;
        } catch (error) {
          console.error("Error saving user to MongoDB:", error);
          return false;
        }
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
