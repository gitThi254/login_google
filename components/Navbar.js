"use client";
import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
const Navbar = () => {
  const { status } = useSession();
  return (
    <div className='flex p-5 justify-between items-center bg-violet-500 shadow-md'>
      <Link href='/' className='text-white text-lg font-medium'>
        Home
      </Link>
      {status === "authenticated" ? (
        <button
          className='text-md bg-white text-slate-800 px-4 py-2 rounded-md font-medium'
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className='text-md bg-white text-slate-800 px-4 py-2 rounded-md font-medium'
          onClick={() => signIn("google")}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Navbar;
