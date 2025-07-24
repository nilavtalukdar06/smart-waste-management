import { GoogleGenAI } from "@google/genai";

async function collect(reportedImageUrl: string, collectedImageUrl: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const convertToBase64 = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const imageArrayBuffer = await response.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");
    return base64ImageData;
  };

  const [reportedImage, collectedImage] = await Promise.all([
    convertToBase64(reportedImageUrl),
    convertToBase64(collectedImageUrl),
  ]);

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: reportedImage,
            },
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: collectedImage,
            },
          },
          {
            text: `You are an expert in image verification and waste classification.

            You will be provided with two images:
            1. "reportedImage": The original image reported by a user showing some waste.
            2. "collectedImage": An image captured by another user claiming to have collected the same waste.

            **Your task** is to:
            - Analyze both images.
            - Determine if they represent the *same* waste instance or not.
            - If they are the same, estimate a confidence score between 0 and 100%.
                    
            ### Response Rules:
                    
            1. If confidence score is **above 65%**, respond with:
            {"isValid": true, "disposalMethod": "<Write a proper and responsible method to dispose of the waste in 30-40 words>",                   "howNottoDispose": "<Mention incorrect or harmful ways people may dispose of this waste, in 30-40 words>"}
                    
            2. If confidence is **65% or lower**, respond with:
            {"isValid": false}
                    
            ### Very Important:
            - Only respond with **valid JSON**. No explanations or additional comments.
            - Ensure the JSON is minified (no indentation or line breaks).
            - Tailor the disposal advice based on the type of waste visible in the images (e.g., plastic, e-waste, organic, etc.).
                    
            Ready? Analyze the two images and return the response.`,
          },
        ],
      },
    ],
  });
  return result.text;
}

export default collect;
