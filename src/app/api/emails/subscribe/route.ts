import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  email: z.string().email({ message: "email is not valid" }),
});

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
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to send email" },
      { status: 500 }
    );
  }
}
