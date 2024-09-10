import React, { useEffect, useRef, useState } from "react";
import imageCompression from 'browser-image-compression';
import { Button, Card, Form, Select, message, Row, Col } from "antd";
import Webcam from "react-webcam";
import { getFullFaceDescription } from "../faceUtil";
import { DEFAULT_WEBCAM_RESOLUTION } from "../globalData/webcamResolutionType";
import { inputSize } from "../globalData/faceAPI";
import { drawFaceRect } from "../utils/drawFaceRect";
import { isFaceDetectionModelLoaded, isFacialLandmarkDetectionModelLoaded, isFeatureExtractionModelLoaded, loadModels } from "../faceUtil";
import ModelLoading from "../utils/ModelLoading";

const { Option } = Select;

export const VerifyFromWebcam = ({ onPhotoUpload, loading, onEnableSubmit, onSaveDescriptors }) => {
  const [camWidth, setCamWidth] = useState(DEFAULT_WEBCAM_RESOLUTION.width);
  const [camHeight, setCamHeight] = useState(DEFAULT_WEBCAM_RESOLUTION.height);
  const [inputDevices, setInputDevices] = useState([]);
  const [selectedWebcam, setSelectedWebcam] = useState();
  const [fullDesc, setFullDesc] = useState([]);
  const [faceDescriptors, setFaceDescriptors] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [waitText, setWaitText] = useState("Preparing face matcher, please wait...");
  const [isAllModelLoaded, setIsAllModelLoaded] = useState(false);
  const webcamRef = useRef();
  const canvasRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isCaptureCompleted, setIsCaptureCompleted] = useState(false);

  useEffect(() => {
    async function loadFaceMatcherModels() {
      await loadModels(setLoadingMessage);
      setIsAllModelLoaded(true);
    }
    if (!isFaceDetectionModelLoaded() || !isFacialLandmarkDetectionModelLoaded() || !isFeatureExtractionModelLoaded()) {
      loadFaceMatcherModels();
    } else {
      setIsAllModelLoaded(true);
    }
  }, []);

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
    if (isProcessing || isCaptureCompleted) return;

    setIsProcessing(true);

    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const screenshot = webcamRef.current.getScreenshot();
      const compressedImage = await compressImage(screenshot);

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const fullDescription = await getFullFaceDescription(compressedImage, inputSize);

      if (fullDescription.length > 0) {
        setFullDesc(fullDescription);
        const descriptorString = Array.from(fullDescription[0].descriptor).toString();
        setFaceDescriptors((prev) => [...prev, descriptorString]);

        const ctx = canvasRef.current.getContext("2d");

        // Draw rectangle and landmarks
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

        const newDescriptor = fullDesc[0].descriptor.join(",");

        if (newDescriptor) {
          setFaceDescriptors((prev) => {
            if (prev.length >= 2) {
              return [prev[1], newDescriptor];
            } else {
              return [...prev, newDescriptor];
            }
          });
        }

        message.success(`Face photo ${photoCount + 1} saved.`);

        if (photoCount + 1 === 2) {
          message.success("Two face photos captured.");
          setIsCaptureCompleted(true);
          onSaveDescriptors(faceDescriptors.slice(0, 2));
          onEnableSubmit(true);
          message.info("Ready for verification.");
        }
      } else {
        message.error("Image saving failed. Please try again.");
      }
    } else {
      message.error("No face detected. Please capture a valid photo.");
    }
  };

  const startCaptureInterval = () => {
    const intervalId = setInterval(() => {
      captureAndDetectFace();
    }, 8000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    if (!isCaptureCompleted) {
      const intervalCleanup = startCaptureInterval();
      return () => {
        intervalCleanup();
      };
    }
  }, [selectedWebcam, isCaptureCompleted]);

  return (
    <Card>
      {!isAllModelLoaded && <ModelLoading loadingMessage={loadingMessage} />}
      {isAllModelLoaded && (
        <div>
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

          {waitText && <p>{waitText}</p>}

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Webcam
              ref={webcamRef}
              audio={false}
              width={camWidth}
              height={camHeight}
              screenshotFormat="image/jpeg"
              videoConstraints={{ deviceId: selectedWebcam }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                zIndex: 8,
                width: camWidth,
                height: camHeight,
                pointerEvents: "none", // Prevents canvas from capturing mouse events
              }}
            />
          </div>

          <Row style={{ marginTop: "20px", marginBottom: "30px", display: "flex", justifyContent: "center" }}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button
                type="primary"
                onClick={handleSavePhoto}
                disabled={loading || isCaptureCompleted}
                style={{ position: "relative", zIndex: 10 }} // Ensures the button is above other elements
              >
                Save Photo
              </Button>
            </Col>
          </Row>

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
        </div>
      )}
    </Card>
  );
};

export default VerifyFromWebcam;
