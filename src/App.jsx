import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Loader from "./components/Loader/Loader";
import { Cities } from "./components/Cities/Cities";
import { Models } from "./components/Models/Models";
import { ToastContainer } from "react-toastify";

import Locations from "./components/Locations/Locations";


const App = () => {
  const [sideBarStatus, setSideBarStatus] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    setTimeout(() => {
      setLoading(true)
    }, 1500);
  },[])
  return (
    <div className="w-[100%] flex justify-end bg-slate-200">
      <ToastContainer />
      {loading ? "" : <Loader />}
      <div>
        <Sidebar sideBarStatus={sideBarStatus} />
      </div>
      <div
        className={
          sideBarStatus ? "nav2 nav min-h-[100vh]" : "nav min-h-[100vh]"
        }
      >
        <Navbar
          setSideBarStatus={setSideBarStatus}
          sideBarStatus={sideBarStatus}
        />
        <div className={`p-[20px] bg-slate-200 w-full h-full mt-[90px]`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/models" element={<Models />} />
            <Route path="/locations" element={<Locations />} />
          </Routes>
        </div>
        <footer className={`p-[20px] bg-white flex justify-center relative`}>
          <p>© Copyright Autozoom.uz 2023-2024</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
