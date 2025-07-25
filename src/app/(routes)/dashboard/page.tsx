import ReportWaste from "@/components/dialog/report-waste";
import Insight from "@/components/shared/insight";
import SummaryCard from "@/components/shared/summary-card";
import authOptions from "@/lib/auth";
import { TriangleAlert } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const nameArray = session?.user.name.split(" ");
  const firstName = Array.from(nameArray[0]).join("");

  return (
    <section className="p-4">
      <h2 className="text-2xl sm:text-3xl font-medium text-neutral-600">
        Welcome {firstName}😎
      </h2>
      {!session.user.isVerified && (
        <div className="my-4 p-4 flex justify-start text-sm items-center bg-red-50 rounded-lg gap-x-6 font-light">
          <TriangleAlert className="text-red-500 hidden sm:inline-flex" />
          <div className="text-red-500">
            You have not verified your account yet, please click on this link to{" "}
            <Link href="/security" className="underline text-red-700">
              verify.
            </Link>{" "}
            If you failed to do so, your account will get deleted after 7 days.
          </div>
        </div>
      )}
      <div className="my-4">
        <ReportWaste />
        <SummaryCard />
        <Insight />
      </div>
    </section>
  );
}
