import authOptions from "@/lib/auth";
import report from "@/utils/gcp/report-waste";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  imageUrl: z
    .string()
    .min(2, { message: "image url is too short" })
    .regex(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/,
      { message: "image url is not valid" }
    ),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "unauthenticated request" },
        { status: 401 }
      );
    }
    const body = await request.json();
    if (!body.imageUrl) {
      return NextResponse.json(
        { error: "missing required fields" },
        { status: 400 }
      );
    }
    const parseBody = bodySchema.safeParse(body);
    if (!parseBody.success) {
      return NextResponse.json(
        { error: "invalid data format" },
        { status: 400 }
      );
    }
    const result = await report(parseBody.data.imageUrl);
    if (!result) {
      return NextResponse.json(
        { error: "failed to analyze image" },
        { status: 403 }
      );
    }
    const cleanedOutput = result.replace(/```json|```/g, "").trim();
    const output = JSON.parse(cleanedOutput);
    return NextResponse.json(output, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to analyze waste" },
      { status: 500 }
    );
  }
}
