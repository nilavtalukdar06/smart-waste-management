import authOptions from "@/lib/auth";
import Waste from "@/models/waste.model";
import Collection from "@/models/collection.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "user is not authenticated" },
        { status: 401 }
      );
    }
    const { reportId } = await request.json();
    if (!reportId) {
      return NextResponse.json(
        { error: "report id is not present in the request body" },
        { status: 400 }
      );
    }
    const result = await Waste.findById(reportId);
    if (!result) {
      return NextResponse.json({ error: "report not found" }, { status: 403 });
    }
    await Waste.updateOne({ _id: reportId }, { $set: { status: "pending" } });
    await Collection.create({ reportId, collectorId: session?.user?.id });
    return NextResponse.json({ collectorId: session.user.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "failed to collect waste" },
      { status: 500 }
    );
  }
}
