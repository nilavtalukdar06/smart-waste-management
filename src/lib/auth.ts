import connectToMongoDb from "@/db";
import Credentials from "next-auth/providers/credentials";
import userModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { User, Session } from "next-auth";

const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please enter your credentials");
          }
          await connectToMongoDb();
          const existingUser = await userModel.findOne({
            email: credentials.email,
          });
          if (!existingUser) {
            throw new Error("Please register before you continue");
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (!isValid) {
            throw new Error("Invalid Credentials");
          }
          return {
            id: existingUser._id.toString(),
            name: existingUser.name,
            email: existingUser.email,
            isVerified: existingUser.isVerified,
            rewards: existingUser.rewards,
            imageUrl: existingUser.imageUrl,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { user: User; token: JWT }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isVerified = user.isVerified;
        token.imageUrl = user.imageUrl;
      }
      if (token.id) {
        await connectToMongoDb();
        const existingUser = await userModel.findById(token.id);
        token.rewards = existingUser.rewards;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.id) {
        session.user.id = token.id.toString();
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.isVerified = token.isVerified;
        session.user.rewards = token.rewards;
        session.user.imageUrl = token.imageUrl;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export default authOptions;
