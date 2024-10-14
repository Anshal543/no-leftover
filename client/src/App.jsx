import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/Sign-up'
import MainPage from './pages/Main-page'
import { UserProvider, useUser } from './context/User-context'
import axios from 'axios'
import Navbar from './pages/Navbar'
import MyRequest from './pages/My-request'
import ManageRequest from './pages/Manage-request'
import PostFood from './pages/Post-Food'
axios.defaults.withCredentials = true

const App = () => {

  return (
    <>
    <UserProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post-food" element={<PostFood />} />
        <Route path="/requests" element={<ManageRequest/>} />
        <Route path="/my-requests" element={<MyRequest />} />

      </Routes>
      </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App