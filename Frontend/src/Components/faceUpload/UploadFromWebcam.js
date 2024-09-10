import React, { useEffect, useRef, useState } from "react";
import imageCompression from 'browser-image-compression';
import { Button, Card, Form, Select, message, Row, Col } from "antd";
import Webcam from "react-webcam";
import { getFullFaceDescription } from "../faceUtil";
import { DEFAULT_WEBCAM_RESOLUTION } from "../globalData/webcamResolutionType";
import { inputSize } from "../globalData/faceAPI";
import { drawFaceRect } from "../utils/drawFaceRect";

const { Option } = Select;

export const UploadFromWebcam = ({ onPhotoUpload, loading }) => {
  const [camWidth, setCamWidth] = useState(DEFAULT_WEBCAM_RESOLUTION.width);
  const [camHeight, setCamHeight] = useState(DEFAULT_WEBCAM_RESOLUTION.height);
  const [inputDevices, setInputDevices] = useState([]);
  const [selectedWebcam, setSelectedWebcam] = useState();
  const [fullDesc, setFullDesc] = useState([]);
  const [faceDescriptors, setFaceDescriptors] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [waitText, setWaitText] = useState("Preparing face matcher, please wait...");
  const webcamRef = useRef();
  const canvasRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const inputDevice = devices.filter((device) => device.kind === "videoinput");
      setInputDevices(inputDevice);
    });
  }, []);

  const compressImage = async (imageData) => {
    try {
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(imageData, options);
      return compressedFile;
    } catch (error) {
      console.error("Image compression failed:", error);
      return imageData;
    }
  };

  const base64ToBlob = async (base64) => {
    try {
      const res = await fetch(base64);
      const blob = await res.blob();
      return blob;
    } catch (error) {
      console.error("Failed to convert base64 to Blob:", error);
      return null;
    }
  };

  const captureAndDetectFace = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const screenshot = webcamRef.current.getScreenshot();
      console.log("Screenshot captured:", screenshot);

      const compressedImage = await compressImage(screenshot);
      console.log("Compressed image:", compressedImage);

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const fullDescription = await getFullFaceDescription(compressedImage, inputSize);
      console.log("Full description:", fullDescription);

      if (fullDescription.length > 0) {
        setFullDesc(fullDescription);
        const descriptorString = Array.from(fullDescription[0].descriptor).toString();
        setFaceDescriptors((prev) => [...prev, descriptorString]);

        const ctx = canvasRef.current.getContext("2d");
drawFaceRect(fullDescription, ctx, videoWidth, videoHeight, camWidth, camHeight);
        setWaitText("");

        message.success(`Face detected. You can now save photo ${photoCount + 1}.`);
      } else {
        setWaitText("No face detected. Please adjust your position.");
        setFullDesc([]);
      }
    }

    setIsProcessing(false);
  };

  const handleSavePhoto = async () => {
    if (photoCount >= 2) {
      message.error("You have already saved two face photos.");
      return;
    }
  
    await captureAndDetectFace();
  
    if (fullDesc.length > 0) {
      const screenshot = webcamRef.current.getScreenshot();
      const compressedImage = await compressImage(screenshot);
      const blobImage = await base64ToBlob(compressedImage);
  
      if (blobImage) {
        setPreviewImages((prev) => [...prev, blobImage]);
        setPhotoCount((prev) => prev + 1);
  
        message.success(`Face photo ${photoCount + 1} saved.`);
  
        // Log face descriptors being saved
        console.log("Descriptors being saved:", faceDescriptors);
  
        // Check if we have now reached 2 photos
        if (photoCount + 1 === 2) {
          message.success("Two face photos captured. You can now submit the form.");
        }
      } else {
        message.error("Image saving failed. Please try again.");
      }
    } else {
      message.error("No face detected. Please capture a valid photo.");
    }
  };
  
  const handleSubmit = async () => {
    console.log("Photo count:", photoCount);
    console.log("Preview images length:", previewImages.length);
    console.log("Face descriptors length:", faceDescriptors.length);
  
    // Log the descriptors before submission
    console.log("Descriptors being sent to FaceRegistration:", faceDescriptors);
  
    try {
      if (photoCount === 2 && previewImages.length === 2 && faceDescriptors.length === 4) {
        const formData = new FormData();
        formData.append('descriptor1', faceDescriptors[0]);
        formData.append('descriptor2', faceDescriptors[1]);
        formData.append('image1', previewImages[0], 'image1.jpg');
        formData.append('image2', previewImages[1], 'image2.jpg');
  
        console.log('FormData being submitted to FaceRegistration:', {
          descriptor1: formData.get('descriptor1'),
          image1: formData.get('image1'),
          descriptor2: formData.get('descriptor2'),
          image2: formData.get('image2'),
        });
  
        onPhotoUpload({
          previewImages: [formData.get('image1'), formData.get('image2')],
          faceDescriptors: [formData.get('descriptor1'), formData.get('descriptor2')],
        });
  
        message.success("Face photos and descriptors submitted successfully.");
        setPhotoCount(0);
        setFaceDescriptors([]);
        setPreviewImages([]);
      } else {
        message.error("Please capture two face photos before submitting.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      message.error("An error occurred during submission. Please try again.");
    }
  };
  

  const startCaptureInterval = () => {
    const intervalId = setInterval(() => {
      captureAndDetectFace();
    }, 8000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    const intervalCleanup = startCaptureInterval();
    return () => {
      intervalCleanup();
    };
  }, [selectedWebcam]);

  return (
    <Card>
      <Form>
        <Form.Item label="Webcam">
          <Select
            defaultValue="Select Webcam"
            style={{ width: 300 }}
            onChange={(value) => setSelectedWebcam(value)}
          >
            {inputDevices.map((device) => (
              <Option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Webcam
          ref={webcamRef}
          audio={false}
          width={camWidth}
          height={camHeight}
          screenshotFormat="image/jpeg"
          videoConstraints={{ deviceId: selectedWebcam }}
        />
        <canvas ref={canvasRef} style={{ position: "absolute", zIndex: 8, width: camWidth, height: camHeight }} />
      </div>

      <Row style={{ marginTop: "20px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button type="primary" onClick={handleSavePhoto} disabled={loading || photoCount >= 2}>
            Save Photo
          </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button type="primary" onClick={handleSubmit} disabled={photoCount !== 2}>
            Submit
          </Button>
        </Col>
      </Row>

      {waitText && <p>{waitText}</p>}

      {previewImages.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px" }}>
          {previewImages.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Captured ${index + 1}`}
              style={{ width: "200px", height: "200px", margin: "0 10px" }}
            />
          ))}
        </div>
      )}
    </Card>
  );
};
