import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      rewards: number;
      isVerified: boolean;
      imageUrl: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    rewards: number;
    isVerified: boolean;
    imageUrl: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    rewards: number;
    isVerified: boolean;
    imageUrl: string;
  }
}
