import { inngest } from "@/lib/inngest";
import connectToMongoDb from "@/db";
import User from "@/models/user.model";
import Waste from "@/models/waste.model";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export const updateUserData = inngest.createFunction(
  { id: "update-user-data" },
  { event: "waste/verified" },
  async ({ event, step }) => {
    const { userId, reportId, name } = event.data;
    await connectToMongoDb();

    await step.run("update-points", async () => {
      await User.findByIdAndUpdate(userId, { $inc: { rewards: 50 } });
    });

    await step.run("update-status", async () => {
      const result = await Waste.findOneAndUpdate(
        { _id: reportId, status: "pending", collector: userId },
        { $set: { status: "collected" } },
        { new: true }
      );
      if (!result) {
        throw new Error("failed to update status");
      }
    });

    await step.run("trigger-update", async () => {
      await pusher.trigger("waste-channel", "completed", {
        message: `${name} has collected waste just now`,
      });
    });

    return {
      success: true,
    };
  }
);
