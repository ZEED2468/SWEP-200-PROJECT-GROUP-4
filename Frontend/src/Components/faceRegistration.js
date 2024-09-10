import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Form, Modal, Select, Card, message } from "antd";
import { UploadFromDisk } from "./faceUpload/UploadFromDisk";
import { UploadFromWebcam } from "./faceUpload/UploadFromWebcam";
import {
  isFaceDetectionModelLoaded,
  isFacialLandmarkDetectionModelLoaded,
  isFeatureExtractionModelLoaded,
  loadModels,
} from "./faceUtil";
import ModelLoadStatus from "./utils/ModelLoadStatus";
import ModelLoading from "./utils/ModelLoading";
import logo from "../img/Group 6.png";
import hlogo from "../img/Group 7.png";
import spiral from "../img/bgi.png";
import { NavLinks } from ".";
import { useMutation } from "@apollo/client";
import { useAuthContext } from "../hooks/useAuthContext";

const { Option } = Select;

const DEFAULT_UPLOAD_OPTION = "From Webcam";
const UPLOAD_OPTION = ["From Webcam", "From Disk"];

function FaceRegistration() {
  const [form] = Form.useForm();
  const [selectedUploadOption, setSelectedUploadOption] = useState(
    DEFAULT_UPLOAD_OPTION
  );
  const [isAllModelLoaded, setIsAllModelLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingMessageError, setLoadingMessageError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState("");
  const [photoData, setPhotoData] = useState(null); // State to store the photo data (images and face descriptors)

  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const handleSelectUploadOption = (value) => {
    setSelectedUploadOption(value);
  };

  // Load face detection models on page load
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

  // This function will be passed to the Upload components to receive photo data
  const handlePhotoUpload = (data) => {
    console.log("Photo data received from UploadFromWebcam:", data); // Log the data received
    setPhotoData(data); // Save the photo data (previewImages and faceDescriptors) to state
  };
  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      if (!photoData) {
        message.error("Please capture or upload a photo before submitting.");
        return;
      }

      const formData = new FormData();

      // Append form data
      formData.append("name", values.name);
      formData.append("matricNo", values.matricNo);
      formData.append("department", values.department);
      formData.append("faculty", values.faculty);
      formData.append("currentPart", values.currentPart);
      formData.append("semester", values.semester);
      formData.append("courses", JSON.stringify(courses)); // Courses as JSON

      // Append face descriptors and images
      formData.append(
        "descriptor1",
        JSON.stringify(photoData.faceDescriptors[0])
      );
      formData.append(
        "descriptor2",
        JSON.stringify(photoData.faceDescriptors[1])
      );

      // Ensure these are file objects before appending
      formData.append("image1", photoData.previewImages[0]);
      formData.append("image2", photoData.previewImages[1]);

      try {
        const response = await fetch("/api/v1/students/register", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          message.success("Form and photo submitted successfully.");
          console.log("Response from backend:", await response.json());
          setLoading(false);
          navigate("/verificationpagE"); // Redirect after success
        } else {
          const errorResponse = await response.json();
          console.error("Backend error response:", errorResponse);
          message.error("Submission failed. Please try again.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Submission error:", error);
        message.error("An error occurred during submission. Please try again.");
        setLoading(false);
      }
    });
  };
  const logOut = async () => {
    const response = await fetch("/api/v1/auth/logout", {
      method: "GET",
    });
    if (!response.ok) {
      console.log("Uable to logout");
    }
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  // const handleSubmit = async () => {
  //   form.validateFields().then(async (values) => {
  //     if (!photoData) {
  //       message.error("Please capture or upload a photo before submitting.");
  //       return;
  //     }

  //     // Log the data before submission
  //     console.log("Photo data being sent to backend:", photoData);

  //     const formData = new FormData();

  //     // Append form data
  //     formData.append('name', values.name);
  //     formData.append('matricNo', values.matricNo);
  //     formData.append('department', values.department);
  //     formData.append('faculty', values.faculty);
  //     formData.append('currentPart', values.currentPart);
  //     formData.append('semester', values.semester);
  //     formData.append('courses', JSON.stringify(courses)); // Courses as array

  //     // Append face descriptors and images
  //     formData.append('descriptor1', JSON.stringify(photoData.faceDescriptors[0]));
  //     formData.append('descriptor2', JSON.stringify(photoData.faceDescriptors[1]));
  //     formData.append('image1', photoData.previewImages[0]); // First image file
  //     formData.append('image2', photoData.previewImages[1]); // Second image file

  //     // Log the FormData being submitted to the backend
  //     console.log('FormData being submitted to backend:', {
  //       name: formData.get('name'),
  //       matricNo: formData.get('matricNo'),
  //       department: formData.get('department'),
  //       faculty: formData.get('faculty'),
  //       currentPart: formData.get('currentPart'),
  //       semester: formData.get('semester'),
  //       courses: formData.get('courses'),
  //       descriptor1: formData.get('descriptor1'),
  //       descriptor2: formData.get('descriptor2'),
  //       image1: formData.get('image1'),
  //       image2: formData.get('image2'),
  //     });

  //     setLoading(true);

  //     try {
  //       const response = await fetch('/api/v1/students/register', {
  //         method: 'POST',
  //         body: formData,  // Pass FormData to the backend
  //       });

  //       if (response.ok) {
  //         message.success("Form and photo submitted successfully.");
  //         console.log("Response from backend:", await response.json()); // Log successful response
  //         setLoading(false);
  //         navigate("/verificationpagE");  // Redirect after success
  //       } else {
  //         // Log any errors returned by the backend
  //         const errorResponse = await response.json();
  //         console.error("Backend error response:", errorResponse);
  //         message.error("Submission failed. Please try again.");
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Submission error:", error); // Log the error in the catch block
  //       message.error("An error occurred during submission. Please try again.");
  //       setLoading(false);
  //     }
  //   });
  // };

  const addCourse = () => {
    if (currentCourse.trim() !== "") {
      setCourses([...courses, currentCourse]);
      setCurrentCourse("");
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="bg-black text-white w-1/4 flex flex-col items-center justify-center p-8"
        style={{
          backgroundImage: `url(${spiral})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "150vh",
          width: "55vh",
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
                <Link to={lists.destination} className="cursor-pointer mr-7">
                  {lists.text}
                </Link>
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

        {/* Main Content - Webcam, Form, Model Load Sections */}
        <div className="flex-1 flex flex-row items-start justify-center mt-[22rem]">
          {/* Webcam Section (Largest) */}
          <div className="w-2/4 p-4">
            <section className="flex-1 flex flex-col items-center justify-center">
              {/* Upload from Webcam or Disk */}
              {selectedUploadOption === "From Disk" ? (
                <UploadFromDisk
                  onPhotoUpload={handlePhotoUpload} // Correct prop name
                  loading={loading}
                />
              ) : (
                <UploadFromWebcam
                  onPhotoUpload={handlePhotoUpload} // Correct prop name
                  loading={loading}
                />
              )}
            </section>
          </div>

          {/* Form Section (Medium) */}
          <div className="w-1/4 p-4">
            <Form form={form} layout="vertical" className="mt-6 w-full">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Matric No"
                name="matricNo"
                rules={[
                  {
                    required: true,
                    message: "Please enter your matric number",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Department"
                name="department"
                rules={[
                  { required: true, message: "Please enter your department" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Faculty"
                name="faculty"
                rules={[
                  { required: true, message: "Please enter your faculty" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Current Part"
                name="currentPart"
                rules={[
                  { required: true, message: "Please enter your current part" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Semester"
                name="semester"
                rules={[
                  { required: true, message: "Please enter your semester" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Courses">
                <div className="flex">
                  <Input
                    value={currentCourse}
                    onChange={(e) => setCurrentCourse(e.target.value)}
                  />
                  <Button onClick={addCourse} className="ml-2">
                    Add
                  </Button>
                </div>
                <div className="mt-3">
                  {courses.map((course, index) => (
                    <div key={index}>{course}</div>
                  ))}
                </div>
              </Form.Item>

              <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Submit
              </Button>
            </Form>
          </div>

          {/* Model Load & Upload Option Section (Smallest) */}
          <div className="w-1/4 p-4">
            <section className="flex-1 flex flex-col items-center justify-center">
              {/* Upload Option */}
              <Form layout="vertical" className="mt-6 w-full">
                <Form.Item label="Upload Option">
                  <Select
                    defaultValue={DEFAULT_UPLOAD_OPTION}
                    onChange={handleSelectUploadOption}
                  >
                    {UPLOAD_OPTION.map((op) => (
                      <Option key={op} value={op}>
                        {op}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Form>

              {/* Model Load Section */}
              <div className="mt-6">
                <Card title="Model Load">
                  <ModelLoadStatus errorMessage={loadingMessageError} />
                </Card>

                {!isAllModelLoaded ? (
                  <ModelLoading loadingMessage={loadingMessage} />
                ) : loadingMessageError ? (
                  <div className="error">{loadingMessageError}</div>
                ) : (
                  <div>
                    {/* Additional actions can be added here if needed */}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Modal for Loading */}
      <Modal
        open={isModalVisible} // Changed 'visible' to 'open'
        title="Submitting Photo"
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loading}
      >
        <p>Are you sure you want to submit this photo and details?</p>
      </Modal>
    </div>
  );
}

export default FaceRegistration;
