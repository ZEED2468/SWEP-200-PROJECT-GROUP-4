import React, { useState } from "react";
import imageCompression from 'browser-image-compression';
import { Upload, Button, Row, Col, Modal, message } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { getFullFaceDescription } from "../faceUtil";
import { inputSize } from "../globalData/faceAPI";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const UploadFromDisk = ({ onPhotoUpload, loading }) => {
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [faceDescriptors, setFaceDescriptors] = useState([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [isRunningFaceDetector, setIsRunningFaceDetector] = useState(false);

  // Compress the uploaded image to reduce its size
  const compressImage = async (image) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    };
    try {
      const compressedImage = await imageCompression(image, options);
      return compressedImage;
    } catch (error) {
      console.error("Error compressing image:", error);
      return image;
    }
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = () => setPreviewVisible(true);

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length === 0) {
      setFaceDescriptors([]);
      setPreviewImages([]);
      return;
    }

    const updatedPreviewImages = [];
    const updatedFaceDescriptors = [];
    setIsRunningFaceDetector(true);

    // Process each image
    for (const file of newFileList) {
      const base64Image = await getBase64(file.originFileObj);
      const compressedImage = await compressImage(file.originFileObj);
      const compressedBase64Image = await getBase64(compressedImage);

      // Detect face and extract features from the image
      const fullDesc = await getFullFaceDescription(compressedBase64Image, inputSize);

      updatedPreviewImages.push(base64Image); // Use the base64 for displaying the preview
      if (fullDesc.length > 0) {
        updatedFaceDescriptors.push(fullDesc[0].descriptor); // Only add if face is detected
      }
    }

    setPreviewImages(updatedPreviewImages);
    setFaceDescriptors(updatedFaceDescriptors); // Update face descriptors according to new file list
    setIsRunningFaceDetector(false);
  };

  const handleSavePhoto = () => {
    if (faceDescriptors.length === fileList.length && faceDescriptors.length > 0) {
      setPhotoCount(photoCount + 1);
      message.success(`Face photo ${photoCount + 1} saved.`);
    } else {
      message.error("Please ensure a valid face is detected before saving.");
    }
  };

  const handleSubmit = () => {
    if (photoCount === 2 && faceDescriptors.length === 2) {
      onPhotoUpload({ previewImages, faceDescriptors });
      message.success("Photos and descriptors submitted successfully.");
    } else {
      message.error("Please upload exactly two valid face photos before submitting.");
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Upload
            beforeUpload={() => false}
            multiple={true}
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
            fileList={fileList}
            accept="image/x-png,image/jpeg"
            maxCount={2}  // Limit the number of uploads to two files
          >
            {fileList.length >= 2 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Col>
        <Col>
          <Button
            type="primary"
            loading={loading}
            disabled={fileList.length === 0 || faceDescriptors.length !== fileList.length}
            onClick={handleSavePhoto}
          >
            Save
          </Button>
        </Col>
      </Row>
      <Row>
        <p>
          {isRunningFaceDetector ? (
            <>
              Detecting face... <LoadingOutlined />
            </>
          ) : (
            `Faces detected: ${faceDescriptors.length}`
          )}
        </p>
      </Row>
      <Row>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={photoCount !== 2 || faceDescriptors.length !== 2}
        >
          Submit
        </Button>
      </Row>

      <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
        {previewImages.map((image, index) => (
          <img key={index} alt={`Preview ${index}`} style={{ width: "100%" }} src={image} />
        ))}
      </Modal>
    </>
  );
};
