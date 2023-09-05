"use client";
import React, { useState } from "react";
const PorgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Bạn chưa nhập email");
      return;
    }
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(email),
      });
      if (!res.ok) {
        throw new Error("Fail to reset Password");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type='submit'>forgot password</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default PorgotPasswordPage;
