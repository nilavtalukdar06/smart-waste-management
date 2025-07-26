import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { startOfDay, subDays } from "date-fns";
import { NextResponse } from "next/server";
import connectToMongoDb from "@/db";
import Waste from "@/models/waste.model";
import mongoose from "mongoose";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    const sevenDaysAgo = subDays(startOfDay(new Date()), 6);
    await connectToMongoDb();
    const reports = await Waste.aggregate([
      {
        $match: {
          reporter: new mongoose.Types.ObjectId(session?.user?.id),
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    const collections = await Waste.aggregate([
      {
        $match: {
          collector: new mongoose.Types.ObjectId(session?.user?.id),
          status: "collected",
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    return NextResponse.json({ reports, collections }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
