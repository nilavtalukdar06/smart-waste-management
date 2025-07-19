import mongoose from "mongoose";
import { IUser } from "../../types/schema";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "email is not valid",
      ],
    },
    aadhaarNumber: {
      type: String,
      required: [true, "aadhaar number is required"],
      unique: true,
      minLength: 12,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "the minimum length of the password must be 8"],
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    rewards: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
