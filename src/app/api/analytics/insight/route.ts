import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "@/lib/auth";
import Waste from "@/models/waste.model";
import mongoose from "mongoose";
import User from "@/models/user.model";
import generateInsight from "@/utils/vercel/generate-insight";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    const totalReports = await Waste.countDocuments({
      reporter: session?.user?.id,
    });
    const totalCollected = await Waste.countDocuments({
      collector: session?.user?.id,
      status: "collected",
    });
    const users = await User.find({}, { rewards: 1 }).sort({ rewards: -1 });
    const rank =
      users.findIndex((user) => user._id.toString() === session.user.id) + 1;
    const mostReportedType = await Waste.aggregate([
      { $match: { reporter: new mongoose.Types.ObjectId(session?.user?.id) } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    const mostCollectedType = await Waste.aggregate([
      {
        $match: {
          collector: new mongoose.Types.ObjectId(session?.user?.id),
          status: "collected",
        },
      },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);
    const result = await generateInsight(
      totalReports,
      totalCollected,
      rank,
      session.user.rewards,
      mostReportedType[0]._id,
      mostCollectedType[0]._id
    );
    if (!result) {
      return NextResponse.json(
        { error: "failed to generate insights" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to generate insights" },
      { status: 500 }
    );
  }
}
