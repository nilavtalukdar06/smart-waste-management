import mongoose from "mongoose";
import { IWaste } from "../../types/schema";

const wasteSchema = new mongoose.Schema<IWaste>(
  {
    type: {
      type: String,
      required: [true, "type of waste is required"],
    },
    items: {
      type: String,
      required: [true, "waste items are required"],
    },
    weight: {
      type: String,
      required: [true, "weight is required"],
    },
    confidenceScore: {
      type: Number,
    },
    location: {
      type: String,
      required: [true, "location is required"],
    },
    status: {
      type: String,
      required: true,
      enum: ["not-collected", "pending", "collected"],
      default: "not-collected",
    },
    imageUrl: {
      type: String,
      required: true,
      match: [
        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/,
        "image url is not valid",
      ],
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Waste =
  mongoose.models?.Waste || mongoose.model<IWaste>("Waste", wasteSchema);

export default Waste;
