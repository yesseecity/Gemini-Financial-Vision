import { GoogleGenAI, Type } from "@google/genai";
import { RoadmapData } from "../types";

// Initialize the client. API_KEY is expected to be in the environment.
// In a real production app, ensure this is handled via a backend proxy or secure env injection.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ROADMAP_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    year1: {
      type: Type.OBJECT,
      properties: {
        year: { type: Type.INTEGER },
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        features: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        icon: { type: Type.STRING, enum: ['zap', 'brain', 'globe'] }
      },
      required: ['year', 'title', 'description', 'features', 'icon']
    },
    year3: {
      type: Type.OBJECT,
      properties: {
        year: { type: Type.INTEGER },
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        features: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        icon: { type: Type.STRING, enum: ['zap', 'brain', 'globe'] }
      },
      required: ['year', 'title', 'description', 'features', 'icon']
    },
    year5: {
      type: Type.OBJECT,
      properties: {
        year: { type: Type.INTEGER },
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        features: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        icon: { type: Type.STRING, enum: ['zap', 'brain', 'globe'] }
      },
      required: ['year', 'title', 'description', 'features', 'icon']
    }
  },
  required: ['year1', 'year3', 'year5']
};

export const generateRoadmap = async (): Promise<RoadmapData> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a futuristic, optimistic, yet realistic 5-year development roadmap for Google's Gemini AI ecosystem, **specifically focusing on its integration with the Financial Industry (FinTech, Banking, Investment, Insurance).**
      
      Split the prediction into three distinct milestones:
      - Year 1 (Immediate Future)
      - Year 3 (Mid-term Evolution)
      - Year 5 (Long-term Horizon)

      For each milestone, provide:
      - A catchy, futuristic title related to Finance/Tech.
      - A concise but impactful description (approx 2 sentences) focusing on financial impact.
      - 3 key technological features or breakthroughs (e.g., fraud detection, algorithmic trading, personalized banking, economic simulation).
      - Select an icon type best suited for the phase: 'zap' (speed/transactions), 'brain' (analysis/advisory), or 'globe' (global economy/markets).

      Be creative. Imagine integration with blockchain, real-time market data, and automated wealth management.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: ROADMAP_SCHEMA,
        temperature: 0.7, 
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RoadmapData;
    } else {
      throw new Error("Empty response from Gemini API");
    }
  } catch (error) {
    console.error("Failed to generate roadmap:", error);
    throw error;
  }
};