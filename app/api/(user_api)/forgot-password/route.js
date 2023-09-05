import { connectDB } from "@/lib/connectDB";
import sendEmail from "@/lib/email";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const email = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "account not exists" },
      { status: 404 }
    );
  }
  const resetToken = await user.createResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.headers.get("origin")}/resetPassword/${resetToken}`;
  const message = `chúng tôi đã nhận được yêu cầu đặt lại mật khẩu của bạn, vui lòng sử dụng link bên dưới để đặt lại mật khẩu ${resetUrl}. Liên kết đặt lại mật khẩu này chỉ có hiệu lực 10 phút`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Đã nhận được yêu cầu thay đổi mật khẩu",
      message: message,
    });

    return NextResponse.json(
      {
        message: "liên kết đặt lại mật khẩu đã gửi đến email của bạn",
      },
      { status: 200 }
    );
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.save({ validateBeforeSave: false });
    return NextResponse.json(
      {
        message:
          "Đã xảy ra lỗi khi người dùng gửi Email đặt lại mật khẩu. Vui lòng thử lại",
      },
      { status: 500 }
    );
  }
}
