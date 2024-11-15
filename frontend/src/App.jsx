import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editor';

const App = () => {
  let isLoggedIn=localStorage.getItem("isLoggedIn");
  return (
    <> 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedIn?<Home />:<Navigate to="/login" />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/editor/:projectId' element={isLoggedIn?<Editor />:<Navigate to="/login" />} />

        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App