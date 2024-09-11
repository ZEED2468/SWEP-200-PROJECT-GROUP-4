import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import logo from "../img/Group 6.png";
import spiral from "../img/bgi.png";
import hlogo from "../img/Group 7.png";
import { NavLinks } from '.';

const Result = () => {
  const location = useLocation();
  const state = location.state || {};
  const student = state.student || {};

  console.log("Result page state:", state); // Debugging line

  if (!student || !student.matricNo) {
    return <Navigate to="/notfound" />;
  }
  

  const currentPart = student.currentPart || 'N/A';
  const semester = student.semester || 'N/A';
  const image1 = student.image1 || '/default-profile.png'; // Ensure the default image path is correct

  const background = {
    backgroundImage: `url(${spiral})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  return (
    <div className="flex h-screen">
      <div className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8" style={background}>
        <img src={logo} alt="Logo" className="h-12 mb-8" />
        <h1 className="text-2xl font-bold">Face Edu</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-3 bg-white shadow border-b-2 border-cyan-400">
          <div className="flex">
            <img src={hlogo} alt="Header Logo" className="h-6 mt-1" />
            <h1 className="text-2xl font-bold ml-3">Face Edu</h1>
          </div>
          <ul className="flex flex-row ml-[100px] gap-36">
            {NavLinks.map((lists) => (
              <li key={lists.destination} className='text-black text-center hover:text-cyan-400 text-lg font-semibold mt-2'>
                <Link to={lists.destination} className='cursor-pointer mr-7'>
                  {lists.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex w-2/3 mt-20">
          <div className="space-y-2">
            <p className="font-semibold">Registration No:</p>
            <p className="font-semibold">Name:</p>
            <p className="font-semibold">Faculty:</p>
            <p className="font-semibold">Department:</p>
            <p className="font-semibold">Semester/Session:</p>
            <p className="font-semibold">Current Part:</p>
          </div>
          <div className="space-y-2 ml-20">
            <p className="font-semibold">{student.matricNo || 'N/A'}</p>
            <p className="font-semibold">{student.name || 'N/A'}</p>
            <p>{student.faculty || 'N/A'}</p>
            <p>{student.department || 'N/A'}</p>
            <p>{semester}</p>
            <p>{currentPart}</p>
          </div>

          <div className="flex flex-col items-center pl-20">
            <img
              src={image1}
              alt="Profile"
              className="w-24 h-24 border-2 border-cyan-400 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="w-2/3 pt-10">
          <h2 className="text-1xl text-center font-bold mb-4 mr-40">
            LIST OF REGISTERED COURSES
          </h2>
          <div className="grid grid-cols-4 gap-4">
            {student.courses?.length ? (
              student.courses.map((course, index) => (
                <p key={index}>{course}</p>
              ))
            ) : (
              <p>No courses available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;