import { RoadmapData } from './types';

export const DEFAULT_ROADMAP: RoadmapData = {
  year1: {
    year: 1,
    title: "Real-Time Financial Intelligence",
    description: "Gemini integrates directly into banking cores, offering sub-100ms fraud detection and hyper-personalized customer support via the Live API. Real-time market data analysis becomes conversational.",
    features: [
      "Instant multi-modal fraud detection & risk scoring",
      "24/7 Hyper-personalized banking assistants",
      "Automated document processing (KYC/AML) at scale"
    ],
    icon: 'zap'
  },
  year3: {
    year: 3,
    title: "Autonomous Wealth Agents",
    description: "Gemini evolves into a proactive financial operating system. Autonomous agents manage portfolios, execute complex trading strategies, and handle cross-border regulatory compliance without human intervention.",
    features: [
      "Self-optimizing investment portfolio agents",
      "Automated global regulatory compliance & auditing",
      "Predictive insurance underwriting models"
    ],
    icon: 'brain'
  },
  year5: {
    year: 5,
    title: "Global Economic Synthesis",
    description: "Approaching financial singularity, Gemini runs massive-scale economic simulations to predict market shifts. It acts as a universal bridge for decentralized finance and global trade optimization.",
    features: [
      "Perfect-information market simulations",
      "Universal real-time currency & asset translation",
      "Sovereign-scale economic policy modeling"
    ],
    icon: 'globe'
  }
};