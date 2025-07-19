import { serve } from "inngest/next";
import { inngest } from "@/utils/inngest";
import { deleteUnverifiedUser } from "@/inngest/functions/delete-unverified-user";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [deleteUnverifiedUser],
});
