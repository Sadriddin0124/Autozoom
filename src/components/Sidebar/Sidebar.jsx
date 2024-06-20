import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { IoPricetagsOutline } from 'react-icons/io5'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { GrMapLocation } from 'react-icons/gr'
import { LiaCitySolid } from 'react-icons/lia'
import { FaCar } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
const Sidebar = ({ sideBarStatus }) => {
  const links = [
    { name: 'Dashboard', path: '/', icon: <AiOutlineHome /> },
    { name: 'Brands', path: '/brands', icon: <IoPricetagsOutline /> },
    { name: 'Models', path: '/models', icon: <HiOutlineSquares2X2 /> },
    { name: 'Locations', path: '/locations', icon: <GrMapLocation /> },
    { name: 'Cities', path: '/cities', icon: <LiaCitySolid /> },
    { name: 'Cars', path: '/cars', icon: <FaCar /> },
  ]
  const location = useLocation()?.pathname
  return (
    <aside
      className={`${
        sideBarStatus ? 'min-w-[50px]' : ''
      } left-0 min-w-[300px] fixed h-[100vh] bg-indigo-950 p-[20px] flex flex-col gap-[20px] text-white`}
    >
      <h1 className={`${sideBarStatus ? 'hidden' : ''}  text-[24px]`}>
        Auto Zoom
      </h1>
      <img src={Logo} alt="Logo" className={sideBarStatus ? '' : 'hidden'} />
      <ul className="w-[100%] flex flex-col items-start gap-[5px]">
        {links?.map((item, index) => (
          <li
            key={index}
            className={`${
              location === item?.path ? 'bg-[#ffffff2c]' : ''
            } flex gap-[10px] items-center w-full cursor-pointer hover:bg-[#ffffff2c] p-[10px] rounded-md`}
          >
            <Link to={item?.path} className="text-[24px]">
              {item?.icon}
            </Link>
            <Link
              to={item?.path}
              className={`${
                sideBarStatus ? 'hidden' : ''
              } text-[18px] w-full h-full`}
            >
              {item?.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
