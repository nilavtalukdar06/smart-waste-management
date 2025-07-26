import { ICard } from "@/components/shared/card";
import {
  CheckCircle,
  Coins,
  Heart,
  Leaf,
  MapPin,
  Plus,
  Recycle,
  Sparkle,
} from "lucide-react";

export const cardItems: ICard[] = [
  {
    Icon: Leaf,
    title: "Environmental Impact",
    description:
      "Your contribution helps clean our environment and promotes sustainable waste management practices in communities.",
  },
  {
    Icon: Heart,
    title: "Community Support",
    description:
      "You're supporting local communities and waste management workers who keep our neighborhoods clean and healthy.",
  },
];

export const blogItems: IBlog[] = [
  {
    Icon: Plus,
    value: "100+",
    title: "Total Waste Reports",
    description:
      "A cumulative count of all waste reports submitted by users across various zones in the last 30 days, reflecting increased public engagement in environmental reporting.",
  },
  {
    Icon: CheckCircle,
    value: "100+",
    title: "Waste Collections Done",
    description:
      "Represents the number of waste pickups successfully verified by collectors, ensuring proper waste management and cleaner local environments.",
  },
  {
    Icon: Recycle,
    value: "34%",
    title: "Recycling Rate",
    description:
      "Indicates the proportion of total waste that has been identified as recyclable and processed through appropriate channels, showcasing our progress towards sustainability.",
  },
];

export const features: IFeature[] = [
  {
    Icon: MapPin,
    title: "Instant Waste Reporting",
    description: "Report waste with photo, type, and live location in seconds.",
  },
  {
    Icon: CheckCircle,
    title: "Real-time Collection Tracking",
    description:
      "Track the status of your waste reports from pending to collected.",
  },
  {
    Icon: Sparkle,
    title: "AI Insights & Analytics",
    description:
      "Get smart insights on waste trends, types, and community impact.",
  },
  {
    Icon: Coins,
    title: "Coin Rewards System",
    description:
      "Earn rewards for every verified report and climb the leaderboard.",
  },
];

export const faqs: IFaq[] = [
  {
    question: "What is Eco Swachh?",
    answer:
      "Eco Swachh is an AI-powered waste management platform that allows users to report waste, track collections, earn rewards, and access environmental insights — all in one place.",
  },
  {
    question: "How do I report waste?",
    answer:
      "You can report waste by uploading a photo, selecting the type of waste, and allowing location access. Your report is then sent to the nearest available collector for verification.",
  },
  {
    question: "What types of waste can I report?",
    answer:
      "Eco Swachh supports multiple categories including plastic, electronic, organic, metal, and mixed waste. You simply choose the category that best fits what you're reporting.",
  },
  {
    question: "How does the coin reward system work?",
    answer:
      "Every verified waste report earns you EcoCoins. The more reports you make and the more waste you collect, the more coins you earn. These contribute to your rank on the leaderboard.",
  },
  {
    question: "How can I track my waste report status?",
    answer:
      "Go to your dashboard to see the status of each report — whether it’s pending, verified, or collected — all updated in real time.",
  },
  {
    question: "Are there any insights or analytics available?",
    answer:
      "Yes! Eco Swachh provides AI-generated insights on your activity — including the most reported waste type, collection rate, and your personal impact summary.",
  },
];
