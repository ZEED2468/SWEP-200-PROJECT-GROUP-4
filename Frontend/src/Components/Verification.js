


// import React, { useRef, useState, useCallback } from "react";
// import Webcam from "react-webcam";
// import { useNavigate, Link } from "react-router-dom";
// import logo from "../img/Group 6.png";
// import hlogo from "../img/Group 7.png";
// import spiral from "../img/bgi.png";
// import { NavLinks } from '.';


// const videoConstraints = {
//   width: 1280,
//   height: 720,
//   facingMode: 'user',
// };

// function VerificationPage() {

//   const background = {
//     backgroundImage: `url(${spiral})`,
//     backgroundSize: "cover",
//     backgroundRepeat: "no-repeat"
//   }

//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [cameraEnabled, setCameraEnabled] = useState(true);
//   const navigate = useNavigate();

//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);
//     setCameraEnabled(false); 
//   }, [webcamRef]);

//   const handleSubmit = () => {
//     if (capturedImage) {
//       console.log('Image submitted:', capturedImage);

//       const isPhotoMatch = true; 

//       if (isPhotoMatch) {
//         navigate('/confirmedpage'); 
//       } else {
//         navigate('/failedpage');
//       }
//     } else {
//       alert('Please take a photo before submitting.');
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8"
//        style={background}>
//         <img src={logo} alt="Logo" className="h-12 mb-8" />
//         <h1 className="text-2xl font-bold">Face Edu</h1>
//       </div>

//       <div 
//         className="flex-1 flex flex-col items-center justify-center">
//         <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-3 bg-white shadow border-b-2 border-cyan-400">
//           <Link to='/admin'>
//             <div className="flex">
//               <img src={hlogo} alt="Logo" className="h-6 mt-1" />
//               <h1 className="text-2xl font-bold ml-3">Face Edu</h1>
//             </div>
//           </Link>

//           <ul className='flex flex-row ml-[100px] gap-36'>
//             {NavLinks.map((lists) => (
//               <li key={lists} className='text-black text-center hover:text-cyan-400 text-lg font-semibold mt-2'>
//                 <Link to={lists.destination} className='cursor-pointer mr-7'>
//                   {lists.text}
//                 </Link>
//               </li>
//             ))}
//           </ul>


//           <div className="flex flex-row items-center">
//             <img
//               src="placeholder" // image placeholder
//               alt="Profile"
//               className="mr-2 w-8 h-8 border-2 border-cyan-400 rounded-full object-cover"
//             />

//             <Link to='/login'>
//               <button className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors">
//                 Log out
//               </button>
//             </Link>
//           </div>
//         </nav>

//         <section className="flex-1 flex flex-col items-center justify-center">
//           <div>
//             <div className="flex items-center justify-center">
//               <div className="mt-10 mb-10 w-56 h-72 border-4 border-cyan-400 rounded-[50%/40%] overflow-hidden flex items-center justify-center">
//               {cameraEnabled ? (
//                   <Webcam
//                     audio={false}
//                     ref={webcamRef}
//                     screenshotFormat="image/jpeg"
//                     videoConstraints={videoConstraints}
//                     className="w-full h-full object-cover"
//                     style={{ clipPath: 'ellipse(100% 100% at 50% 50%)' }}
//                   />
//                 ) : (
//                   <img
//                     src={capturedImage}
//                     alt="Captured"
//                     className="w-full h-full object-cover"
//                     style={{ clipPath: 'ellipse(100% 100% at 50% 50%)' }}
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-center mt-3 space-x-10">
//               <button
//                 onClick={capture}
//                 className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors"
//               >
//                 Take a Photo
//               </button>
//               {/* <Link to='/confirmedpage'> */}
//                 <button
//                   onClick={handleSubmit}
//                   className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors">
//                   Submit
//                 </button>
//               {/* </Link> */}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default VerificationPage;


import React, { useState, useEffect } from "react";
import VerifyFromWebcam from "./faceVerify/verifyFromWebcam";
import { useNavigate, Link } from "react-router-dom";
import { Button, Modal, Card, message } from "antd";
import ModelLoadStatus from "./utils/ModelLoadStatus";
import ModelLoading from "./utils/ModelLoading";
import logo from "../img/Group 6.png";
import hlogo from "../img/Group 7.png";
import spiral from "../img/bgi.png";
import { NavLinks } from ".";
import {
  isFaceDetectionModelLoaded,
  isFacialLandmarkDetectionModelLoaded,
  isFeatureExtractionModelLoaded,
  loadModels
} from "./faceUtil";

