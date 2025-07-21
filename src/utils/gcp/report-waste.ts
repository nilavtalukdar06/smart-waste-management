import { GoogleGenAI } from "@google/genai";

async function report(imageUrl: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const response = await fetch(imageUrl);
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageData,
        },
      },
      {
        text: `You are a waste analysis assistant. A user uploads an image of waste, and your job is to analyze the image and return the following:

        1. The type of waste (e.g., plastic, organic, metal, electronic, glass, mixed, etc.)
        2. A description of what the waste primarily contains
        3. An approximate weight in kilograms (as a string, e.g., "1.2 kg")
        4. A confidence score in percentage (from 0 to 100)

        If the image is not related to waste, please put the confidence score as 0 not matter what

        Respond ONLY with valid JSON in the following format:

        {
         "type": "<waste type>",
         "items": "<description of items>",
         "weight": "<approximate weight in kg>",
         "confidenceScore": <confidence as a number>
        }

        example output:

        {
         "type": "organic",
         "items": "fruit peels, food scraps, and vegetable remains",
         "weight": "2.0 kg",
         "confidenceScore": 91.3
        }

        Do not include any explanation or text outside the JSON.
        `,
      },
    ],
  });
  return result.text;
}

export default report;
