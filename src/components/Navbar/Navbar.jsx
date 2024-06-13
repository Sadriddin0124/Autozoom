import React, { useEffect, useState } from "react";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { LuUser } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import Auth from "../Auth/Auth";

const Navbar = ({ setSideBarStatus, sideBarStatus }) => {
  const [logOutStatus, setLogOutStatus] = useState(false);
  const [authStatus, setAuthStatus] = useState(false)
  useEffect(()=> {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      setAuthStatus(true)
    }else {
      setAuthStatus(false)
    }
  }, [])
  const logOut = () => {
    localStorage.removeItem("accessToken")
    setAuthStatus(false)
  }
  return (
    <nav
      className={`${
        sideBarStatus ? "nav2" : "nav"
      } p-[20px] bg-white fixed shadow-md right-0 flex justify-between`}
    >
      {authStatus ? "" : <Auth setAuthStatus={setAuthStatus}/>}
      <button
        className="px-[10px] py-[5px] bg-indigo-950 text-white text-[20px] rounded-md"
        onClick={() => setSideBarStatus((prev) => !prev)}
      >
        <HiOutlineBars3CenterLeft />
      </button>
      <div onClick={()=>setLogOutStatus(!logOutStatus)} className=" cursor-pointer flex items-center relative text-[20px] gap-[10px] px-[10px] py-[5px] rounded-md border">
        <LuUser />
        <span>Admin</span>
        <div
        onClick={logOut}
          className={`${
            logOutStatus ? "flex" : "hidden"
          } absolute cursor-pointer items-center gap-[10px] bg-white top-[50px] right-0 border p-[5px] rounded-md w-[100%]`}
        >
          <p className="text-[15px]">Log Out</p>
          <IoIosLogOut size={16} className="text-red-500" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
