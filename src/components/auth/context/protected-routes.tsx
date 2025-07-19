"use client";
import { SessionProvider } from "next-auth/react";

export default function ProtectedRoutes({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SessionProvider>{children}</SessionProvider>;
}
