import { inngest } from "@/lib/inngest";
import axios from "axios";

export const sendSuccessEmail = inngest.createFunction(
  { id: "send-success-email" },
  { event: "user/verified" },
  async ({ event }) => {
    const { name, email } = event.data;
    try {
      const response = await axios.post(
        `${process.env.NEXTAUTH_URL!}/api/emails/success`,
        {
          name: name,
          email: email,
        }
      );
      console.log(response.data.id);
    } catch (error) {
      console.error(error);
    }
  }
);
