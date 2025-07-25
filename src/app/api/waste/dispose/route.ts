import connectToMongoDb from "@/db";
import authOptions from "@/lib/auth";
import Dispose from "@/models/dispose.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  report: z.string().min(2),
  isValid: z.boolean(),
  disposalMethod: z.string().min(2),
  warning: z.string().min(2),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    const requestBody = await request.json();
    const parsedBody = bodySchema.safeParse(requestBody);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody?.error.format() },
        { status: 400 }
      );
    }
    await connectToMongoDb();
    const existingReport = await Dispose.findOne({
      report: parsedBody.data.report,
    });
    if (existingReport) {
      return NextResponse.json(
        { error: "disposal methods for that report already exist" },
        { status: 403 }
      );
    }

    const result = await Dispose.create(parsedBody.data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to add waste disposal methods" },
      { status: 500 }
    );
  }
}
