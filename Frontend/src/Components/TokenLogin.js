import React from 'react'
import logo from "../img/Group 7.png";
import face from "../img/Ellipse 3.svg";
import back from "../img/assets/Group 4.png"
import topLogo from "../img/Group 6.png";
import { Link } from 'react-router-dom';

const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "contain",
  height: "70vh",
  // backgroundRepeat: "repeat"
}

const TokenLogin = () => {
  return (
    <div className='flex flex-row gap-8
    border rounded-3xl w-[1100px] 
    2xl:h-[200px] m-auto 
    relative top-32
    overflow-hidden sm:top-0 bg-black
    sm:flex sm:flex-col 
      sm:w-full
      sm:min-h-[725px] sm:border sm:rounded-none sm:fixed
     ' style={background}>
      <div className='flex flex-col justify-between
       bg-white p-3 border rounded-3xl rounded-r-none
        w-72 sm:flex sm:flex-row sm:w-full sm:rounded-none sm:h-20'>
        <img src={logo} alt="logo" height="30px" width="100px" className='m-auto sm:relative sm:bottom-2 sm:w-14'/>
        <h3 className='text-black font-bold text-4xl relative
         bottom-20 m-auto sm:relative sm:bottom-10 sm:top-7 sm:right-24 sm:text-lg'>
          FaceEdu</h3>
          <img src={face} alt="faceverify" height="100px" width="200px"    
        className='m-auto sm:relative sm:bottom-8 sm:left-10 sm:w-32 sm:h-28'/>
      </div>
      <div className='flex flex-col m-auto justify-evenly'>
      <img src={topLogo} alt="logo" height="30px" width="100px" 
      className='m-auto relative bottom-20 sm:relative sm:bottom-32'/>
      <h3 className='text-white text-center font-bold text-4xl relative bottom-12 sm:text-3xl'>SIGN IN</h3>
        <h3 className='text-white text-center font-bold text-4xl relative top-1 sm:text-3xl'>TOKEN</h3>
        <form action="" method="post" className='flex flex-col gap-20'>
          
          <div className='flex flex-col justify-center mt-10'>
            <input
              type="email"
              id="email"
              name="email"
              className='h-14 border rounded-lg p-3 
              font-semibold text-xl sm:w-66 w-[500px] text-center sm:w-72'
            />
          </div>
          <Link to='/verificationpage' className='bg-white
           text-black border rounded-2xl p-3 w-fit pl-16 pr-16
           m-auto font-bold text-lg hover:bg-[#3FF3FF]'>
          <button type="submit" >LOGIN</button>
           </Link>
          </form>
      </div>
    </div>
  )
}

export default TokenLogin;