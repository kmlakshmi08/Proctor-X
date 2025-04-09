# Proctoring App  

Follow these steps to set up the project on your local machine.

## Prerequisites  
Make sure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** or **yarn**
- **Python** (for the backend)

## Installation  

### Clone the Repository  
```sh
git clone https://github.com/pruthvikp/Online_Proctoring_System.git  
cd Online_Proctoring_System  
code .
```

### Install Frontend Dependencies  
Navigate to the `frontend` folder and install dependencies:
```sh
cd frontend  
npm install  
npm install react-router-dom  
npm install @reduxjs/toolkit react-redux  
```

### Install Backend Dependencies  
Navigate to the `backend` folder and install dependencies:
```sh
cd ../backend  
npm install  
npm install mongoose express cors  
```

## Running the Project  

### Start Backend Server 
Navigate to the `backend` folder and run:
```sh
cd backend  
npx nodemon server.js  
```

#### Python
```sh
cd backend
pip install -r requirements.txt
python server.py  
```

### Start Frontend Server  
Navigate to the `frontend` folder and run:
```sh
cd frontend  
npm start  
```

Your project should now be running successfully!

