import React, { useState } from 'react';
import logo from "../images/logo.png";
import image from "../images/authPageSide.png"
import {Link, useNavigate} from "react-router-dom"
import { api_base_url } from '../toggle';

const SignUp = () => {
const [userName,setUsername]=useState("");
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const [error, setError] = useState("");

const navigate = useNavigate();


const submitForm=(e)=>{
e.preventDefault();

  fetch(api_base_url + "/signUp",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userName,
        name: name,
        email: email,
        password: password
      })
    }).then((res)=>res.json()).then((data)=>{
      if(data.success === true){
        navigate("/login"); 
      }
      else{
        setError(data.message);
      }
    })
}

  return (
    <>
      <div className="container w-screen min-h-screen flex items-center justify-between pl-[70px]">
        <div className='left w-[30%]'>
          <img src={logo} alt="Logo" className='w-[250px]'/>
          <form onSubmit={submitForm} action="" className='w-full mt-[50px]'>

            <div className='inputBox'>
            <input required type="text" placeholder='UserName'value={userName} onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>

            <div className='inputBox'>
            <input required type="text" placeholder='Name'value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>

            <div className='inputBox'>
            <input required type="email" placeholder='Email'value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div className='inputBox'>
            <input required type="password" placeholder='Password'value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>

          <p>Already have an account
             <Link to="/login" className='text-[green]'> login</Link>
          </p>

           <p className='text-red-500 text-[14px] my-2'>{error}</p>

          <button className='btn w-full mt-[20px] text-center' onClick={()=>{console.log(name)}}>SignUp</button>
          </form>
        </div>
        <div className='right w-[50%]'>
         <img className='w-[100%] h-[100vh] object-cover' src={image} alt="" />
        </div>
      </div>
    </>
  );
}

export default SignUp;
