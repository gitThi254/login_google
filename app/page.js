import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "./api/(user_api)/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div className='h-screen -mt-24  grid place-content-center gap-5'>
      <LoginForm />
    </div>
  );
}
