import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to send email" },
      { status: 500 }
    );
  }
}
