"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaRegCheckCircle } from "react-icons/fa";

const api_key = "377311947974679";
const cloud_name = "dshyra0lz";

const RegisterForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    avatar: "",
  });
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    if (!user.username || !user.password || !file) {
      setError("Vui lòng nhập đầy dủ thông tin");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!res.ok) {
        throw new Error("fail to create user");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (file) {
      setLoading(true);
      const fetch_data = async () => {
        const signatureRes = await axios("/api/get-signature");
        const data = new FormData();
        data.append("file", file);
        data.append("api_key", api_key);
        data.append("signature", signatureRes?.data?.signature);
        data.append("timestamp", signatureRes?.data?.timestamp);
        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
          data,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
            onUploadProgress: function (e) {
              console.log(e.loaded / e.total);
            },
          }
        );
        const avatarStr = `https://res.cloudinary.com/${cloud_name}/image/upload/w_200,h_200,c_fill,q_100/${cloudinaryRes?.data?.public_id}.jpg`;
        setUser({ ...user, avatar: avatarStr });
        setLoading(false);
      };
      fetch_data();
    }
  }, [file]);

  return (
    <form
      className='flex flex-col bg-violet-400 w-96 gap-5 py-5 px-3 rounded-md shadow-lg overflow-hidden'
      onSubmit={handleSubmit}
    >
      <h1 className='text-center text-xl font-semibold text-white'>
        Register Form
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
        type='text'
        id='email'
        name='email'
        placeholder='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type='password'
        id='password'
        name='password'
        placeholder='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <input
        type='file'
        id='file'
        onChange={(e) => setFile(e.target.files[0])}
      />
      <div className='self-center'>
        {file &&
          (loading ? (
            <div
              style={{ borderTopColor: "transparent" }}
              class='w-7 h-7 border-4 border-white border-solid rounded-full animate-spin'
            ></div>
          ) : (
            <FaRegCheckCircle size={32} className='text-white' />
          ))}
      </div>

      <button
        type='submit'
        className='py-2 bg-white w-1/3 self-center rounded-md shadow-md'
      >
        Register
      </button>
      <div className='flex justify-between  text-sm'>
        <Link href='/forgot-password'>
          <span className='text-white text-center hover:text-slate-100 underline'>
            forgotpassword
          </span>
        </Link>
        <Link href='/'>
          Already have an account ?{" "}
          <span className='text-white text-center hover:underline hover:text-slate-100'>
            Sign in
          </span>
        </Link>
      </div>
      {error && (
        <p className='p-2 text-white font-medium rounded-lg  bg-red-500 self-start'>
          {error}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
