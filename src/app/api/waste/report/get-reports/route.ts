import connectToMongoDb from "@/db";
import authOptions from "@/lib/auth";
import Waste from "@/models/waste.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    await connectToMongoDb();
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("query")?.trim();
    const page = parseInt(searchParams.get("page") || "1");
    const filteredQuery = query
      ? {
          $or: [
            { type: { $regex: query, $options: "i" } },
            { location: { $regex: query, $options: "i" } },
            { weight: { $regex: query, $options: "i" } },
            { items: { $regex: query, $options: "i" } },
            { status: { $regex: query, $options: "i" } },
          ],
        }
      : {};
    const totalDocuments = await Waste.countDocuments(filteredQuery);
    const result = await Waste.find(filteredQuery)
      .sort({ createdAt: -1 })
      .skip((page - 1) * 6)
      .limit(6);
    return NextResponse.json({ result, totalDocuments, page }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to fetch reports" },
      { status: 500 }
    );
  }
}
