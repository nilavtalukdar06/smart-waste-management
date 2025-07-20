"use client";
import {
  BrainCircuit,
  LayoutDashboard,
  Medal,
  Recycle,
  Leaf,
  HandCoins,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Chatbot",
    url: "/chat",
    icon: BrainCircuit,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: Recycle,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: Medal,
  },
];

export default function AppSidebar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col justify-center items-start gap-y-6">
          <Link className="flex justify-center items-center gap-x-3" href="/">
            <Button className="pointer-events-none" variant="secondary">
              <Leaf />
            </Button>
            <p className="text-xl font-medium text-gray-800">Eco Swachh</p>
          </Link>
          {status === "loading" ? (
            <Skeleton className="w-full h-4 rounded-lg" />
          ) : (
            <p className="text-sm text-neutral-600">{session?.user.email}</p>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${pathname === item.url ? "bg-green-500 text-white hover:bg-green-500 hover:text-white active:bg-green-500 active:text-white" : ""}`}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/donate-us" className="w-full">
          <Button variant="secondary" className="w-full">
            <HandCoins />
            Donate Us
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
