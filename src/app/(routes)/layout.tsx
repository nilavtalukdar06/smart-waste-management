import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/app-sidebar";
import Topbar from "@/components/shared/topbar";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <aside className="w-full">
        <Topbar />
        {children}
      </aside>
    </SidebarProvider>
  );
}
