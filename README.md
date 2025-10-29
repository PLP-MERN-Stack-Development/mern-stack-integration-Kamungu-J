# MERN Blog Application

## Overview
This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) blog application demonstrating seamless integration between front-end and back-end, including CRUD operations, image uploads, comments, pagination, and search/filter functionality.

---

## Features
- View all blog posts with pagination
- Create, edit, and delete posts
- Add comments to posts
- Upload featured images for posts
- Search posts by title
- Filter posts by category
- Responsive and simple UI

---

## Technologies
- **Frontend:** React.js (Vite), Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **File Uploads:** Multer
- **State Management:** React Hooks (useState, useEffect)
- **API Communication:** Axios

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB installed or MongoDB Atlas account

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <project-folder>

server setup
cd server
npm install

Client setup
cd client
npm install

API Documentation
Posts

GET /api/posts - Get all posts (supports page, limit, search, category query params)

GET /api/posts/:id - Get a single post by ID

POST /api/posts - Create a new post (multipart/form-data for image uploads)

PUT /api/posts/:id - Update a post

DELETE /api/posts/:id - Delete a post

Comments

GET /api/posts/:id/comments - Get all comments for a post

POST /api/posts/:id/comments - Add a comment to a post

Categories

GET /api/categories - Get all categories

POST /api/categories - Create a new category

File Structure
project-root/
│
├─ client/               # React frontend
│  ├─ src/
│  │  ├─ components/     # PostList, PostForm, etc.
│  │  ├─ services/       # Axios instance and API service
│  │  └─ App.jsx
│
├─ server/               # Node.js backend
│  ├─ routes/            # postRoutes.js, categoryRoutes.js
│  ├─ middleware/        # errorHandler.js
│  ├─ uploads/           # Uploaded images
│  └─ server.js
│
├─ .env                  # Server environment variables
└─ README.md

Screenshots
![alt text](<Screenshot 2025-10-29 121436.png>)
![alt text](<Screenshot 2025-10-29 121657.png>)