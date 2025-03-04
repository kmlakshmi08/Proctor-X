from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load OpenCV classifiers
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

def detect_face_and_eyes(image_data):
    image_bytes = base64.b64decode(image_data.split(",")[1])
    image_np = np.frombuffer(image_bytes, dtype=np.uint8)
    img = cv2.imdecode(image_np, cv2.IMREAD_COLOR)

    # Convert image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    num_faces = len(faces)

    eye_detected = False
    for (x, y, w, h) in faces:
        roi_gray = gray[y:y+h, x:x+w]
        eyes = eye_cascade.detectMultiScale(roi_gray)
        if len(eyes) > 0:
            eye_detected = True

    return {"face_detected": num_faces > 0, "eye_detected": eye_detected, "num_faces": num_faces}

@app.route('/upload', methods=['POST'])
def upload():
    data = request.get_json()
    image_data = data.get("image")
    
    if not image_data:
        return jsonify({"error": "No image provided"}), 400

    detection_result = detect_face_and_eyes(image_data)
    
    return jsonify(detection_result)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)