import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { deleteUnverifiedUser } from "@/app/api/inngest/functions/delete-unverified-user";
import { sendSuccessEmail } from "../functions/send-success-email";
import { sendEmail } from "../functions/send-email";
import { updateUser } from "../functions/update-user";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendEmail, deleteUnverifiedUser, sendSuccessEmail, updateUser],
});
