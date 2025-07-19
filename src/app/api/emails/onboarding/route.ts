import { EmailTemplate } from "@/components/email/email-template";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();
    const { data, error } = await resend.emails.send({
      from: "EcoSwachh <nilavtalukdar06@gmail.com>",
      to: [email],
      subject: "🌱 Welcome to Eco Swachh - Let's Clean Up Together!",
      react: EmailTemplate({ name: name }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to send the email" },
      { status: 500 }
    );
  }
}
