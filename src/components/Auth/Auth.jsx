import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
export const base_url = "https://autoapi.dezinfeksiyatashkent.uz/api";

const Auth = ({setAuthStatus}) => {
  const [type, setType] = useState(false);
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${base_url}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({phone_number: number, password: password}),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(
            "accessToken",
            data?.data?.tokens?.accessToken?.token
          );
          if (data?.success === true) {
            toast.success(data?.message)
            setAuthStatus(true)
          } 
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-white z-[20] flex justify-center items-center">
      <div className="w-[400px] px-[30px] py-[50px] border rounded-2xl flex flex-col gap-[20px] shadow-lg">
        <h1 className="text-[30px] font-bold text-black">Login</h1>
        <form onSubmit={handleSubmit} className="w-[100%] flex flex-col gap-[40px]">
          <div>
            <input
              type="text"
              placeholder="Number"
              onChange={(e)=>setNumber(e?.target?.value)}
              className="w-[100%] px-[20px] py-[12px] border bg-white outline-none rounded-md focus:border-indigo-700"
              />
          </div>
          <div className="relative w-[100%]">
            <span
              className="text-[25px] absolute right-[13px] top-[13px] cursor-pointer text-indigo-800"
              onClick={() => setType(!type)}
              >
              {type ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
            <input
              type={type ? "text" : "password"}
              placeholder="Password"
              onChange={(e)=>setPassword(e?.target?.value)}
              className="w-[100%] px-[20px] py-[12px] border bg-white outline-none rounded-md focus:border-indigo-700"
            />
          </div>
          <button className="py-[10px] px-[20px] w-[100%] bg-indigo-900 text-white text-[20px] rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
