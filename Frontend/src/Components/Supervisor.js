<<<<<<< HEAD
import React, { useState } from "react";
import logo from "../img/Group 7.png";
import face from "../img/Ellipse 3.svg";
import back from "../img/Group 4.svg";
import topLogo from "../img/Group 6.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "contain",
  height: "70vh",
  backgroundRepeat: "no-repeat",
};

const Supervisor = () => {
=======
import React,{useState} from 'react'
import logo from "../assets/Group 7.svg";
import face from "../assets/Ellipse 3.svg";
import back from "../assets/Group 4.png"
import topLogo from "../assets/Group 6.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 

const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "cover",
  height: "70vh",
  backgroundRepeat: "no-repeat"
}

const Supervisor = () => {
  
>>>>>>> main
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
<<<<<<< HEAD
    <div
      className="flex flex-row gap-8
    border rounded-none m-auto 
    relative top-32 sm:top-1 h-[200px]
    sm:flex sm:flex-col w-[1000px] sm:w-full sm:overflow-hidden
     bg-black sm:min-h-[1933px]
     sm:border sm:rounded-none overflow-hidden
     "
      style={background}
    >
      <div
        className="flex flex-col justify-between sm:p-0
       bg-white p-3 border rounded-3xl rounded-r-none
        w-72 sm:flex sm:flex-row sm:w-full sm:rounded-none sm:h-30"
      >
        <img
          src={logo}
          alt="logo"
          height="30px"
          width="100px"
          className="m-auto sm:relative sm:bottom-2"
        />
        <h3
          className="text-black font-bold text-4xl relative
         bottom-20 m-auto sm:relative sm:bottom-10 sm:top-7 sm:right-64"
        >
          FaceEdu
        </h3>

        <img
          src={face}
          alt="faceverify"
          height="100px"
          width="200px"
          className="m-auto sm:relative sm:bottom-1 sm:left-16"
        />
      </div>
      <div
        className="flex flex-col m-auto
       "
      >
        <Link to={"/tokenlogin"}>
          <h3
            className="text-white pointer relative left-[420px] bottom-6 border
             border-[#3FF3FF] rounded-3xl text-center w-fit p-3 pl-7 pr-7
              sm:relative sm:bottom-[540px]  sm:bg-black "
          >
            SUPERVISOR
          </h3>
        </Link>
        <img
          src={topLogo}
          alt="logo"
          height="30px"
          width="100px"
          className="m-auto relative sm:relative sm:bottom-96
       bottom-14"
        />

        <h3
          className="text-white text-center font-bold text-4xl relative bottom-0 sm:relative sm:bottom-24 sm:text-6xl
         "
        >
          SIGN IN
        </h3>
        <form
          action=""
          method="post"
          className="flex flex-col gap-4 mt-7 sm:flex sm:flex-col sm:gap-32"
        >
          <div
            className="flex flex-col gap-2 relative 
          right-10 sm:relative sm:right-0 sm:flex sm:flex-col sm:gap-6"
          >
            <label
              htmlFor="email"
              className="text-white text-semibold text-xl 
            sm:text-4xl uppercase"
            >
              Email:{" "}
            </label>
=======
    <div className='flex flex-row gap-8
    border rounded-3xl w-[1100px] 
    2xl:h-[200px] m-auto 
    relative top-32 sm:top-1
    overflow-hidden 
    sm:flex sm:flex-col 
     bg-black sm:w-fit
      sm:min-h-[890px] sm:border sm:rounded-none
     b' style={background}>
      <div className='flex flex-col justify-between
       bg-white p-3 border rounded-3xl rounded-r-none
        w-72 sm:flex sm:flex-row sm:w-full sm:rounded-none sm:h-28'>
          <h4 className='text-white border rounded-md w-fit p-1 pl-9 pr-9 text-lg 
           relative bottom-0 left-96 ml-96 top-5
            sm:relative sm:bottom-0 sm:left-1
             sm:ml-0 sm:top-28 sm:text-white sm:pl-2 sm:pr-2
             sm:h-fit sm:border sm:bg-black'>SUPERVISOR</h4> 
        <img src={logo} alt="logo" height="30px" width="100px" className='m-auto sm:relative sm:bottom-2
         sm:right-28'/>
        <h3 className='text-black font-bold text-4xl relative
         bottom-20 m-auto sm:relative sm:bottom-10 sm:top-7 sm:right-56 sm:ml-4'>
          FaceEdu</h3>
          <img src={face} alt="faceverify" height="100px" width="200px"  
        className='m-auto sm:relative sm:bottom-14 sm:right-32'/>
      </div>
      <div className='flex flex-col m-auto justify-evenly'>
      <img src={topLogo} alt="logo" height="30px" width="100px" className='m-auto relative
       bottom-14 sm:relative sm:bottom-40'/>
        <h3 className='text-white text-center font-bold text-4xl relative bottom-0 
         sm:relative sm:bottom-10'>SIGN IN</h3>
        <form action="" method="post" className='flex flex-col gap-4 mt-7 '>
        <div className='flex flex-col gap-2 relative 
          right-10 sm:relative sm:right-0'>
            <label htmlFor="email" className='text-white text-semibold text-xl 
            sm:text-xl uppercase'>Email:</label>
>>>>>>> main
            <input
              type="email"
              id="email"
              name="email"
<<<<<<< HEAD
              className="h-12 border 
              rounded-lg text-xl font-semibold
              w-[500px] sm:p-5 sm:text-3xl sm:h-24
               p-3 sm:w-[600px]"
            />
          </div>
          <div
            className="flex flex-col gap-2 relative right-10
          sm:relative sm:right-0 sm:flex sm:flex-col sm:gap-6"
          >
            <label
              htmlFor="password"
              className="text-white text-semibold 
            text-xl sm:text-4xl uppercase"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="h-12 border rounded-lg
              w-[500px] sm:w-[600px] sm:h-24
               text-xl 
              font-semibold sm:p-5 sm:text-3xl"
            />
            <span
              className="relative left-[460px] cursor-pointer text-black bottom-11 sm:relative sm:bottom-20 sm:ml-[100px]"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEye size={30} />
              ) : (
                <AiOutlineEyeInvisible size={30} />
              )}
            </span>
          </div>
