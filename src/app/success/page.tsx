"use client";
import Card from "@/components/shared/card";
import { Button } from "@/components/ui/button";
import { cardItems } from "@/lib/constants";
import { ArrowDown, Home, Recycle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const orderId = useSearchParams().get("checkout_id");

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <div className="my-12 w-full flex flex-col justify-center items-center gap-6">
        <h2 className="text-2xl sm:text-3xl text-neutral-600 font-medium text-center">
          Thank You! 🌱
        </h2>
        <p className="text-center text-neutral-500">
          Your donation to <span className="text-green-500">Eco Swacch</span>{" "}
          makes a real difference!
        </p>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 place-items-center w-full h-full gap-6">
          {cardItems.map((item, index) => (
            <Card
              Icon={item.Icon}
              title={item.title}
              description={item.description}
              key={index + 1}
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-6">
          <Link href="/home">
            <Button>
              Home <Home />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary">
              Report Waste <Recycle />
            </Button>
          </Link>
        </div>
        {orderId && (
          <footer className="my-6 flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center gap-x-2 text-neutral-500 mb-2">
              Your Order Id <ArrowDown size={16} />
            </div>
            <div className="text-green-500 w-fit py-2 px-4 animate-pulse bg-green-50 rounded-lg border border-green-500">
              {orderId}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
