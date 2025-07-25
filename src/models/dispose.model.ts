import mongoose from "mongoose";
import { IDisposal } from "../../types/schema";

const disposalSchema = new mongoose.Schema<IDisposal>(
  {
    report: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Waste",
      unique: true,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
    disposalMethod: {
      type: String,
      required: true,
    },
    warning: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Dispose =
  mongoose.models?.Dispose ||
  mongoose.model<IDisposal>("Dispose", disposalSchema);

export default Dispose;
