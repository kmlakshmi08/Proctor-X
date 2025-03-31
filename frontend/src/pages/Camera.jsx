import React, { useRef, useState, useEffect } from "react";
import styles from "./camera.module.css"

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [eyeDetected, setEyeDetected] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    };
    startCamera();

    const interval = setInterval(captureImage, 500); // Capture every 2 seconds
    // return () => clearInterval(interval);
  }, []);

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, 400, 300);
      const imageData = canvasRef.current.toDataURL("image/png");
      sendToBackend(imageData);
    }
  };

  const sendToBackend = async (imageData) => {
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });
      const result = await response.json();
      console.log("Results : ", result)
      setFaceDetected(result.face_detected);
      setEyeDetected(result.eye_detected);
    } catch (error) {
      console.error("Error sending image: ", error);
    }
  };

  return (
    <>
      <div className={`flex flex-col items-center space-y-4 ${styles.camera} ${faceDetected === true ? styles.faceDetected : null}`}>
        <video ref={videoRef} autoPlay width="400" height="300" className="rounded-lg shadow-lg w-70 h-50" />
        <canvas ref={canvasRef} width={400} height={300} hidden />
      </div>
      <div className="text-lg font-bold">
        {faceDetected ? "Face Detected" : "No Face Detected"}
      </div>
      <div className="text-lg font-bold">
        {eyeDetected ? "Eyes Detected" : "No Eyes Detected"}
      </div>
    </>
  );
};

export default Camera;