import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      rewards: number;
      isVerified: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    rewards: number;
    isVerified: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    rewards: number;
    isVerified: boolean;
  }
}
