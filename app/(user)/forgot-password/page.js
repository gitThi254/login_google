"use client";
import React, { useState } from "react";
const PorgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
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
      } else {
        alert("link đặt lại mật khẩu đã được gửi tới email của bạn");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex gap-x-2'>
      <input
        type='email'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type='submit'>forgot password</button>
      {loading && (
        <div
          style={{ borderTopColor: "transparent" }}
          className='w-6 h-6 border-4 border-solid border-slate-600 rounded-full animate-spin'
        ></div>
      )}

      {error && <p>{error}</p>}
    </form>
  );
};

export default PorgotPasswordPage;
