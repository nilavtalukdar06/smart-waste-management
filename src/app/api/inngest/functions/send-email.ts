import { inngest } from "@/lib/inngest";
import axios from "axios";

export const sendEmail = inngest.createFunction(
  { id: "send-onboarding-email" },
  { event: "user/registered" },
  async ({ event }) => {
    const { name, email } = event.data;
    try {
      const response = await axios.post(
        `${process.env.NEXTAUTH_URL!}/api/emails/onboarding`,
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