<<<<<<< HEAD
          <Link to= '/tokenlogin' className='bg-white text-black border rounded-2xl p-3
=======
          <Link
            to="/admin"
            className="bg-white text-black border rounded-2xl p-3
>>>>>>> e8adeeeb1d748a9a62b0bb6f8479671a9ee5e5ef
          sm:p-8 w-fit pl-16 pr-16 sm:pl-20 sm:pr-20
           m-auto font-bold sm:relative sm:right-0 text-2xl relative sm:text-4xl 
           right-7 hover:bg-[#3FF3FF]"
          >
            <button type="submit">LOGIN</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Supervisor;
=======
              className='h-12 border 
              rounded-lg text-xl font-semibold
              w-[500px]
               p-3 sm:h-12 sm:w-72'
            />
          </div>
          <div className='flex flex-col gap-2 relative right-10
          sm:relative sm:right-0'>
            <label htmlFor="password" className='text-white text-semibold 
            text-xl sm:text-xl uppercase'>Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              className='h-12 border rounded-lg
              w-[500px]
               text-xl 
              font-semibold p-3 sm:h-12 sm:w-72'
            />
                    <span
        className="relative left-[460px] cursor-pointer text-black bottom-11"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <AiOutlineEye size={30} /> 
        ) : (
          <AiOutlineEyeInvisible size={30} /> 
        )}
      </span>
          </div>
          <button type="submit" className='bg-white text-black border rounded-2xl p-3  w-fit pl-16 pr-16
           m-auto font-bold sm:relative sm:right-0 text-lg relative right-7 hover:bg-[#3FF3FF]'>LOGIN</button>
        </form>
      </div>
    </div>
  )
}

export default Supervisor


>>>>>>> main
