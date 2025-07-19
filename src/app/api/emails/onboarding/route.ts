import { EmailTemplate } from "@/components/email/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().min(2, { message: "name is too short" }),
  email: z.string().email({ message: "invalid email" }),
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();
    if (!email || !name) {
      return NextResponse.json(
        { error: "missing required fields" },
        { status: 400 }
      );
    }
    const parsedData = bodySchema.safeParse({ email, name });
    if (!parsedData.success) {
      return NextResponse.json({ error: "invalid data" }, { status: 400 });
    }
    const { data, error } = await resend.emails.send({
      from: "EcoSwachh <nilavtalukdar06@imagify.space>",
      to: [parsedData.data.email],
      subject: "🌱 Welcome to Eco Swachh - Let's Clean Up Together!",
      react: EmailTemplate({ name: parsedData.data.name }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "failed to send the email" },
      { status: 500 }
    );
  }
}
