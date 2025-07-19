"use client";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";
import LogoutButton from "../auth/logout-button";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <header className="px-5 py-4 w-full flex justify-between items-center">
      <div className="flex justify-center items-center gap-x-3">
        <Button className="pointer-events-none" variant="secondary">
          <Leaf />
        </Button>
        <p className="text-xl font-medium text-gray-600 hidden sm:inline-flex">
          Eco Swachh
        </p>
      </div>
      <div className="flex justify-center items-center gap-x-6">
        {true && (
          <div className="flex justify-center items-center gap-x-2">
            <Image
              src="/credit.svg"
              height={25}
              width={25}
              alt="picture of a coin"
            />
            <p className="text-neutral-500">Coins: 50</p>
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
