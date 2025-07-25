import { generateText } from "ai";
import { google } from "@ai-sdk/google";

interface IPrompt {
  totalReports: string;
  totalCollected: string;
  rank: number;
  rewards: number;
  mostReportedType: string;
  mostCollectedType: string;
}

const generateInsight = async (...params: IPrompt[]) => {
  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    prompt: `You are an assistant that generates a 100-150 word user summary for a waste management app.

            Here are the user's stats:
            - Total waste reports: ${params[0]}
            - Waste collected: ${params[1]}
            - Leaderboard rank: ${params[2]}
            - Total rewards: ${params[3]}
            - Most reported waste type: ${params[4]}
            - Most collected waste type: ${params[5]}

            Write a friendly, encouraging paragraph summarizing this user's performance.`,
  });

  return text;
};

export default generateInsight;
