---

# 📝 Blog API (Node.js + Express + MongoDB + TypeScript)

A secure and scalable **RESTful API** for blogging, built with Node.js, Express.js, TypeScript, and MongoDB.
Supports user authentication, blog management, comments, likes, role-based access, file uploads, and structured logging.

---

## 🚀 Features

* User registration & login (JWT-based authentication)
* Email/phone verification with code
* Role-based access: `admin`, `writer`, `reader`
* Create, update, publish, and delete blogs
* Comment creation, update, status management
* Like/unlike blog posts
* Request validation with **Zod**
* Password hashing using **argon2** & **bcrypt**
* File uploads with **Multer** and **Cloudinary**
* Rate limiting & security with **Helmet**, **CORS**
* Detailed logging with **Winston** and **Morgan**
* Environment variable management with **dotenv**
* Full Postman collection included

---

## ⚙️ Technologies Used

| Technology / Package       | Purpose                         |
| -------------------------- | ------------------------------- |
| **Node.js**                | Runtime environment             |
| **TypeScript**             | Type safety                     |
| **Express.js**             | Backend framework               |
| **MongoDB + Mongoose**     | Database & ODM                  |
| **jsonwebtoken**           | JWT authentication              |
| **argon2 & bcrypt**        | Password hashing                |
| **cloudinary**             | Media management                |
| **multer**                 | File uploads                    |
| **zod**                    | Request validation              |
| **helmet**                 | Security headers                |
| **express-mongo-sanitize** | Mongo injection protection      |
| **cors**                   | CORS configuration              |
| **morgan & winston**       | Logging                         |
| **express-rate-limit**     | Brute-force protection          |
| **dotenv**                 | Environment variable management |
| **zxcvbn**                 | Password strength validation    |

---

## 🔑 Environment Variables (`.env`)

Create a `.env` file in the project root:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_KEY=your_jwt_secret_key
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_ENV_VARIABLE=CLOUDINARY_URL
```

---

## 📬 Postman Collection

Postman collection included for easy testing:

```
/postman/collection.json
```

To import:

**Postman → Import → File → collection.json**

---

## 🧩 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/kaderkaaya/blog-api2.git
cd blog-api2
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your `.env` file

(Use the variables shown above.)

### 4. Start the server

```bash
npm run dev
# or
ts-node src/server.ts
```

---

## 👨‍💻 Developed by

**Kader Kaya**
GitHub: [@kaderkaaya](https://github.com/kaderkaaya)

---