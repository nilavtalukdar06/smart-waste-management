"use client";
import useRewards from "@/store/rewards";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LogoutButton from "../auth/logout-button";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

export default function Topbar() {
  const { data: session, status } = useSession();
  const { rewards, setInitialRewards } = useRewards();

  useEffect(() => {
    if (session && status === "authenticated") {
      setInitialRewards(session.user.rewards);
    }
  }, [session, status, setInitialRewards]);

  return (
    <header className="flex justify-between md:justify-end items-center p-3 border-b">
      <SidebarTrigger className="md:hidden" />
      <div className="flex justify-center items-center gap-x-6">
        {status === "authenticated" && session && (
          <div className="flex justify-center items-center gap-x-2">
            <Image
              src="/credit.svg"
              height={25}
              width={25}
              alt="picture of a coin"
            />
            <p className="text-neutral-500">Coins: {rewards}</p>
          </div>
        )}
        {status === "loading" ? (
          <Skeleton className="h-[36px] w-[100px]" />
        ) : session ? (
          <LogoutButton />
        ) : (
          <Link href="/login">
            <Button>
              Get Started <ArrowRight className="hidden sm:inline-flex" />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
