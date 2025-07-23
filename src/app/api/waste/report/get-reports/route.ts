import connectToMongoDb from "@/db";
import authOptions from "@/lib/auth";
import Waste from "@/models/waste.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    await connectToMongoDb();
    const result = await Waste.find({ createdAt: -1 });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to fetch reports" },
      { status: 500 }
    );
  }
}
