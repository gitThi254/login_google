"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className='grid place-items-center h-screen -mt-24'>
      <div className='shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6'>
        <div>
          Name: <span className='font-bold'>{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className='font-bold'>{session?.user?.email}</span>
        </div>
        <Image
          src={session?.user?.image}
          width={200}
          height={200}
          alt='image'
        />
        <button
          onClick={() => signOut()}
          className='bg-red-500 text-white font-bold px-6 py-2 mt-3'
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
