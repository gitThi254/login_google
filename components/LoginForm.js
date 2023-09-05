"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignInBtn from "./SignInBtn";
const LoginForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!user.username || !user.password) {
      setError("Vui lòng nhập đầy dủ thông tin");
      return;
    }
    try {
      const res = await signIn("credentials", { ...user, redirect: false });
      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      className='flex flex-col bg-violet-400 w-96 gap-5 py-5 px-3 rounded-md shadow-lg'
      onSubmit={handleSubmit}
    >
      <h1 className='text-center text-xl font-semibold text-white'>
        Login Form
      </h1>
      <input
        type='text'
        id='username'
        name='username'
        placeholder='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type='password'
        id='password'
        name='password'
        placeholder='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        type='submit'
        className='py-2 bg-white w-1/3 self-center rounded-md shadow-md'
      >
        Login
      </button>
      <div className='flex justify-between text-sm'>
        <Link href='/forgot-password'>
          <span className='text-white text-center hover:text-slate-100 underline'>
            forgotpassword
          </span>
        </Link>
        <Link href='/register'>
          Not registered?{" "}
          <span className='text-white text-center hover:text-slate-100 hover:underline'>
            Create an account
          </span>
        </Link>
      </div>
      {error && (
        <p className='p-2 text-white font-medium rounded-lg  bg-red-500 self-start'>
          {error}
        </p>
      )}
      <hr />
      <SignInBtn />
    </form>
  );
};

export default LoginForm;
