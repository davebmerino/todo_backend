# Todo Backend API

A production-style REST API backend for a Todo/Task Management application built with **Node.js, Express, MongoDB, and JWT authentication**.

This project focuses on building a secure, maintainable, and scalable backend architecture using validation, authentication, logging, middleware, file uploads, and other production-ready libraries.

## 🚀 Features

* RESTful API architecture
* JWT-based authentication
* Password hashing with bcrypt
* Request validation using Express Validator
* MongoDB integration using Mongoose
* Centralized middleware
* Request and error logging
* Winston logging
* Express Winston integration
* HTTP request logging with Morgan
* CORS configuration
* Environment variable management
* Cloudinary image/file uploads
* Multer file handling
* Standard HTTP status codes
* Structured error handling
* Production-focused backend structure

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js 5**
* **MongoDB**
* **Mongoose**

### Authentication & Security

* **JSON Web Token (JWT)**
  Used for authentication and protecting private API routes.

* **bcrypt**
  Used for securely hashing user passwords before storing them in the database.

* **CORS**
  Controls which client applications are allowed to communicate with the API.

* **dotenv**
  Keeps sensitive configuration such as database URLs, JWT secrets, and Cloudinary credentials outside the source code.

### Validation

* **express-validator**
  Validates and sanitizes incoming request data before it reaches the application's business logic.

### Logging & Monitoring

* **Winston**
  Used for structured application and error logging.

* **Express Winston**
  Integrates Winston logging directly into the Express request and error-handling lifecycle.

* **Morgan**
  Provides HTTP request logging during development and debugging.



### Utilities

* **http-status-codes**
  Provides readable HTTP status constants instead of manually using numbers such as `200`, `400`, or `500`.

* **cross-env**
  Makes environment variables work consistently across Windows, macOS, and Linux.

* **nodemon**
  Automatically restarts the development server whenever source files change.

---

## 📦 Dependencies

```json
{
  "bcrypt": "^5.1.1",
  "cloudinary": "^2.10.1",
  "cors": "^2.8.6",
  "cross-env": "^10.1.0",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "express-validator": "^7.3.2",
  "express-winston": "^4.2.0",
  "http-status-codes": "^2.3.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^9.9.2",
  "morgan": "^1.11.0",
  "multer": "^2.2.0",
  "multer-storage-cloudinary": "^2.2.1",
  "nodemon": "^3.1.14",
  "winston": "^3.19.0"
}
```

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/todo_backend.git
```

Navigate to the project directory:

```bash
cd todo_backend
```

Install the dependencies:

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=8001

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRATION_TTL=3600

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Never commit your `.env` file or API secrets to GitHub. The internet has enough leaked credentials already.

Add `.env` to your `.gitignore`:

```gitignore
node_modules/
.env
logs/
```

## ▶️ Running the Project

Development mode:

```bash
npm run dev
```

Or depending on your configured scripts:

```bash
nodemon server.js
```

Production:

```bash
npm start
```

## 🔑 Authentication

The API uses **JSON Web Tokens** for user authentication.

After successful login, the server generates an access token containing information such as:

```text
User ID
Email
Issued time
Expiration time
```

Protected routes require the token to be included in the request headers:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## ✅ Request Validation

Incoming requests are validated using `express-validator`.

Example validation responsibilities include:

* Required fields
* Email validation
* Password validation
* Integer validation
* Query parameter validation
* Data sanitization
* Preventing invalid information from reaching the database

## 📝 Logging

The application uses multiple logging tools for different responsibilities.

### Winston

Handles structured application and error logs.

### Express Winston

Connects Winston with Express middleware to automatically capture requests and errors.

### Morgan

Provides readable HTTP request logs during development.

Example:

```text
GET /api/task/fetch 200
POST /api/task 201
POST /api/auth/login 200
```

## ☁️ Cloudinary Uploads

Uploaded images are handled using:

```text
Multer
↓
multer-storage-cloudinary
↓
Cloudinary
```

Instead of storing large images directly inside MongoDB, the database can store information such as:

```json
{
  "url": "https://res.cloudinary.com/...",
  "publicId": "todo_backend/example-image"
}
```

This keeps the application database smaller and allows Cloudinary to handle media delivery.

## 🗄️ Database

MongoDB is used as the primary database and **Mongoose** is used for:

* Schemas
* Models
* Validation
* Queries
* Document creation
* Updates
* Relationships between application data

## 🛡️ Security Practices

The project currently implements several important backend security practices:

* Password hashing with bcrypt
* JWT authentication
* Environment variables for secrets
* Request validation and sanitization
* CORS configuration
* Centralized error handling
* Structured application logging
* Authentication middleware
* Protected routes
* Cloud-based file storage instead of storing files directly in the database

## 🎯 Project Goal

The goal of this project is not only to build a working Todo API, but also to practice developing a backend using patterns and tools commonly found in real-world production applications.

The project demonstrates experience with:

**Node.js • Express.js • MongoDB • Mongoose • JWT • bcrypt • Express Validator • Winston • Middleware • REST APIs • Cloudinary • Multer • Authentication • API Security**

## 👨‍💻 Author

**Dave Merino**

Web Developer focused on building scalable applications using JavaScript, React, Node.js, Express, MongoDB, and modern web technologies.

