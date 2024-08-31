import React, {useState} from 'react'
import logo from "../img/Group 7.png";
import face from "../img/Ellipse 3.svg";
import back from "../img/assets/Group 4.png"
import topLogo from "../img/Group 6.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 
import { Link } from 'react-router-dom';


const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "cover",
  height: "70vh",
  backgroundRepeat: "no-repeat"
}

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex flex-row gap-8
    border rounded-3xl w-[1100px] 
    2xl:h-[200px] m-auto 
    relative top-32
    overflow-hidden sm:top-0
    sm:flex sm:flex-col 
     bg-black sm:w-full
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
      <img src={topLogo} alt="logo" height="30px" width="100px" className='m-auto relative
       bottom-14 sm:relative sm:bottom-24'/>
        <h3 className='text-white text-center font-bold text-4xl relative bottom-0 
         sm:relative sm:bottom-10'>SIGN IN</h3> 
        <form action="" method="post" className='flex flex-col gap-4 mt-7 '>
        <div className='flex flex-col gap-2 relative 
          right-10 sm:relative sm:right-0'>
            <label htmlFor="email" className='text-white text-semibold text-xl 
            sm:text-lg uppercase'>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className='h-12 border 
              rounded-lg text-xl font-semibold
              w-[500px]
               p-3 sm:h-12 sm:w-72'
            />
          </div>
          <div className='flex flex-col gap-2 relative right-10
          sm:relative sm:right-0'>
            <label htmlFor="password" className='text-white text-semibold 
            text-xl sm:text-lg uppercase'>Password:</label>
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
        className="relative left-[460px] cursor-pointer text-black bottom-11 sm:left-64 sm:relative"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <AiOutlineEye size={30} /> 
        ) : (
          <AiOutlineEyeInvisible size={30} /> 
        )}
      </span>
          </div>
          <Link to= '/admin' className='bg-white text-black border rounded-2xl p-3  w-fit pl-16 pr-16
           m-auto font-bold sm:relative sm:right-0 text-lg relative right-7 hover:bg-[#3FF3FF]'><button type="submit" 
          >LOGIN</button>
           </Link>
        </form>
      </div>
    </div>
  )
}

export default Login