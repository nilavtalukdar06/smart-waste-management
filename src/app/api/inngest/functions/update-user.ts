import { inngest } from "@/lib/inngest";
import connectToMongoDb from "@/db";
import User from "@/models/user.model";

export const updateUser = inngest.createFunction(
  { id: "delete-unverified-user" },
  { event: "user/verified" },
  async ({ event }) => {
    await connectToMongoDb();
    const user = await User.findByIdAndUpdate(event.data.userId, {
      $set: { isVerified: true },
    });
    if (!user) {
      return {
        message: "user not found or failed to update",
      };
    } else {
      return {
        message: "user verification status updated successfully",
      };
    }
  }
);
