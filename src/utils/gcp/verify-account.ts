import { GoogleGenAI } from "@google/genai";

async function main(imageUrl: string, aadhaarNumber: string) {
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
        text: `You are an identity verification AI assistant.

               You will be given:
               1. An image of an Aadhaar card.
               2. A 12-digit Aadhaar number submitted by the user: ${aadhaarNumber}

               Your tasks:
               - Extract the Aadhaar number from the image.
               - Validate the extracted number based on these rules:
               - It must be exactly 12 digits.
               - It must not start with 0 or 1.
               - It must only contain numbers (no letters or special characters).
               - Compare the extracted Aadhaar number with the provided user Aadhaar number.

               Respond in the following JSON format:

               {
                "extractedAadhaar": "XXXXXXXXXXXX",
                "isValid": true | false,
                "matchesUserInput": true | false
                }
                
                Respond only and only in the JSON format.
                Do not include any explanation or text outside the JSON.
                `,
      },
    ],
  });
  return result.text;
}

export default main;
