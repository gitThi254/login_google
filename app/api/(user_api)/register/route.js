import { connectDB } from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const userForm = await req.json();
  try {
    await connectDB();
    await User.create(userForm);
    return NextResponse.json(
      { message: "create user succcess" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "fail to create user",
      },
      {
        status: 500,
      }
    );
  }
}
