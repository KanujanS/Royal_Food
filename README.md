# Royal Food

Royal Food is a full-stack food delivery platform with a customer-facing storefront, an admin dashboard, and a Node.js backend for menu, cart, order, authentication, image upload, and payment handling.

## Project Overview

This workspace contains three separate apps:

- `frontend`: the customer app where users browse food, manage their cart, place orders, and track order status.
- `admin`: the dashboard used to add menu items, view the food list, and manage orders.
- `backend`: the Express API that connects to MongoDB, Cloudinary, and Stripe.

## Features

### Customer App

- Browse menu items by category.
- Add and remove items from cart.
- Register and log in users.
- Place orders with delivery details.
- Pay through Stripe checkout.
- View and track past orders.

### Admin Dashboard

- Add new food items with image upload.
- View all menu items.
- Remove menu items.
- View all orders.
- Update order status.

### Backend

- REST API built with Express.
- MongoDB database integration.
- JWT-based authentication.
- Cloudinary image storage for menu photos.
- Stripe checkout session creation for payments.

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Admin: React, Vite, React Router, React Toastify, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Multer, Cloudinary, Stripe

## Project Structure

~~~text
Food Delivery/
  frontend/   Customer-facing app
  admin/      Admin dashboard
  backend/    Express API and database logic
~~~

## Prerequisites

- Node.js and npm
- MongoDB connection string
- Cloudinary account credentials
- Stripe secret key

## Setup

### 1. Install dependencies

Run the following in each app folder:

~~~bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
~~~

### 2. Configure backend environment variables

Create a `.env` file inside `backend` with the following values:

~~~env
MONGOOB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
~~~

Note: the backend uses `MONGOOB_URI` as written in the codebase.

### 3. Start the backend

~~~bash
cd backend
npm run server
~~~

The API runs on `http://localhost:4000` by default.

### 4. Start the customer frontend

~~~bash
cd frontend
npm run dev
~~~

The customer app runs on `http://localhost:5174`.

### 5. Start the admin dashboard

~~~bash
cd admin
npm run dev
~~~

The admin dashboard runs on `http://localhost:5173`.

## Local Development Notes

- The customer app currently points to the deployed backend URL in `frontend/src/context/StoreContext.jsx`.
- The admin app points to `http://localhost:4000` in `admin/src/App.jsx`.
- The checkout flow in `backend/controllers/orderController.js` redirects back to `http://localhost:5174` for payment verification.
- If you change local ports or deploy the apps separately, update those URLs accordingly.


## API Endpoints

- `POST /api/user/register` - Register a user
- `POST /api/user/login` - Log in a user
- `GET /api/food/list` - Get all menu items
- `POST /api/food/add` - Add a menu item
- `POST /api/food/remove` - Remove a menu item
- `POST /api/cart/add` - Add an item to the cart
- `POST /api/cart/remove` - Remove an item from the cart
- `POST /api/cart/get` - Fetch cart data
- `POST /api/order/place` - Place an order and create a Stripe checkout session
- `POST /api/order/verify` - Verify payment result
- `POST /api/order/userorders` - Fetch a user's orders
- `GET /api/order/list` - Fetch all orders for the admin dashboard
- `POST /api/order/status` - Update order status

## Notes

- Product images are uploaded to Cloudinary.
- Orders include a fixed delivery fee in the current implementation.
- Authentication is token-based and stored in local storage on the client.

