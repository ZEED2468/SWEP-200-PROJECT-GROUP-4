import React from 'react'
import logo from "../assets/Group 7.svg";
import {Link as ScrollLink} from "react-scroll"
import { NavLinks } from '.';

const Home = () => {
  return (
    <div>
      <header className='flex flex-col'>
     <div className='flex flex-row p-10 gap-10'>
     <img src={logo} alt="header-logo" height="30px" width="100px"/>
     <ul className='flex flex-row'>
                  {NavLinks.map((lists) => (
                 <li key={lists} className='text-black text-center hover:text-blue-700 text-xl font-semibold'>
                  <ScrollLink to={lists.destination} className='cursor-pointer mr-7' smooth={true} duration={500}>
                    {lists.text}</ScrollLink>
                 </li> )
                  )}
            </ul>
     </div>
      </header>
    </div>
  )
}

export default Home