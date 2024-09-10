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
  loadModels,
} from "./faceUtil";
import { useAuthContext } from "../hooks/useAuthContext";

const Verification = () => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAllModelLoaded, setIsAllModelLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingMessageError, setLoadingMessageError] = useState("");
  const [faceDescriptors, setFaceDescriptors] = useState([]);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  // Load models on component mount
  useEffect(() => {
    async function loadingModels() {
      await loadModels(setLoadingMessage, setLoadingMessageError);
      setIsAllModelLoaded(true);
    }
    if (
      isFaceDetectionModelLoaded() &&
      isFacialLandmarkDetectionModelLoaded() &&
      isFeatureExtractionModelLoaded()
    ) {
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
          descriptor1: faceDescriptors[0],
          descriptor2: faceDescriptors[1],
        }),
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (result.success) {
        message.success("Face verified successfully!");
        navigate('/result', { state: { student: result.student, fromMatricNumber: false } });
      } else {
        message.error(result.message || "Face verification failed.");
        navigate("/failedpage");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      message.error("An error occurred during face verification.");
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleSaveDescriptors = (descriptors) => {
    console.log("Descriptors received from VerifyFromWebcam:", descriptors);
    setFaceDescriptors(descriptors);
  };

  const handleSubmit = () => {
    if (faceDescriptors.length === 2) {
      setIsModalVisible(true);
    } else {
      message.error("Please capture two face photos first.");
    }
  };

  const logOut = async () => {
    const response = await fetch("/api/v1/auth/logout", {
      method: "GET",
    });
    if (!response.ok) {
      console.log("Unable to logout");
    }
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
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
      <div
        className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8"
        style={{
          backgroundImage: `url(${spiral})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "120vh",
        }}
      >
        <img src={logo} alt="Logo" className="h-12 mb-8" />
        <h1 className="text-2xl font-bold">Face Edu</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-3 bg-white shadow border-b-2 border-cyan-400">
          <Link to="/admin">
            <div className="flex">
              <img src={hlogo} alt="Logo" className="h-6 mt-1" />
              <h1 className="text-2xl font-bold ml-3">Face Edu</h1>
            </div>
          </Link>
          <ul className="flex flex-row ml-[100px] gap-36">
            {NavLinks.map((lists) => (
              <li
                key={lists.text}
                className="text-black text-center hover:text-cyan-400 text-lg font-semibold mt-2"
              >
                <Link to={lists.destination}>{lists.text}</Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-row items-center">
            <button
              onClick={logOut}
              className="px-4 py-2 text-black bg-transparent border-2 border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition-colors"
            >
              Log out
            </button>
          </div>
        </nav>

        <div className="flex-1 flex flex-row items-start justify-center mt-[6rem]">
          <div className="w-2/4 p-4 mr-2">
            <section className="flex-1 flex flex-col items-center justify-center">
              <VerifyFromWebcam
                onSaveDescriptors={handleSaveDescriptors}
                loading={loading}
                onEnableSubmit={handleEnableSubmit}
              />
            </section>
          </div>

          <div className="w-1/4 p-4">
            <Card title="Verification Status">
              <ModelLoadStatus errorMessage={loadingMessageError} />

              {!isAllModelLoaded ? (
                <ModelLoading loadingMessage={loadingMessage} />
              ) : loadingMessageError ? (
                <div className="error">{loadingMessageError}</div>
              ) : (
                <div>
                  <p>
                    Face detection models are loaded and ready for verification.
                  </p>
                </div>
              )}

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

            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!isSubmitEnabled || loading}
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
