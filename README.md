# Amazon Clone

A full-stack e-commerce application built with Node.js, Express, MongoDB, and React. This project replicates key features of Amazon.in, including product browsing, user authentication, shopping cart functionality, and order management.

## Features

- **User Authentication**: Sign up, login, and logout with JWT-based authentication
- **Product Catalog**: Browse products across multiple categories (Mobile Phones, Electronics, Fashion, Books, Home & Kitchen)
- **Product Search & Filtering**: Search by keyword and filter by category
- **Shopping Cart**: Add/remove products, manage quantities, persistent cart storage
- **Category Filtering**: Browse products by category with real-time filtering
- **Product Sorting**: Sort by price, rating, and featured products
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Protected Routes**: Authentication-required pages for secure shopping experience
- **Product Details**: Detailed product information with ratings and reviews count

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Encryption**: bcryptjs
- **Environment**: dotenv

### Frontend
- **Framework**: React 19
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Build Tool**: Create React App

## Project Structure

```
amazon-clone/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── cartController.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   └── cartModel.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── cartRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── data/
│   │   ├── products.js        # Product seed data
│   │   └── seeder.js          # Database seeder
│   ├── server.js              # Express app setup
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.js
│   │   │   │   ├── Footer.js
│   │   │   │   └── ProtectedRoute.js
│   │   │   └── product/
│   │   │       └── ProductCard.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── ProductListPage.js
│   │   │   ├── ProductDetailPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── LoginPage.js
│   │   │   └── RegisterPage.js
│   │   ├── redux/
│   │   │   ├── authSlice.js
│   │   │   ├── cartSlice.js
│   │   │   └── store.js
│   │   ├── services/
│   │   │   └── productService.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amazon-clone
JWT_SECRET=your_secret_key_here
```

4. Seed the database with sample products:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /profile` - Get user profile (protected)

### Product Routes (`/api/products`)
- `GET /` - Get all products (with optional keyword and category filters)
- `GET /categories` - Get all available categories
- `GET /:id` - Get product by ID

### Cart Routes (`/api/cart`)
- `GET /` - Get user's cart (protected)
- `POST /` - Add product to cart (protected)
- `PUT /:id` - Update cart item quantity (protected)
- `DELETE /:id` - Remove item from cart (protected)

## Available Categories

- Mobile Phones
- Electronics
- Fashion
- Books
- Home & Kitchen

## Running the Application

### Development Mode

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

### Production Mode

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm start
```

## Key Features Implementation

### Authentication Flow
1. Users register with email and password
2. Password is hashed using bcryptjs
3. JWT token is issued on login
4. Token is stored in Redux and localStorage
5. Protected routes check for valid token

### Shopping Cart
1. Cart data persists using Redux Persist
2. Users can add/remove products
3. Quantity management for each product
4. Real-time cart count updates in navbar

### Product Filtering
1. Products are filtered by category using URL parameters
2. Search functionality finds products by title
3. Sorting options: Featured, Price (Low-High, High-Low), Rating

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Grid layouts that adapt to screen size
- Sticky navigation bar
- Hamburger menu for mobile navigation

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amazon-clone
JWT_SECRET=your_secret_key_here
```

### Frontend (automatic via .env or hardcoded in productService.js)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Models

### User Schema
- name
- email (unique)
- password (hashed)
- createdAt

### Product Schema
- title
- price
- mrp (original price)
- image
- category
- rating (rate, count)
- prime (boolean)
- countInStock
- description

### Cart Schema
- userId
- products (array of product references with quantity)
- createdAt
- updatedAt

