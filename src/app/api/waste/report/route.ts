import connectToMongoDb from "@/db";
import authOptions from "@/lib/auth";
import User from "@/models/user.model";
import Waste from "@/models/waste.model";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  type: z.string().min(2, { message: "waste type is too short" }),
  items: z.string().min(2, { message: "waste items are too short" }),
  weight: z.string().min(1, { message: "weight is too short" }),
  confidenceScore: z.number(),
  location: z.string().min(2, { message: "location is too short" }),
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
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    const body = await request.json();
    if (
      !body.type ||
      !body.items ||
      !body.weight ||
      body.confidenceScore === undefined ||
      !body.location ||
      !body.imageUrl
    ) {
      return NextResponse.json(
        { error: "missing required fields" },
        { status: 400 }
      );
    }
    const parsedBody = bodySchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error }, { status: 400 });
    }
    await connectToMongoDb();
    await Waste.create({ ...parsedBody.data, reporter: session?.user?.id });
    await User.findByIdAndUpdate(session?.user?.id, { $inc: { rewards: 10 } });
    try {
      await axios.post(
        `${process.env.NEXTAUTH_URL!}/api/waste/report/push-notification`,
        { location: parsedBody.data.location }
      );
    } catch (error) {
      console.error(error);
    }
    return NextResponse.json(
      { message: "successfully reported waste" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to report waste" },
      { status: 500 }
    );
  }
}
