import React, { useRef, useState, useEffect } from "react";
import styles from "./camera.module.css";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // New state to hold all response data
  const [detectionData, setDetectionData] = useState({
    banned_objects: [],
    banned_objects_detected: false,
    eye_detected: false,
    face_detected: false,
    face_match: false,
    gaze_direction: "",
    head_pose: "",
    mouth_open: false,
    num_faces: 0,
    time: "",
  });

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

    const interval = setInterval(captureImage, 1000);
    return () => clearInterval(interval);
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
      console.log("response : ", result);
      setDetectionData(result); // Save all response data
    } catch (error) {
      console.error("Error sending image: ", error);
    }
  };

  return (
    <>
      <div className={`flex flex-col items-center space-y-4 ${styles.camera} ${detectionData.face_detected ? styles.faceDetected : ""}`}>
        <video ref={videoRef} autoPlay width="400" height="300" className="rounded-lg shadow-lg w-70 h-50" />
        <canvas ref={canvasRef} width={400} height={300} hidden />
      </div>

      <div className="mt-4 space-y-2 text-left text-lg font-medium">
        <div>Face Detected: {detectionData.face_detected ? "Yes" : "No"}</div>
        <div>Eye Detected: {detectionData.eye_detected ? "Yes" : "No"}</div>
        <div>Face Match: {detectionData.face_match ? "Yes" : "No"}</div>
        <div>Gaze Direction: {detectionData.gaze_direction || "Unknown"}</div>
        <div>Head Pose: {detectionData.head_pose || "Unknown"}</div>
        <div>Mouth Open: {detectionData.mouth_open ? "Yes" : "No"}</div>
        <div>Number of Faces: {detectionData.num_faces}</div>
        <div>Banned Objects Detected: {detectionData.banned_objects_detected ? "Yes" : "No"}</div>
        <div>Banned Objects: {detectionData.banned_objects.join(", ") || "None"}</div>
        <div>Timestamp: {detectionData.time || "Not available"}</div>
      </div>
    </>
  );
};

export default Camera;
