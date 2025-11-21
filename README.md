# E-commerce API

A simple Node.js + Express.js E-commerce API with Firebase Authentication.
Supports product management and role-based access control.

## Features

CRUD operations for products

Upload product images (up to 2)

Role-based access (admin, manager)

Firebase Authentication

## Setup / Usage Instructions

1. Clone the repository

git clone <your-repo-url>
cd <your-repo-folder>

2. Install dependencies

npm install

3. Configure Firebase and Set environment variables

-Example .env file:

NODE_ENV=development
PORT=3000
FIREBASE_API_KEY=<your_api_key>
FIREBASE_AUTH_DOMAIN=<your_project>.firebaseapp.com
FIREBASE_PROJECT_ID=<your_project_id>
FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
SWAGGER_SERVER_URL=http://localhost:3000/api/v1

4. Run the server

npm run dev

5. Access API

Base URL: http://localhost:3000/api/v1

Use a valid Firebase ID token in the Authorization header:

Authorization: Bearer <your_firebase_id_token>

## Roles

admin /admin/setCustomClaims

manager /products (POST, PUT, DELETE)

user /products, /products/:id (GET)

## Endpoints

1. Set Custom Claims (Admin)

POST /api/v1/admin/setCustomClaims

2. Create Product (Manager)

POST /api/v1/products

3. Get All Products

GET /products

4. Get Product by ID

GET /products/:id

5. Update Product (Manager)

PUT /products/:id

6. Delete Product (Manager)

DELETE /products/:id

## Notes

Maximum 2 images per product

Role-based authorization is required for protected routes

Ensure Firebase tokens are valid
