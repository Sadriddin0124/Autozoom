import React, { useState } from "react";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { LuUser } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import Auth from "../Auth/Auth";

const Navbar = ({ setSideBarStatus, sideBarStatus }) => {
  const [logOut, setLogOut] = useState(false);
  return (
    <nav
      className={`${
        sideBarStatus ? "nav2" : "nav"
      } p-[20px] bg-white fixed shadow-md right-0 flex justify-between`}
    >
      <Auth/>
      <button
        className="px-[10px] py-[5px] bg-indigo-950 text-white text-[20px] rounded-md"
        onClick={() => setSideBarStatus((prev) => !prev)}
      >
        <HiOutlineBars3CenterLeft />
      </button>
      <div onClick={()=>setLogOut(!logOut)} className=" cursor-pointer flex items-center relative text-[20px] gap-[10px] px-[10px] py-[5px] rounded-md border">
        <LuUser />
        <span>Admin</span>
        <div
          className={`${
            logOut ? "flex" : "hidden"
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
