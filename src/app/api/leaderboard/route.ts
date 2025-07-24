import connectToMongoDb from "@/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToMongoDb();
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("query")?.trim();
    const limit = 10;
    const filteredQuery = query
      ? {
          $or: [
            { name: { $regex: query.toString(), $options: "i" } },
            { email: { $regex: query.toString(), $options: "i" } },
          ],
        }
      : {};
    const result = await User.find(filteredQuery)
      .sort({ rewards: -1 })
      .limit(limit);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "error fetching users" },
      { status: 500 }
    );
  }
}
