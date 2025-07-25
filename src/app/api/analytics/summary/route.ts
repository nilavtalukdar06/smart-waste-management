import authOptions from "@/lib/auth";
import User from "@/models/user.model";
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
    const reports = await Waste.countDocuments({ reporter: session?.user?.id });
    const collections = await Waste.countDocuments({
      collector: session?.user?.id,
      status: "collected",
    });
    const users = await User.find({}, { rewards: 1 }).sort({ rewards: -1 });
    const rank =
      users.findIndex((user) => user._id.toString() === session?.user?.id) + 1;
    return NextResponse.json({ reports, collections, rank }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to get profile summary" },
      { status: 500 }
    );
  }
}
