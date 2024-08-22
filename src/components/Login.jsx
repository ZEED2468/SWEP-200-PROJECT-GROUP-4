import React from 'react'
import logo from "../assets/Group 7.svg";
import face from "../assets/Ellipse 3.svg";
import back from "../assets/Group 4.png"
import topLogo from "../assets/Group 6.svg";
import { FaRegEyeSlash } from "react-icons/fa6";

const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "cover",
  height: "70vh",
  backgroundRepeat: "no-repeat"
}

const Login = () => {
  return (
    <div className='flex flex-row gap-8 border rounded-3xl w-[1100px] h-[200px] m-auto 
    relative top-32 overflow-hidden
     bg-black' style={background}>
      <div className='flex flex-col justify-between bg-white p-3 border rounded-3xl rounded-r-none w-80'>
        <img src={logo} alt="logo" height="30px" width="100px" className='m-auto'/>
        <h3 className='text-black font-bold text-4xl relative bottom-40 m-auto'>FaceEdu</h3>
        <img src={face} alt="faceverify" height="100px" width="200px"  className='m-auto'/>
      </div>
      <div className='flex flex-col m-auto justify-evenly'>
      <img src={topLogo} alt="logo" height="30px" width="100px" className='m-auto relative bottom-48'/>
      <h3 className='text-white text-center font-bold text-4xl relative bottom-20'>SIGN IN</h3>
        <h3 className='text-white text-center font-bold text-4xl relative top-1'>TOKEN</h3>
        <form action="" method="post" className='flex flex-col gap-20 '>
          
          <div className='flex flex-col justify-center mt-10'>
            <input
              type="email"
              id="email"
              name="email"
              className='h-14 border rounded-lg p-3 font-semibold text-xl'
             style={{width:"500px"}}
            />
          </div>
          <button type="submit" className='bg-white text-black border rounded-2xl p-3 w-fit pl-16 pr-16
           m-auto font-bold text-lg hover:bg-[#3FF3FF]'>LOGIN</button>
          </form>
      </div>
    </div>
  )
}

export default Login;