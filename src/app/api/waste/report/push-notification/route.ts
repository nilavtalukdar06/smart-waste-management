import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";
import { z } from "zod";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

const bodySchema = z.object({
  name: z.string().min(2, { message: "name is too short" }),
  location: z.string().min(2, { message: "location is too short" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.location || !body.name) {
      return NextResponse.json(
        { error: "location is not sent" },
        { status: 400 }
      );
    }
    const parsedBody = bodySchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody?.error }, { status: 400 });
    }
    await pusher.trigger("waste-channel", "waste-reported", {
      message: `Waste reported by ${parsedBody.data.name || "someone"} at ${parsedBody.data.location}`,
    });
    return NextResponse.json({ message: "sent notification" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to push notifications" },
      { status: 500 }
    );
  }
}
