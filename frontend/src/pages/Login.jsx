import React, { useState } from 'react'
import logo from "../images/logo.png";
import image from "../images/authPageSide.png"
import {Link, useNavigate} from "react-router-dom"
import { api_base_url } from '../toggle';
const Login = () => {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const [error, setError] = useState("");

const navigate=useNavigate();

const submitForm = (e) => {
  e.preventDefault();

  fetch(api_base_url + "/login", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", data.userId);
        setTimeout(() => {
          window.location.href = "/"
        }, 200);
      } else {
        setError(data.message);
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    });
};

  return (
    <>
    <div className="container w-screen min-h-screen flex items-center justify-between pl-[70px]">
        <div className='left w-[30%]'>
          <img src={logo} alt="Logo" className='w-[250px]'/>
          <form onSubmit={submitForm} action="" className='w-full mt-[50px]'>


            <div className='inputBox'>
            <input required type="email" placeholder='Email'value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div className='inputBox'>
            <input required type="password" placeholder='Password'value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>

          <p>Dont't have an account
             <Link to="/signUp" className='text-[green]'> SignUp</Link>
          </p>

          <p className='text-red-500 text-[14px] my-2'>{error}</p>

          <button className='btn w-full mt-[20px] text-center' onClick={()=>{console.log(name)}}>Login</button>
          </form>
        </div>
        <div className='right w-[50%]'>
         <img className='w-[100%] h-[100vh] object-cover' src={image} alt="" />
        </div>
      </div>
    </>
  )
}

export default Login