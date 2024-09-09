import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { useNavigate, Link } from "react-router-dom";
import logo from "../img/Group 6.png";
import hlogo from "../img/Group 7.png";
import spiral from "../img/bgi.png";
import { NavLinks } from '.';


const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

function VerificationPage() {

  const background = {
    backgroundImage: `url(${spiral})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  }

  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setCameraEnabled(false); 
  }, [webcamRef]);

  const handleSubmit = () => {
    if (capturedImage) {
      console.log('Image submitted:', capturedImage);

      const isPhotoMatch = true; 

      if (isPhotoMatch) {
        navigate('/confirmedpage'); 
      } else {
        navigate('/failedpage');
      }
    } else {
      alert('Please take a photo before submitting.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8"
       style={background}>
        <img src={logo} alt="Logo" className="h-12 mb-8" />
        <h1 className="text-2xl font-bold">Face Edu</h1>
      </div>

      <div 
        className="flex-1 flex flex-col items-center justify-center">
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
              {cameraEnabled ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="w-full h-full object-cover"
                    style={{ clipPath: 'ellipse(100% 100% at 50% 50%)' }}
                  />
                ) : (
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-full object-cover"
                    style={{ clipPath: 'ellipse(100% 100% at 50% 50%)' }}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-center mt-3 space-x-10">
              <button
                onClick={capture}
                className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors"
              >
                Take a Photo
              </button>
              {/* <Link to='/confirmedpage'> */}
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors">
                  Submit
                </button>
              {/* </Link> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default VerificationPage;