import authOptions from "@/lib/auth";
import Waste from "@/models/waste.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    const { reportId } = await request.json();
    if (!reportId) {
      return NextResponse.json(
        { error: "report id is not present in the request body" },
        { status: 400 }
      );
    }
    const report = await Waste.findById(reportId);
    if (!report) {
      return NextResponse.json({ error: "no report found" }, { status: 404 });
    }
    if (report.reporter.toString() === session.user.id) {
      return NextResponse.json(
        { error: "you cannot collect your own waste" },
        { status: 403 }
      );
    }
    const result = await Waste.findOneAndUpdate(
      { _id: reportId, status: "not-collected", collector: { $exists: false } },
      { $set: { status: "pending", collector: session?.user?.id } },
      { new: true }
    );
    if (!result) {
      return NextResponse.json(
        { error: "no reports found or waste is already collected" },
        { status: 403 }
      );
    }
    return NextResponse.json({ collectorId: session.user.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to collect waste" },
      { status: 500 }
    );
  }
}
