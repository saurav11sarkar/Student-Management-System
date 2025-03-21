Here’s a detailed and user-friendly `README.md` file for your **Student Management System** project. This README provides an overview of the project, setup instructions, API documentation, and other relevant details.

---

# Student Management System

The **Student Management System** is a backend application built with **Node.js**, **Express**, and **MongoDB**. It allows administrators and teachers to manage student records, including creating, updating, retrieving, and deleting student information. The system also includes user authentication and authorization features.

---

## Features

1. **User Authentication**:

   - Sign up and log in for administrators and teachers.
   - JWT-based authentication with secure cookies.

2. **Student Management**:

   - Create, update, retrieve, and delete student records.
   - Filter, sort, and paginate student data.

3. **Role-Based Access Control**:

   - Admins can manage all students.
   - Teachers can only manage students they created.

4. **Validation**:

   - Input validation using **Zod** for both user and student data.

5. **Environment Configuration**:
   - Secure environment variables for database connection, JWT secrets, and more.

---

## Technologies Used

- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling.
- **Zod**: Schema validation.
- **Bcrypt**: Password hashing.
- **JSON Web Token (JWT)**: Authentication.
- **CORS**: Cross-Origin Resource Sharing.
- **Dotenv**: Environment variable management.
- **Cookie-Parser**: Cookie handling.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **Postman** or any API testing tool (for testing endpoints)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/saurav11sarkar/Student-Management-System.git
cd student-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NODE_ENV=production
PORT=8080
DB_URL=mongodb+srv://<username>:<password>@cluster0.uzsuh.mongodb.net/student-management?retryWrites=true&w=majority
SALT_ROUNDS=10
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1d
```

Replace `<username> "selopia"` and `<password> "selopia123"` with your MongoDB credentials.

### 4. Run the Application

```bash
npm start
```

The server will start on the specified port (default: `8080`).

---

## API Documentation

### Base URL

```
http://localhost:8080/
<!-- Live deployment -->
https://student-management-api-theta.vercel.app/
```

### Authentication

#### Sign Up (Create User)

- **Endpoint**: `POST /signup`
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "admin123",
    "role": "admin"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "_id": "64f1a2b3c9e8b4a3f4e5d6c7",
      "username": "admin",
      "role": "admin"
    }
  }
  ```

#### Log In

- **Endpoint**: `POST /login`
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "64f1a2b3c9e8b4a3f4e5d6c7",
        "username": "admin",
        "role": "admin"
      }
    }
  }
  ```

### Student Management

#### Create Student

- **Endpoint**: `POST /students/`
- **Headers**: `Authorization:  <token>`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "age": 15,
    "grade": "10th",
    "student_photo": "https://example.com/photo.jpg",
    "student_description": "A brilliant student.",
    "createdBy": "64f1a2b3c9e8b4a3f4e5d6c7"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Student created successfully",
    "data": {
      "_id": "64f1a2b3c9e8b4a3f4e5d6c8",
      "name": "John Doe",
      "age": 15,
      "grade": "10th",
      "student_photo": "https://example.com/photo.jpg",
      "student_description": "A brilliant student.",
      "createdBy": "64f1a2b3c9e8b4a3f4e5d6c7"
    }
  }
  ```

#### Get All Students

- **Endpoint**: `GET /students/`
- **Headers**: `Authorization:  <token>`
- **Query Parameters**:
  - `search`: Search by name, grade, or description.
  - `sort`: Sort by fields (e.g., `name`, `age`).
  - `page`: Pagination page number.
  - `limit`: Number of items per page.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Students retrieved successfully",
    "data": {
      "total": 10,
      "totalPage": 2,
      "result": [
        {
          "_id": "64f1a2b3c9e8b4a3f4e5d6c8",
          "name": "John Doe",
          "age": 15,
          "grade": "10th",
          "student_photo": "https://example.com/photo.jpg",
          "student_description": "A brilliant student.",
          "createdBy": "64f1a2b3c9e8b4a3f4e5d6c7"
        }
      ]
    }
  }
  ```

#### Get Single Student

- **Endpoint**: `GET /students/:id`
- **Headers**: `Authorization:  <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Student retrieved successfully",
    "data": {
      "_id": "64f1a2b3c9e8b4a3f4e5d6c8",
      "name": "John Doe",
      "age": 15,
      "grade": "10th",
      "student_photo": "https://example.com/photo.jpg",
      "student_description": "A brilliant student.",
      "createdBy": "64f1a2b3c9e8b4a3f4e5d6c7"
    }
  }
  ```

#### Update Student

- **Endpoint**: `PUT /students/:id`
- **Headers**: `Authorization:  <token>`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "age": 16
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Student updated successfully",
    "data": {
      "_id": "64f1a2b3c9e8b4a3f4e5d6c8",
      "name": "Jane Doe",
      "age": 16,
      "grade": "10th",
      "student_photo": "https://example.com/photo.jpg",
      "student_description": "A brilliant student.",
      "createdBy": "64f1a2b3c9e8b4a3f4e5d6c7"
    }
  }
  ```

#### Delete Student

- **Endpoint**: `DELETE /students/:id`
- **Headers**: `Authorization:  <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Student deleted successfully",
    "data": null
  }
  ```

---

## Error Handling

The API returns structured error responses for invalid requests or server errors. Example:

```json
{
  "success": false,
  "message": "Route not found",
  "errorMessages": [
    {
      "path": "/invalid-route",
      "message": "API not found"
    }
  ]
}
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or feedback, please contact:

- **Your Name**: [sarkar15-4285@diu.edu.bd](mailto:sarkar15-4285@diu.edu.bd)
- **GitHub**: [https://github.com/saurav11sarkar](https://github.com/saurav11sarkar)
- **Live deployment link**: [https://student-management-api-theta.vercel.app/](https://student-management-api-theta.vercel.app/)

---

Enjoy managing your students with this system! 🚀
