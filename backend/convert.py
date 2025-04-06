import base64

# Replace this with the path to your test image
image_path = r"C:\Users\pruth\OneDrive\Pictures\WIN_20250109_15_42_04_Pro.jpg"

with open(image_path, "rb") as img_file:
    b64_string = base64.b64encode(img_file.read()).decode("utf-8")
    full_string = "data:image/jpeg;base64," + b64_string
    print(full_string)

with open("encoded_image.txt", "w") as file:
    file.write(full_string)