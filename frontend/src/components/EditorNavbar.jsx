import React from 'react'
import logo from "../images/logo.png"
import { CgSoftwareDownload } from "react-icons/cg"

const EditorNavbar = () => {
  return (
    <>
    <div className="EditorNavbar flex item-center justify-between px-[70px] h-[90px] ">
      <div className='logo'>
      <img src={logo} alt="" className='w-[120px] h-[100px] cursor-pointer' />
      </div>
    
    <p className='mt-[10px] mr-[400px] text-[20px] text-[#ccf2ff]'>ENJOY YOUR CODING JOURNEY</p>

    
      
    </div>
    </>
  )
}

export default EditorNavbar