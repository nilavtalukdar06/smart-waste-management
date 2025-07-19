import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { deleteUnverifiedUser } from "@/app/api/inngest/functions/delete-unverified-user";
import { sendEmail } from "../functions/send-email";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendEmail, deleteUnverifiedUser],
});
