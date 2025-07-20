import connectToMongoDb from "@/db";
import authOptions from "@/lib/auth";
import User from "@/models/user.model";
import main from "@/utils/gcp/verify-account";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  imageUrl: z
    .string()
    .min(2, { message: "image url is too short" })
    .regex(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      { message: "image url is not valid" }
    ),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "unauthorized access" },
        { status: 401 }
      );
    }
    const body = await request.json();
    if (!body.imageUrl) {
      return NextResponse.json(
        { error: "image url is not present in the request body" },
        { status: 400 }
      );
    }
    const parsedBody = bodySchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error }, { status: 400 });
    }
    await connectToMongoDb();
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 403 });
    }
    const result = await main(body.imageUrl, user.aadhaarNumber);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to verify account" },
      { status: 500 }
    );
  }
}
