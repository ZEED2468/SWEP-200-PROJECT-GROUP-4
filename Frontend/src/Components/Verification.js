import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import logo from "../img/Group 6.png";
import hlogo from "../img/Group 7.png";
import { NavLinks } from '.';
import { Link } from 'react-router-dom';

function VerificationPage() {
  const webcamRef = useRef(null);

  // Function to handle photo capture
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc); // Replace with facial recognition handling
  }, [webcamRef]);


  return (
    <div className="flex h-screen">
      <div className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8">
        <img src={logo} alt="Logo" className="h-12 mb-8" />
        <h1 className="text-2xl font-bold">Face Edu</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-white">
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-3 bg-white shadow border-b-2 border-cyan-400">
          <Link to='/admin'>
            <div className="flex">
              <img src={hlogo} alt="Logo" className="h-6 mt-1" />
              <h1 className="text-2xl font-bold ml-3">Face Edu</h1>
            </div>
          </Link>

          <ul className='flex flex-row ml-[100px] gap-36'>
            {NavLinks.map((lists) => (
              <li key={lists} className='text-black text-center hover:text-cyan-400 text-lg font-semibold mt-2'>
                <Link to={lists.destination} className='cursor-pointer mr-7'>
                  {lists.text}
                </Link>
              </li>
            ))}
          </ul>


          <div className="flex flex-row items-center">
            <img
              src="placeholder" // image placeholder
              alt="Profile"
              className="mr-2 w-8 h-8 border-2 border-cyan-400 rounded-full object-cover"
            />

            <Link to='/login'>
              <button className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors">
                Log out
              </button>
            </Link>
          </div>
        </nav>

        <section className="flex-1 flex flex-col items-center justify-center">
          <div>
            <div className="flex items-center justify-center">
              <div className="mt-10 mb-10 w-56 h-72 border-4 border-cyan-400 rounded-[50%/40%] overflow-hidden flex items-center justify-center">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex justify-center mt-3 space-x-10">
              <button
                onClick={capture}
                className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors"
              >
                Take a Photo
              </button>
              <Link to='/confirmedpage'>
                <button className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors">
                  Submit
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default VerificationPage;
