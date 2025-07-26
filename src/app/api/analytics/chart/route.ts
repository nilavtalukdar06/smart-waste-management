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

    const reportMap = new Map(
      reports.map((item: any) => [item._id, item.count])
    );
    const collectionMap = new Map(
      collections.map((item: any) => [item._id, item.count])
    );
    const allDatesSet = new Set<string>([
      ...reportMap.keys(),
      ...collectionMap.keys(),
    ]);
    const mergedData = Array.from(allDatesSet).map((date) => ({
      _id: date,
      reports: reportMap.get(date) || 0,
      collections: collectionMap.get(date) || 0,
    }));
    mergedData.sort(
      (a, b) => new Date(a._id).getTime() - new Date(b._id).getTime()
    );

    return NextResponse.json(mergedData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
