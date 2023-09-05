"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
const SignInBtn = () => {
  return (
    <button
      type='button'
      className='flex flex-center items-center gap-4 shadow-sm hover:shadow-lg rounded-lg overflow-hidden pl-3 bg-white mx-3'
      onClick={() => signIn("google")}
    >
      <Image
        src='/google-logo.png'
        height={30}
        width={30}
        className='text-center'
      />

      <span className='flex-1 bg-blue-500 px-4 py-3 font-medium text-white border-blue-500 border hover:bg-blue-600 hover:border-blue-600'>
        {" "}
        Sign in with Google
      </span>
    </button>
  );
};

export default SignInBtn;
