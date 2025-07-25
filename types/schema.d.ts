import mongoose from "mongoose";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  aadhaarNumber: string;
  isVerified: boolean;
  rewards: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IWaste {
  _id?: mongoose.Types.ObjectId;
  type: string;
  items: string;
  weight: string;
  confidenceScore: number;
  status: string;
  location: string;
  imageUrl: string;
  reporter: mongoose.Schema.Types.ObjectId;
  collector: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IDisposal {
  _id?: mongoose.Types.ObjectId;
  isValid: boolean;
  disposalMethod: string;
  warning: string;
  report: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
