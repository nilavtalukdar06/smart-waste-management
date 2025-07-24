import authOptions from "@/lib/auth";
import { inngest } from "@/lib/inngest";
import collect from "@/utils/gcp/collect-waste";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  reportedImageUrl: z
    .string()
    .min(2, { message: "image url is too short" })
    .regex(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/,
      { message: "image url is not valid" }
    ),
  collectedImageUrl: z
    .string()
    .min(2, { message: "image url is too short" })
    .regex(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/,
      { message: "image url is not valid" }
    ),
  reportId: z.string().min(2),
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
    const body = await request.json();
    const parsedBody = requestSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "invalid data format" },
        { status: 400 }
      );
    }
    const result = await collect(
      parsedBody.data.reportedImageUrl,
      parsedBody.data.collectedImageUrl
    );
    if (!result) {
      return NextResponse.json({ error: "failed to verify" }, { status: 404 });
    }
    const response = result.replace(/```json|```/g, "").trim();
    const parsedResponse = JSON.parse(response);
    if (parsedResponse?.isValid) {
      await inngest.send({
        name: "waste/verified",
        data: {
          userId: session.user.id,
          name: session.user.name,
          reportId: parsedBody.data.reportId,
        },
      });
    }
    return NextResponse.json(parsedResponse, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to verify the image" },
      { status: 500 }
    );
  }
}
