import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { deleteUnverifiedUser } from "@/app/api/inngest/functions/delete-unverified-user";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [deleteUnverifiedUser],
});
