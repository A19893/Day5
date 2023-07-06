import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Profile from './Profile'
import Home from './Home'
const Root = () => {
  return (
    <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/home" element={<Home/>} />
    </Routes>
  )
}

export default Root