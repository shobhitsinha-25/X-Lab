import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import {Link} from "react-router-dom"
import Avatar from "react-avatar"
import { MdLightMode } from "react-icons/md"
import { CiGrid42 } from "react-icons/ci"
import { api_base_url, toggleElement } from '../toggle'

const Navbar = ({ toggleView, isGridCard }) => { 
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user);
      }
      else {
        setError(data.message);
      }
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  }

  return (
    <>
    <div className="navbar flex item-center justify-between px-[70px] h-[90px] ">
      <div className='logo'>
      <img src={logo} alt="" className='w-[140px] h-[120px] cursor-pointer' />
      </div>

      <div className="links flex items-center gap-2">
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Contacts</Link>
        <Link>Services</Link>
        <button onClick={logout} className='btnBlue !bg-red-500 min-w-[120px] h-[30px] rounded-lg  ml-2 hover:!bg-red-600'>Logout</button>
        <Avatar onClick={()=>{toggleElement(".dropdownNavbar","hidden")}} name={data ? data.name : ""} size="40" round="50%" className='ml-2 cursor-pointer' />
      </div>

      <div className='dropdownNavbar hidden absolute p-[10px] right-[20px] shadow-lg shadow-black rounded-lg top-[80px] bg-[#262626] w-[150px] h-[80px] '>
        <div className='border-b-[1px] border-b-[white] '>
          <h3 className='text-[16px]'>{data ? data.name : ""}</h3>
        </div>
        <i 
          onClick={() => toggleView()}  // Toggle the view when clicked
          className='flex gap-1 mt-2 cursor-pointer'
        >
          <CiGrid42 className='w-[20px] h-[20px] mt-1' />
          {isGridCard ? "List view" : "Grid view"}  
        </i>
      </div>
    </div>
    </>
  )
}

export default Navbar
