import { NextResponse } from "next/server";

export async function PATCH(req) {
  const token = await req.query;
  return NextResponse.json({ token });
}
