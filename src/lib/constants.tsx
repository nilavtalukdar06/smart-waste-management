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
