import { connectDB } from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email } = await req.json();
  try {
    await connectDB();
    await User.create({ name, email });
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "faild to create user" },
      { status: 500 }
    );
  }
}
