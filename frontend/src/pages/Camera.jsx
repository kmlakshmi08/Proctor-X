// import React, { useRef, useState, useEffect } from "react";
// import styles from "./camera.module.css";

// const Camera = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // New state to hold all response data
//   const [detectionData, setDetectionData] = useState({
//     banned_objects: [],
//     banned_objects_detected: false,
//     eye_detected: false,
//     face_detected: false,
//     face_match: false,
//     gaze_direction: "",
//     head_pose: "",
//     mouth_open: false,
//     num_faces: 0,
//     time: "",
//   });

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error("Error accessing camera: ", error);
//       }
//     };
//     startCamera();

//     const interval = setInterval(captureImage, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const captureImage = () => {
//     if (canvasRef.current && videoRef.current) {
//       const context = canvasRef.current.getContext("2d");
//       context.drawImage(videoRef.current, 0, 0, 400, 300);
//       const imageData = canvasRef.current.toDataURL("image/png");
//       sendToBackend(imageData);
//     }
//   };

//   const sendToBackend = async (imageData) => {
//     try {
//       const response = await fetch("http://localhost:5000/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: imageData }),
//       });
//       const result = await response.json();
//       console.log("response : ", result);
//       setDetectionData(result); // Save all response data
//     } catch (error) {
//       console.error("Error sending image: ", error);
//     }
//   };

//   return (
//     <>
//       <div className={`flex flex-col items-center space-y-4 ${styles.camera} ${detectionData.face_detected ? styles.faceDetected : ""}`}>
//         <video ref={videoRef} autoPlay width="400" height="300" className="rounded-lg shadow-lg w-70 h-50" />
//         <canvas ref={canvasRef} width={400} height={300} hidden />
//       </div>

//       <div className="mt-4 space-y-2 text-left text-lg font-medium">
//         <div>Face Detected: {detectionData.face_detected ? "Yes" : "No"}</div>
//         <div>Eye Detected: {detectionData.eye_detected ? "Yes" : "No"}</div>
//         <div>Face Match: {detectionData.face_match ? "Yes" : "No"}</div>
//         <div>Gaze Direction: {detectionData.gaze_direction || "Unknown"}</div>
//         <div>Head Pose: {detectionData.head_pose || "Unknown"}</div>
//         <div>Mouth Open: {detectionData.mouth_open ? "Yes" : "No"}</div>
//         <div>Number of Faces: {detectionData.num_faces}</div>
//         <div>Banned Objects Detected: {detectionData.banned_objects_detected ? "Yes" : "No"}</div>
//         <div>Banned Objects: {detectionData.banned_objects.join(", ") || "None"}</div>
//         <div>Timestamp: {detectionData.time || "Not available"}</div>
//       </div>
//     </>
//   );
// };

// export default Camera;

// import React, { useRef, useState, useEffect } from "react";
// import styles from "./camera.module.css";

// const Camera = ({ onViolation, onViolationCountExceeded }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [detectionData, setDetectionData] = useState({
//     face_detected: false,
//     eye_detected: false,
//     face_match: false,
//     gaze_direction: "Unknown",
//     head_pose: "Unknown",
//     mouth_open: false,
//     num_faces: 0,
//     banned_objects_detected: false,
//     banned_objects: [],
//     time: "Not available",
//   });

//   const [alertShown, setAlertShown] = useState(false);
//   const [startTime, setStartTime] = useState(null); // Track camera start time

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//         setStartTime(Date.now()); // Set the start time once camera stream starts
//       } catch (error) {
//         console.error("Camera access error:", error);
//       }
//     };
//     startCamera();

//     const interval = setInterval(captureImage, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const captureImage = () => {
//     if (!canvasRef.current || !videoRef.current) return;
//     const context = canvasRef.current.getContext("2d");
//     context.drawImage(videoRef.current, 0, 0, 400, 300);
//     const imageData = canvasRef.current.toDataURL("image/png");
//     sendToBackend(imageData);
//   };

//   const sendToBackend = async (imageData) => {
//     try {
//       const response = await fetch("http://localhost:5000/upload", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ image: imageData }),
//       });
//       const result = await response.json();

//       // Ensure banned_objects is always an array
//       if (!Array.isArray(result.banned_objects)) {
//         result.banned_objects = [];
//       }
//       setDetectionData(result);
//     } catch (error) {
//       console.error("Image send error:", error);
//     }
//   };

//   useEffect(() => {
//     if (!startTime) return; // If startTime not set, skip check

//     const {
//       face_detected,
//       eye_detected,
//       face_match,
//       num_faces,
//     } = detectionData;

//     const now = Date.now();
//     const secondsSinceStart = (now - startTime) / 1000;

//     // Do not trigger violation for the first 5 seconds
//     if (secondsSinceStart < 5) return;

//     const violation =
//       !face_detected &&
//       !eye_detected &&
//       !face_match &&
//       num_faces === 0;

//     if (violation && !alertShown) {
//       const shouldEndTest = onViolation?.();
//       setAlertShown(true);

//       setTimeout(() => {
//         setAlertShown(false);
//       }, 10000);

//       if (shouldEndTest && onViolationCountExceeded) {
//         onViolationCountExceeded();
//       }
//     }
//   }, [detectionData, startTime, alertShown, onViolation, onViolationCountExceeded]);

