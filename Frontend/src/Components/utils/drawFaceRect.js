export const drawFaceRect = (descriptions, ctx, videoWidth, videoHeight, canvasWidth, canvasHeight) => {
  // Calculate scaling factors
  const xScale = canvasWidth / videoWidth;
  const yScale = canvasHeight / videoHeight;

  // Loop through each description (face detected)
  descriptions &&
    descriptions.forEach((desc) => {
      // Extract boxes and landmarks
      const { x, y, width, height } = desc.detection.box;
      const landmarksPoint = desc.landmarks._positions;

      // Scale the box dimensions based on the canvas size
      const scaledX = x * xScale;
      const scaledY = y * yScale;
      const scaledWidth = width * xScale;
      const scaledHeight = height * yScale;

      ctx.font = "normal 18px Gotham, Helvetica Neue, sans-serif";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#08E";

      // Draw 68 landmark points, adjusting for scale
      landmarksPoint.forEach((point) => {
        ctx.beginPath();
        ctx.fillStyle = "#08E";
        ctx.arc(point._x * xScale, point._y * yScale, 3, 0, 2 * Math.PI); // Scale x and y
        ctx.closePath();
        ctx.fill();
      });

      // Draw rectangle around the detected face, adjusted for scale
      ctx.beginPath();
      ctx.rect(scaledX, scaledY, scaledWidth, scaledHeight); // Use scaled dimensions
      ctx.stroke();
    });
};
