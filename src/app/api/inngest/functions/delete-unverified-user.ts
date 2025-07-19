import { inngest } from "@/lib/inngest";
import connectToMongoDb from "@/db";
import User from "@/models/user.model";

export const deleteUnverifiedUser = inngest.createFunction(
  { id: "delete-unverified-user" },
  { event: "user/registered" },
  async ({ event, step }) => {
    await step.sleep("wait-7-days", "7d");
    await connectToMongoDb();
    const user = await User.findById(event.data.userId);
    if (!user || user.isVerified) {
      return {
        message: "user not found or user is already verified",
      };
    } else {
      await User.findByIdAndDelete(event.data.userId);
      return {
        message: "user deleted due to no verification",
      };
    }
  }
);
