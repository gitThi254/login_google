import { NextResponse } from "next/server";

const cloudinay = require("cloudinary").v2;

const cloudinaryConfig = cloudinay.config({
  api_key: process.env.API_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.API_SECRET,
  secure: true,
});

export async function GET() {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinay.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      cloudinaryConfig.api_secret
    );
    return NextResponse.json({ timestamp, signature }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
