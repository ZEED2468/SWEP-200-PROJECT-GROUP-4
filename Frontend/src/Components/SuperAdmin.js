import React from 'react'
import logo from "../assets/Group 7.svg";
import back from "../assets/Group 4.png"
import topLogo from "../assets/Group 6.svg";
import image from "../assets/Ellipse 4.png"
import { NavLinks } from '.';
import { IoMdCopy } from "react-icons/io";
import { Link } from 'react-router-dom';

const background = {
  backgroundImage: `url(${back})`,
  backgroundSize: "cover",
  height: "80vh",
  backgroundRepeat: "no-repeat"
}

// const font ={
//     fontfamily: "Arbutus Slab" ,
//     fontWight: "400px",
//     fontSyle: normal
// }

const SuperAdmin = () => {
  return (
    <div className=' flex flex-col justify-center p-5 h-[770px] relative top-1'>
      <header className='flex flex-row m-auto'>
     <div className='flex flex-row p-4 bg-white w-[1200px] border border-b-[#3FF3FF] rounded-t-xl '>
     <img src={logo} alt="header-logo" height="20px" width="50px"/>
     <h4 className='text-xl font-bold ml-3 mt-2'>FaceEdu</h4>
     <img src={image} alt="ellipse" className='relative left-[870px]'/>
     <Link to='/login' target='_blank' className='relative left-[880px] border-[#3FF3FF] border-2 p-1 rounded-2xl
      pl-4 pr-4 hover:bg-[#3FF3FF]'><button type="button" 
      className='font-bold pt-1'>Log out</button></Link>
     <ul className='flex flex-row ml-32 gap-16'>
                  {NavLinks.map((lists) => (
                 <li key={lists} className='text-black text-center hover:text-blue-700 text-lg
                  font-semibold mt-2'>
                  <Link to={lists.destination} className='cursor-pointer mr-7'>
                    {lists.text}</Link>
                 </li> )
                  )}
            </ul>
     </div>
     
      </header>
      <section className='flex flex-row m-auto bg-black w-[1200px] h-[800px]' 
      >
     <div className='flex flex-col w-[400px] justify-between
        p-3 rounded-r-none
        sm:flex sm:flex-row sm:w-full
         sm:rounded-none sm:h-28 ' style={background}>
        <img src={topLogo} alt="logo" height="30px" width="100px" 
        className='m-auto sm:relative sm:bottom-2 relative top-28'/>
        <h3 className='text-white font-bold text-5xl relative
         bottom-32 m-auto sm:relative sm:bottom-10 sm:top-7 sm:right-24'>
          FaceEdu</h3>
          <p className='text-white text-center relative top-20'>@SWEP200  GROUP 4</p>
     </div>
     <div className='bg-white flex flex-col w-[1200px] gap-3'>
     <h2 className="text-center font-bold text-2xl mt-7 tracking-wider" id='arbutus-slab-regular'>Revolutionizing Exam Access with Facial <br/>
     Recognition Technology</h2>
     <p className="text-center text-md">

     In the fast-paced world of education, ensuring a smooth and secure examination<br/>
      process is critical. One of the recurring challenges for both students and educational<br/>
       institutions is managing identification during exams. Forgotten or misplaced student IDs can<br/>
        lead to delays, confusion, and unnecessary stress. Our facial recognition software is<br/>
         designed to solve this problem by providing a seamless, reliable solution that verifies<br/>
          student identity on the spot.
      </p>
      <h2 className="text-center font-bold text-xl tracking-wide">
      The Problem: Forgotten IDs and Exam Access
      </h2>
      <p className="text-center text-md">
      Students often forget or misplace their identification cards on exam day, leading to<br/>
       potential delays and complications. Traditionally, students without proper identification might<br/>
        be barred from taking exams, leading to significant stress and academic consequences.<br/>
         Lecturers and exam invigilators are also faced with the challenge of verifying a student’s<br/>.
          identity manually, which is time-consuming and prone to errors.
      </p>
      <h2 className="text-center text-xl font-bold tracking-wide">
      Our Solution: Cutting-Edge Facial Recognition Software
        </h2>
        <p className="text-center">
        Our facial recognition software is a game-changer for both schools and students. By<br/>
         leveraging advanced facial recognition technology, the software allows lecturers to scan a<br/>
          student’s face and instantly verify their identity and course registration status. This ensures<br/>
           that only students who are truly registered for the course are granted access to the exam,<br/>
            regardless of whether they have their ID card on hand.
        </p>
        <div className='flex flex-row m-auto gap-3 p-7'>
    <p className='text-xl font-semibold'>Token</p>
    <input type="text" name="" id="" className='border-2 border-black text-center'/>
    <IoMdCopy className='relative right-2 text-3xl cursor-pointer hover:fill-black'/>
     </div>
     </div>
    
      </section>
    </div>
  )
}
export default SuperAdmin