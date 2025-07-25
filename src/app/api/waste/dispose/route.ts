import connectToMongoDb from "@/db";
import Dispose from "@/models/dispose.model";
import Waste from "@/models/waste.model";
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
    const requestBody = await request.json();
    const parsedBody = bodySchema.safeParse(requestBody);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody?.error.format() },
        { status: 400 }
      );
    }
    await connectToMongoDb();
    const existingReport = await Waste.findOne({
      _id: parsedBody.data.report,
      status: "collected",
    });
    if (!existingReport) {
      return NextResponse.json(
        { error: "waste is not yet collected" },
        { status: 403 }
      );
    }
    const existingMethod = await Dispose.findOne({
      report: parsedBody.data.report,
    });
    if (existingMethod) {
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
