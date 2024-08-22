import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register';
import SuperAdmin from './components/SuperAdmin';
import Supervisor from './components/Supervisor';
import Login from './components/Login'


function App() {
  return (
    <>
    <div className=' min-h-[100vh] bg-gray-600'>
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Home/>} />
      <Route path ='/register' element={<Register/>} />
      <Route path='/superadmin' element={<SuperAdmin/>} />
      <Route path='/supervisor' element={<Supervisor/>} />
      <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
