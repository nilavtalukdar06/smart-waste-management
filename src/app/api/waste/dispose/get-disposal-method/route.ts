import connectToMongoDb from "@/db";
import authOptions from "@/lib/auth";
import Dispose from "@/models/dispose.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  reportId: z.string().min(2, { message: "report id is too short" }),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    const { searchParams } = request.nextUrl;
    const reportId = searchParams.get("reportId");
    const parsedReportId = requestSchema.safeParse({ reportId });
    if (!parsedReportId.success) {
      return NextResponse.json(
        { error: parsedReportId.error.format() },
        { status: 400 }
      );
    }
    await connectToMongoDb();
    const result = await Dispose.findOne({
      report: parsedReportId.data.reportId,
    });
    if (!result) {
      return NextResponse.json(
        { error: "disposal method not found for this particular report" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to get disposal method" },
      { status: 500 }
    );
  }
}
