"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const ResetPasswordForm = ({ token }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch("/api/reset-password", { token, password })
      .then((res) => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        id='resetPassword'
        name='resetPassword'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>ResetPassword</button>
    </form>
  );
};

export default ResetPasswordForm;
