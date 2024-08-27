import React,{useState} from 'react'
import logo from "../assets/Group 7.svg";
import face from "../assets/Ellipse 3.svg";
import back from "../assets/Group 4.png";
import topLogo from "../assets/Group 6.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; 
import { Link } from 'react-router-dom';

const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "cover",
  height: "70vh",
  backgroundRepeat: "no-repeat"
}

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex flex-row gap-8
    border rounded-3xl w-[1000px] 
    h-[200px] m-auto 
    relative top-32 sm:top-1
    overflow-hidden 
    sm:flex sm:flex-col 
     bg-black sm:w-fit
      sm:min-h-[890px] sm:border sm:rounded-none'
     style={background}>
      <div className='flex flex-col justify-between
       bg-white p-3 border rounded-3xl rounded-r-none
        w-72 sm:flex sm:flex-row sm:w-full sm:rounded-none sm:h-28'>
        <img src={logo} alt="logo" height="30px" width="100px" 
        className='m-auto sm:relative sm:bottom-4'/>
        <h3 className='text-black font-bold text-4xl relative
         bottom-20 m-auto sm:relative sm:bottom-0 sm:top-6 sm:right-24'>
          FaceEdu</h3>
        <img src={face} alt="faceverify" height="100px" width="200px"  
        className='m-auto sm:relative sm:bottom-14 sm:left-2'/>
      </div>
      <div className='flex flex-col m-auto sm:w-[300px] 
      '>
      <img src={topLogo} alt="logo" height="30px" width="100px" 
      className='m-auto 
      sm:bottom-20 sm:relative'/>
        <h3 className='text-white text-center font-bold text-4xl relative top-6'>SIGN UP</h3>
        <form action="" method="post" className='flex flex-col 
        gap-2 relative top-14 sm:m-auto'>
          <div className='flex flex-col gap-2 relative
           right-10 sm:relative sm:right-0'>
            <label htmlFor="name" className='text-white text-semibold 
            text-xl sm:text-xl uppercase'>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className='h-12 border rounded-lg sm:h-12
              text-xl font-semibold w-[500px] sm:w-72'
            />
          </div>
          <div className='flex flex-col gap-2 relative 
          right-10 sm:relative sm:right-0'>
            <label htmlFor="email" className='text-white text-semibold text-xl 
            sm:text-xl uppercase'>Email:</label>
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
         <Link to='/login' target='-blank' className='bg-white text-black border rounded-2xl p-3 w-fit pl-16 pr-16
           m-auto font-bold text-lg hover:bg-[#3FF3FF] relative bottom-5'> <button type="submit" >SIGN UP</button>
         </Link>
        </form>
        <p className='text-white text-center mt-10 text-xl
        sm:relative sm:right-0 relative right-5'>Already have an account? <Link to='/login' target='_blank'
        className='text-[#3FF3FF] text-xl'>
        Sign in</Link></p>
      </div>
    </div>
  )
}

export default Register