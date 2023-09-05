import { connectDB } from "@/lib/connectDB";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function PATCH(req) {
  await connectDB();
  const { token, password } = await req.json();
  const tokenCrypto = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: tokenCrypto,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Mã  thông báo không hợp lệ hoặc hết hạn" },
      { status: 400 }
    );
  }

  user.password = password;
  user.passwordChatAt = Date.now();
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.save();

  return NextResponse.json(
    { message: "thay đổi mật khẩu thành công" },
    { status: 200 }
  );
}
