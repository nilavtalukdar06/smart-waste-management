import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { SubscribeTemplate } from "@/components/email/subscribe-template";

const requestSchema = z.object({
  email: z.string().email({ message: "email is not valid" }),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json(
        { error: "email is not present in the request body" },
        { status: 400 }
      );
    }
    const parsedBody = requestSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody?.error.format() },
        { status: 400 }
      );
    }
    const { data, error } = await resend.emails.send({
      from: "EcoSwachh <nilavtalukdar06@imagify.space>",
      to: ["nilavtalukdar9@gmail.com"],
      subject: "Subscription",
      react: SubscribeTemplate({ userEmail: parsedBody.data.email }),
    });
    if (error) {
      return NextResponse.json(
        { error: "failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to send email" },
      { status: 500 }
    );
  }
}
