import authOptions from "@/lib/auth";
import User from "@/models/user.model";
import Waste from "@/models/waste.model";
import collect from "@/utils/gcp/collect-waste";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Pusher from "pusher";
import axios from "axios";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

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
        { error: parsedBody.error.format() },
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
    if (!parsedResponse?.isValid) {
      return NextResponse.json({ error: "not a valid image" }, { status: 403 });
    }
    const waste = await Waste.findOneAndUpdate(
      {
        _id: parsedBody.data.reportId,
        status: "pending",
        collector: session.user.id,
      },
      { $set: { status: "collected" } },
      { new: true }
    );
    if (!waste) {
      return NextResponse.json(
        { error: "report is not present" },
        { status: 404 }
      );
    }
    await User.findByIdAndUpdate(session.user.id, { $inc: { rewards: 50 } });
    try {
      await axios.post(`${process.env.NEXTAUTH_URL}/api/waste/dispose`, {
        report: parsedBody.data.reportId,
        isValid: true,
        disposalMethod: parsedResponse?.disposalMethod,
        warning: parsedResponse?.howNottoDispose,
      });
    } catch (error) {
      console.error(error);
    }
    await pusher.trigger("waste-channel", "collected", {
      message: `${session.user.name} has collected waste just now`,
    });
    await pusher.trigger("user-channel", "user-collected-waste", {
      message: `${session.user.name} has just got 50 points for collecting waste`,
    });
    return NextResponse.json(parsedResponse, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to verify the image" },
      { status: 500 }
    );
  }
}