const Verification = () => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
  const [isAllModelLoaded, setIsAllModelLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingMessageError, setLoadingMessageError] = useState("");
  const [faceDescriptors, setFaceDescriptors] = useState([]); // To store the saved descriptors
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();

  // Load models on component mount
  useEffect(() => {
    async function loadingModels() {
      await loadModels(setLoadingMessage, setLoadingMessageError);
      setIsAllModelLoaded(true);
    }
    if (isFaceDetectionModelLoaded() && isFacialLandmarkDetectionModelLoaded() && isFeatureExtractionModelLoaded()) {
      setIsAllModelLoaded(true);
      return;
    }
    loadingModels();
  }, [isAllModelLoaded]);

  const handleFaceMatch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/verify-face", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descriptor1: faceDescriptors[0],  // These are strings
          descriptor2: faceDescriptors[1],  // These are strings
        }),
      });
  
      const result = await response.json();
      console.log("Backend response:", result); // Log backend response
  
      if (result.success) {
        message.success("Face verified successfully!");
        navigate("/result");  // Navigate to result page
      } else {
        message.error(result.message || "Face verification failed."); // Use message from backend
        navigate("/failedpage");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      message.error("An error occurred during face verification.");
    } finally {
      setLoading(false);
      setIsModalVisible(false); // Hide the modal after verification
    }
  };
  

  const handleSaveDescriptors = (descriptors) => {
    console.log("Descriptors received from VerifyFromWebcam:", descriptors); // Log descriptors received from webcam
    setFaceDescriptors(descriptors);
  };

  const handleSubmit = () => {
    if (faceDescriptors.length === 2) {
      setIsModalVisible(true);
    } else {
      message.error("Please capture two face photos first.");
    }
  };

  const handleModalOk = () => {
    handleFaceMatch();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleEnableSubmit = (enabled) => {
    setIsSubmitEnabled(enabled);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8"
        style={{ backgroundImage: `url(${spiral})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
      >
        <img src={logo} alt="Logo" className="h-12 mb-8" />
        <h1 className="text-2xl font-bold">Face Edu</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-3 bg-white shadow border-b-2 border-cyan-400">
          <Link to="/admin">
            <div className="flex">
              <img src={hlogo} alt="Logo" className="h-6 mt-1" />
              <h1 className="text-2xl font-bold ml-3">Face Edu</h1>
            </div>
          </Link>
          <ul className="flex flex-row ml-[100px] gap-36">
            {NavLinks.map((lists) => (
              <li key={lists.text} className="text-black text-center hover:text-cyan-400 text-lg font-semibold mt-2">
                <Link to={lists.destination}>{lists.text}</Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-row items-center">
            <img
              src="placeholder" // image placeholder
              alt="Profile"
              className="mr-2 w-8 h-8 border-2 border-cyan-400 rounded-full object-cover"
            />
            <Link to="/login">
              <button className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors">
                Log out
              </button>
            </Link>
          </div>
        </nav>

        {/* Webcam Section and Card */}
        <div className="flex-1 flex flex-row items-start justify-center mt-[12rem]">
          {/* Webcam Section */}
          <div className="w-2/4 p-4 mr-[2rem]">
            <section className="flex-1 flex flex-col items-center justify-center">
              <VerifyFromWebcam onSaveDescriptors={handleSaveDescriptors} loading={loading} onEnableSubmit={handleEnableSubmit} />
            </section>
          </div>

          {/* Modal inside a card */}
          <div className="w-1/4 p-4">
            <Card title="Verification Status">
              <ModelLoadStatus errorMessage={loadingMessageError} />

              {!isAllModelLoaded ? (
                <ModelLoading loadingMessage={loadingMessage} />
              ) : loadingMessageError ? (
                <div className="error">{loadingMessageError}</div>
              ) : (
                <div>
                  <p>Face detection models are loaded and ready for verification.</p>
                </div>
              )}

              {/* Modal for confirmation */}
              <Modal
                visible={isModalVisible}
                title="Submit Verification"
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                confirmLoading={loading}
              >
                <p>Are you sure you want to submit the verification details?</p>
              </Modal>
            </Card>

            {/* Submit Button */}
            <Button type="primary" onClick={handleSubmit} disabled={!isSubmitEnabled || loading} style={{ marginTop: "20px" }}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;


