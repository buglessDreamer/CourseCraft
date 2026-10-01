# 🎓 CourseCraft

**CourseCraft** is a professional, full-stack Learning Management System (LMS) designed for the modern web. Built with the **MERN stack**, it features a dual-interface system that provides tailored experiences for both Instructors and Students.

<img width="1891" height="998" alt="Screenshot 2026-01-05 011126" src="https://github.com/user-attachments/assets/2669f161-630b-43c6-9fc8-d19ffebc732c" />




## 🚀 Key Features

### 👤 For Students
- **Course Marketplace:** Browse high-quality courses with dynamic instructor data.
- **Personal Dashboard:** Manage enrolled courses and track learning progress.
- **Curriculum Viewer:** Stream video content and access lesson materials directly.
- **Seamless Auth:** JWT-powered login with persistent sessions via Recoil.

### 🛠️ For Instructors (Admin)
- **Course Creator:** Full CRUD operations (Create, Read, Update, Delete) for courses.
- **Content Manager:** Add lessons (video URLs, titles) to courses on the fly.
- **Revenue Overview:** Manage course pricing and visibility.
- **Instructor Panel:** A dedicated interface for managing the entire course catalog.

## 🛠️ Tech Stack

| Frontend | Backend | Database & Auth |
| :--- | :--- | :--- |
| **React.js** (Vite) | **Node.js** | **MongoDB** (Atlas) |
| **Tailwind CSS** | **Express.js** | **JWT** (JSON Web Tokens) |
| **Recoil** (State) | **Zod** (Validation) | **Bcrypt** (Hashing) |
| **Axios** | **dotenv** | **Mongoose** (ODM) |

## 🏁 Getting Started
1. Prerequisites
     Node.js (v18+)
     MongoDB Atlas Account

2. Backend Setup
```
Bash
cd server
npm install
```
  Create a .env file in the server folder:
```
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=user_secret_key
JWT_ADMIN_PASSWORD=admin_secret_key
```
  Start the server:
```
Bash

node server.js
```
3. Frontend Setup
```
Bash

cd client
npm install
npm run dev
```

4. Open http://localhost:5173 in your browser.

## 🛡️ Security Features
RBAC (Role-Based Access Control): Middleware-level checks to prevent unauthorized access to Admin routes.

Protected Routing: React components wrapped in Auth checks to prevent URL-based bypass.

Data Integrity: Strict schema validation using Zod for all incoming API requests.

<hr/>

