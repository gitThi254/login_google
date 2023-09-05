import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import React from "react";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const RegisterPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div className='grid place-items-center h-screen -mt-24'>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
