from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
from flask_cors import CORS
import datetime
import face_recognition
import os
import torch
import mediapipe as mp

app = Flask(__name__)
CORS(app)

# Load OpenCV classifiers
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

# Load the known face encodings and names
registered_face_path = "../frontend/src/img/Pruthvi.jpg"
registered_image = face_recognition.load_image_file(registered_face_path)
registered_encoding = face_recognition.face_encodings(registered_image)[0]

# Load the YOLOv5s model
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')

# Load MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, refine_landmarks=True)

def detect_face_and_eyes(img):
    # Convert to grayscale for detection
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # No of faces Detection
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    num_faces = len(faces)

    # Eye Detection
    eye_detected = False

    for (x, y, w, h) in faces:
        roi_gray = gray[y:y+h, x:x+w]
        if roi_gray.size > 0:
            eyes = eye_cascade.detectMultiScale(roi_gray)
            if len(eyes) > 0:
                eye_detected = True

    return num_faces, eye_detected

def face_recognition_fn(img):
    # Face Recognition (uses color image)
    face_recognition_results = face_recognition.face_encodings(img)

    is_match = False
    if face_recognition_results:
        match_results = face_recognition.compare_faces([registered_encoding], face_recognition_results[0])
        is_match = bool(match_results[0])

    return is_match

def detect_banned_objects(img):
    # Run detection
    results = model(img)
    labels = results.pandas().xyxy[0]['name'].tolist()

    # Define banned object labels (we can add more if needed)
    banned_keywords = ["cell phone", "laptop", "tv", "monitor", "computer", 
                       "camera", "tablet", "mobile", "smartphone", "headphones", 
                       "earphones", "earbuds", "smartwatch", "gadget", "device"]
    
    detected_banned= any(any(banned in label.lower() for banned in banned_keywords) for label in labels)
    banned_objects = [label for label in labels if any(banned in label.lower() for banned in banned_keywords)]

    return detected_banned, banned_objects

def analyze_face_orientation(img):
    with mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, refine_landmarks=True) as face_mesh:
        results = face_mesh.process(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

    if not results.multi_face_landmarks:
        return "unknown", False, "unknown"

    landmarks = results.multi_face_landmarks[0].landmark
    image_height, image_width = img.shape[:2]

    # Convert normalized coordinates to pixel coordinates
    def get_point(index):
        lm = landmarks[index]
        return int(lm.x * image_width), int(lm.y * image_height)

    # Gaze estimation using eye landmarks
    left_eye = get_point(468)
    right_eye = get_point(473)
    eye_center = ((left_eye[0] + right_eye[0]) // 2, (left_eye[1] + right_eye[1]) // 2)
    nose_tip = get_point(1)
    
    # Gaze direction — very basic approximation
    gaze_direction = "center"
    if eye_center[0] < nose_tip[0] - 10:
        gaze_direction = "right"
    elif eye_center[0] > nose_tip[0] + 10:
        gaze_direction = "left"

    # Mouth open detection
    upper_lip = get_point(13)
    lower_lip = get_point(14)
    mouth_open = abs(upper_lip[1] - lower_lip[1]) > 15  # Tune this threshold if needed

    # Head pose — very basic using eyes and nose
    head_pose = "forward"
    if nose_tip[0] < left_eye[0]:
        head_pose = "right"
    elif nose_tip[0] > right_eye[0]:
        head_pose = "left"

    return gaze_direction, mouth_open, head_pose

def monitor(image_data):
    image_bytes = base64.b64decode(image_data.split(",")[1])    #Convert base64 string to bytes
    image_np = np.frombuffer(image_bytes, dtype=np.uint8)       #Convert bytes to numpy array
    img = cv2.imdecode(image_np, cv2.IMREAD_COLOR)              #Decode the image

    num_faces, eye_detected = detect_face_and_eyes(img)  # function to detect face and eyes
    is_match = face_recognition_fn(img)  # function to recognize face
    banned_result, banned_objects = detect_banned_objects(img)  # function to detect banned objects
    gaze_direction, mouth_open, head_pose = analyze_face_orientation(img)  # function to analyze face orientation

    return {
        "face_detected": num_faces > 0,
        "eye_detected": eye_detected,
        "num_faces": num_faces,
        "face_match": is_match,
        "banned_objects_detected": banned_result,
        "banned_objects": banned_objects,
        "gaze_direction": gaze_direction,
        "mouth_open": mouth_open,
        "head_pose": head_pose,
        "time": datetime.datetime.now()
    }

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    image_data = data.get("image")
    
    if not image_data:
        return jsonify({"error": "No image provided"}), 400

    detection_result = monitor(image_data)
    
    return jsonify(detection_result)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)