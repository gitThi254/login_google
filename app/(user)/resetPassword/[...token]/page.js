import RegisterForm from "@/components/RegisterForm";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import React from "react";

const ResetPassword = ({ params }) => {
  const { token } = params;
  return (
    <div>
      <h1>Reset Password</h1>
      <ResetPasswordForm token={token[0]} />
    </div>
  );
};

export default ResetPassword;
