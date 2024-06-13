import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  const [sideBarStatus, setSideBarStatus] = useState(false)
  return (
    <div className="w-[100%] flex justify-end bg-slate-200">
      <div className="">
        <Sidebar sideBarStatus={sideBarStatus}/>
      </div>
      <div className={sideBarStatus ? "nav2 nav min-h-[100vh]" : "nav min-h-[100vh]"}>
        <Navbar setSideBarStatus={setSideBarStatus} sideBarStatus={sideBarStatus}/>
        <div className={` bg-slate-200 w-full h-full mt-[90px]`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
        <div className={` p-[20px] bg-white flex justify-center relative`}>
          <p>© Copyright Autozoom.uz 2023-2024</p>
        </div>
      </div>
    </div>
  );
};

export default App;