//   return (
//     <div className={`flex flex-col items-center space-y-4 ${styles.camera} ${detectionData.face_detected ? styles.faceDetected : ""}`}>
//       <video
//         ref={videoRef}
//         autoPlay
//         width="400"
//         height="300"
//         className="rounded-lg shadow-lg"
//       />
//       <canvas ref={canvasRef} width={400} height={300} hidden />

//       <div className="mt-4 space-y-2 text-left text-lg font-medium">
//         <div>Face Detected: {detectionData.face_detected ? "Yes" : "No"}</div>
//         <div>Eye Detected: {detectionData.eye_detected ? "Yes" : "No"}</div>
//         <div>Face Match: {detectionData.face_match ? "Yes" : "No"}</div>
//         <div>Gaze Direction: {detectionData.gaze_direction || "Unknown"}</div>
//         <div>Head Pose: {detectionData.head_pose || "Unknown"}</div>
//         <div>Mouth Open: {detectionData.mouth_open ? "Yes" : "No"}</div>
//         <div>Number of Faces: {detectionData.num_faces}</div>
//         <div>Banned Objects Detected: {detectionData.banned_objects_detected ? "Yes" : "No"}</div>
//         <div>Banned Objects: {detectionData.banned_objects.length > 0 ? detectionData.banned_objects.join(", ") : "None"}</div>
//         <div>Timestamp: {detectionData.time || "Not available"}</div>
//       </div>
//     </div>
//   );
// };

// export default Camera;

import React, { useRef, useState, useEffect } from "react";
import styles from "./camera.module.css";

const Camera = ({ onViolation, onViolationCountExceeded, onViolationDetected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [detectionData, setDetectionData] = useState({
    face_detected: false,
    eye_detected: false,
    face_match: false,
    gaze_direction: "Unknown",
    head_pose: "Unknown",
    mouth_open: false,
    num_faces: 0,
    banned_objects_detected: false,
    banned_objects: [],
    time: "Not available",
  });

  const [alertShown, setAlertShown] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStartTime(Date.now());
      } catch (error) {
        console.error("Camera access error:", error);
      }
    };
    startCamera();

    const interval = setInterval(captureImage, 2000);
    return () => clearInterval(interval);
  }, []);

  const captureImage = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 400, 300);
    const imageData = canvasRef.current.toDataURL("image/png");
    sendToBackend(imageData);
  };

  const sendToBackend = async (imageData) => {
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });
      const result = await response.json();

      if (!Array.isArray(result.banned_objects)) {
        result.banned_objects = [];
      }
      setDetectionData(result);
    } catch (error) {
      console.error("Image send error:", error);
    }
  };

  useEffect(() => {
    if (!startTime) return;

    const {
      face_detected,
      eye_detected,
      face_match,
      gaze_direction,
      head_pose,
      mouth_open,
      num_faces,
      banned_objects_detected,
    } = detectionData;

    const now = Date.now();
    const secondsSinceStart = (now - startTime) / 1000;

    if (secondsSinceStart < 5) return;

    let violationType = null;

    // Check num_faces condition first:
    if (num_faces === 0) {
      violationType = "No face detected. Please stay focused on the screen.";
    } else if (num_faces > 1) {
      violationType = "More than one person detected. Only one face is allowed.";
    } else if (!face_detected && !eye_detected && !face_match) {
      violationType = "Face not detected properly. Please stay focused on the screen.";
    } else if (gaze_direction.toLowerCase() !== "center") {
      violationType = "Please keep your gaze centered on the screen.";
    } else if (head_pose.toLowerCase() !== "forward") {
      violationType = "Please keep your head facing forward.";
    } else if (mouth_open === true) {
      violationType = "Please keep your mouth closed during the test.";
    } else if (banned_objects_detected === true) {
      violationType = "Banned objects detected. Please remove them immediately.";
    }

    if (violationType && !alertShown) {
      onViolationDetected?.(violationType);

      const shouldEndTest = onViolation?.();
      setAlertShown(true);

      setTimeout(() => {
        setAlertShown(false);
      }, 10000);

      if (shouldEndTest && onViolationCountExceeded) {
        onViolationCountExceeded();
      }
    }
  }, [detectionData, startTime, alertShown, onViolation, onViolationCountExceeded, onViolationDetected]);

  return (
    <div className={`flex flex-col items-center space-y-4 ${styles.camera} ${detectionData.face_detected ? styles.faceDetected : ""}`}>
      <video
        ref={videoRef}
        autoPlay
        width="400"
        height="300"
        className="rounded-lg shadow-lg"
      />
      <canvas ref={canvasRef} width={400} height={300} hidden />

      <div className="mt-4 space-y-2 text-left text-lg font-medium">
        <div>Face Detected: {detectionData.face_detected ? "Yes" : "No"}</div>
        <div>Eye Detected: {detectionData.eye_detected ? "Yes" : "No"}</div>
        <div>Face Match: {detectionData.face_match ? "Yes" : "No"}</div>
        <div>Gaze Direction: {detectionData.gaze_direction || "Unknown"}</div>
        <div>Head Pose: {detectionData.head_pose || "Unknown"}</div>
        <div>Mouth Open: {detectionData.mouth_open ? "Yes" : "No"}</div>
        <div>Number of Faces: {detectionData.num_faces}</div>
        <div>Banned Objects Detected: {detectionData.banned_objects_detected ? "Yes" : "No"}</div>
        <div>Banned Objects: {detectionData.banned_objects.length > 0 ? detectionData.banned_objects.join(", ") : "None"}</div>
        <div>Timestamp: {detectionData.time || "Not available"}</div>
      </div>
    </div>
  );
};

export default Camera;
