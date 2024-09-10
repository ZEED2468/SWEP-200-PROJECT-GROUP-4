import * as faceapi from 'face-api.js';

export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';

  try {
    console.log('Loading Face Detector');
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);

    console.log('Loading 68 Facial Landmark Detector');
    await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);

    console.log('Loading Feature Extractor');
    await faceapi.loadFaceRecognitionModel(MODEL_URL);

    console.log('All models loaded successfully');
  } catch (err) {
    console.error('Model loading error:', err);
    throw new Error('Model loading failed.');
  }
}


export async function getFullFaceDescription(blob, inputSize = 512) {
  // tiny_face_detector options
  let scoreThreshold = 0.5;
  const OPTION = new faceapi.SsdMobilenetv1Options({
    inputSize,
    scoreThreshold,
  });
  const useTinyModel = true;

  // fetch image to api
  let img = await faceapi.fetchImage(blob);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let fullDesc = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceLandmarks(useTinyModel)
    .withFaceDescriptors();
  return fullDesc;
}

export async function createMatcher(faceProfile, maxDescriptorDistance) {
  // Create labeled descriptors of member from profile
  let labeledDescriptors = faceProfile.map(
    (profile) =>
      new faceapi.LabeledFaceDescriptors(
        profile.student._id,
        profile.facePhotos.map(
          (photo) => new Float32Array(photo.faceDescriptor.match(/-?\d+(?:\.\d+)?/g).map(Number))
        )
      )
  );

  // Create face matcher (maximum descriptor distance is 0.5)
  let faceMatcher = new faceapi.FaceMatcher(
    labeledDescriptors,
    maxDescriptorDistance
  );

  return faceMatcher;
}

export function isFaceDetectionModelLoaded() {
  return !!faceapi.nets.ssdMobilenetv1.params;
}

export function isFeatureExtractionModelLoaded() {
  return !!faceapi.nets.faceRecognitionNet.params;
}

export function isFacialLandmarkDetectionModelLoaded() {
  return !!faceapi.nets.faceLandmark68TinyNet.params;
}