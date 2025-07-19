import connectToMongoDb from "@/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(2, { message: "name is too short" }),
  email: z.string().email({ message: "email is not valid" }),
  password: z.string().min(8, { message: "password is too short" }),
  imageUrl: z
    .string()
    .min(2, { message: "url is too short" })
    .regex(
      /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      { message: "image url is not valid" }
    ),
  aadhaarNumber: z
    .string()
    .length(12, { message: "aadhaar number is not valid" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (
      !body.name ||
      !body.email ||
      !body.password ||
      !body.aadhaarNumber ||
      !body.imageUrl
    ) {
      return NextResponse.json(
        { error: "missing required fields" },
        { status: 400 }
      );
    }
    const parsedData = registrationSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error }, { status: 400 });
    }
    await connectToMongoDb();
    const existingUser = await User.findOne({
      $and: [{ email: body.email }, { aadhaarNumber: body.aadhaarNumber }],
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await User.create({ ...body, password: hashedPassword });
    return NextResponse.json(
      { message: "user registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to register user, please try again later" },
      { status: 500 }
    );
  }
}
