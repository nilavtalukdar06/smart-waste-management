import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const generateInsight = async (
  totalReports: number,
  totalCollected: number,
  rank: number,
  rewards: number,
  mostReportedType: string,
  mostCollectedType: string
) => {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: `You are an assistant that generates a 100-150 word user summary for a waste management app.

            Here are the user's stats:
            - Total waste reports: ${totalReports}
            - Waste collected: ${totalCollected}
            - Leaderboard rank: ${rank}
            - Total rewards: ${rewards}
            - Most reported waste type: ${mostReportedType}
            - Most collected waste type: ${mostCollectedType}

            Write a friendly, encouraging paragraph summarizing this user's performance.`,
  });

  return text;
};

export default generateInsight;
