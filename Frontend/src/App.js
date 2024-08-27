
 import React from 'react';
 import { BrowserRouter, Routes, Route } from 'react-router-dom'
 import Home from './components/Home.js';
 import Register from './components/Register.js';
 import SuperAdmin from './components/SuperAdmin.js';
 import Supervisor from './components/Supervisor.js';
 import Login from './components/Login.js'
 import TokenLogin from './components/TokenLogin.js';
 import VerificationPage from './components/Verification.js';

function App() {
  return (
    <div>
     <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Home/>} />
      <Route path ='/register' element={<Register/>} />
      <Route path='/superadmin' element={<SuperAdmin/>} />
      <Route path='/supervisor' element={<Supervisor/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/tokenlogin' element={<TokenLogin/>} />
      <Route path='/verificationpage' element={<VerificationPage/>} />
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
