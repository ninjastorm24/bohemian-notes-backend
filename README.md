# Bohemian Notes Backend

A modern RESTful API backend for a blogging platform, built with **Node.js**, **Express**, and **MongoDB** (via Mongoose). This backend supports user authentication, blog and category management, and a comment system with role-based access control.

---

## Features

- User registration & login (JWT authentication)
- Role-based authorization (Admin/User)
- Blog CRUD operations
- Category CRUD operations
- Nested comments with moderation
- Secure password hashing
- Environment-based configuration

---

## Tech Stack

- **Node.js** & **Express** for the server
- **MongoDB** & **Mongoose** for the database
- **TypeScript** for type safety
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or cloud)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/bohemian-notes.git
   cd bohemian-notes/backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in `src/` (see `.env.example` if available):

   ```
   MONGO_URL=mongodb://localhost:27017/bohemian-notes
   PORT=5000
   SALT=10
   JWT_SECRET=your_jwt_secret
   ADMIN_PASSWORD=your_admin_password
   ```

4. **Build the project:**

   ```sh
   npm run build
   ```

5. **Run the server (development):**

   ```sh
   npm run dev
   ```

   Or run the compiled code:

   ```sh
   npm start
   ```

---

## Project Structure

```
src/
  config/         # Database connection
  constants/      # App-wide constants & env vars
  controllers/    # Route handlers (business logic)
  middlewares/    # Express middlewares (auth, etc.)
  models/         # Mongoose schemas & models
  routes/         # API route definitions
  scripts/        # Utility scripts (e.g., seed admin)
  utils/          # Utility functions (e.g., JWT)
  index.ts        # App entry point
```

---

## API Overview

All endpoints are prefixed with `/api`.

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/me` — Get current user info (requires JWT)

### Blogs

- `POST /api/blogs` — Create blog (Admin only)
- `GET /api/blogs` — List all blogs
- `GET /api/blogs/:id` — Get blog by ID
- `PUT /api/blogs/:id` — Update blog (Admin only)
- `DELETE /api/blogs/:id` — Delete blog (Admin only)

### Categories

- `POST /api/categories` — Create category (Admin only)
- `GET /api/categories` — List all categories
- `PUT /api/categories/:id` — Update category (Admin only)
- `DELETE /api/categories/:id` — Delete category (Admin only)

### Comments

- `POST /api/comments` — Add comment (User/Admin)
- `GET /api/comments/:blogId` — List comments for a blog
- `DELETE /api/comments/:id` — Delete comment (Owner/Admin)

---

## Scripts

- **Seed admin user:**

  ```sh
  npm run seed:admin
  ```

- **Test scripts:**  
  Run test scripts for models (see `src/testUser.ts`, `src/testBlog.ts`, `src/testCategory.ts`).

---

## License

MIT

---

## Author

[Your Name](https://github.com/yourusername)
