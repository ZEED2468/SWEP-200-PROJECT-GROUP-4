import React from 'react'
import logo from "../assets/Group 7.svg";
import face from "../assets/Ellipse 3.svg";
import back from "../assets/Group 4.png";
import topLogo from "../assets/Group 6.svg";
import { FaRegEyeSlash } from "react-icons/fa6";

const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "cover",
  height: "70vh",
  backgroundRepeat: "no-repeat"
}

const Register = () => {
  return (
    <div className='flex flex-row gap-8 border rounded-3xl w-[1100px] h-[200px] m-auto 
    relative top-32 overflow-hidden
     bg-black' style={background}>
      <div className='flex flex-col justify-between bg-white p-3 border rounded-3xl rounded-r-none w-80'>
        <img src={logo} alt="logo" height="30px" width="100px" className='m-auto'/>
        <h3 className='text-black font-bold text-4xl relative bottom-40 m-auto'>FaceEdu</h3>
        <img src={face} alt="faceverify" height="100px" width="200px"  className='m-auto'/>
      </div>
      <div className='flex flex-col m-auto justify-between'>
      <img src={topLogo} alt="logo" height="30px" width="100px" className='m-auto relative bottom-10'/>
        <h3 className='text-white text-center font-bold text-4xl relative'>SIGN UP</h3>
        <form action="" method="post" className='flex flex-col gap-10 relative top-10'>
          <div className='flex flex-col gap-4 relative right-10'>
            <label htmlFor="name" className='text-white text-semibold text-2xl uppercase'>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className='h-14 border rounded-lg text-xl font-semibold p-3'
              style={{width:"500px"}}
            />
          </div>
          <div className='flex flex-col gap-4 relative right-10'>
            <label htmlFor="email" className='text-white text-semibold text-2xl uppercase'>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className='h-14 border rounded-lg text-xl font-semibold p-3'
             style={{width:"500px"}}
            />
          </div>
          <div className='flex flex-col gap-4 relative right-10'>
            <label htmlFor="password" className='text-white text-semibold text-2xl uppercase'>Password:</label>
           
            <input
              type="password"
              id="password"
              name="password"
              className='h-14 border rounded-lg text-xl font-semibold p-3'
              style={{width:"500px"}}
            />
 <FaRegEyeSlash className='text-black relative text-3xl left-96 ml-20 bottom-16'/>
          </div>
          <button type="submit" className='bg-white text-black border rounded-2xl p-3 w-fit pl-16 pr-16
           m-auto font-bold text-lg hover:bg-[#3FF3FF] relative bottom-5'>SIGN UP</button>
  
        </form>
        <p className='text-white text-center mt-10 text-xl relative right-5'>Already have an account? <a href='https://' 
        className='text-[#3FF3FF] text-xl'>
        Sign in</a></p>
      </div>
    </div>
  )
}

export default Register