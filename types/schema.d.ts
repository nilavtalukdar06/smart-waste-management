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
