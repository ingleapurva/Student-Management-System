# Student Management System

A full-stack web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) for managing student records. Features a clean, responsive dashboard with full CRUD operations, search, filtering, and statistics.

## 🚀 Features

- **Student Management**: Add, view, edit, and delete student records
- **Dashboard**: Overview statistics (total students, departments, courses) with recent students
- **Search & Filter**: Search by name/email/ID, filter by department and course
- **Responsive Design**: Works on desktop and mobile devices
- **Validation**: Frontend and backend validation with user-friendly error messages
- **Confirmation Dialogs**: Safe delete operations with confirmation
- **Loading & Empty States**: Smooth UX with proper feedback

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Custom styling (no UI frameworks)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **nodemon** - Development auto-reload

## 📁 Folder Structure

```
student-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── studentController.js  # Business logic
│   ├── models/
│   │   └── Student.js         # Mongoose schema
│   ├── routes/
│   │   └── studentRoutes.js   # API routes
│   ├── middleware/
│   │   └── errorMiddleware.js # Global error handling
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── StudentForm.jsx    # Add/Edit form
│   │   │   └── StudentTable.jsx   # Students list table
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Stats + recent students
│   │   │   ├── Students.jsx       # List with search/filter
│   │   │   ├── AddStudent.jsx     # Add new student
│   │   │   ├── EditStudent.jsx    # Edit existing student
│   │   │   └── StudentDetails.jsx # View student details
│   │   ├── services/
│   │   │   └── studentService.js  # API calls
│   │   ├── App.jsx              # Routes & layout
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### Prerequisites
- **Node.js** v18+ and npm
- **MongoDB** running locally or MongoDB Atlas connection string

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-management
```

### Frontend Setup

```bash
cd frontend
npm install
```

## ▶️ Running the Project

### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Server runs at `http://localhost:5000`

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
App runs at `http://localhost:3000`

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students (with search, filter, pagination) |
| GET | `/api/students/:id` | Get single student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/students/stats/dashboard` | Get dashboard statistics |
| GET | `/api/students/filters/options` | Get unique departments & courses |

### Query Parameters (GET /api/students)
| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search by name, email, or student ID |
| `department` | string | Filter by department |
| `course` | string | Filter by course |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |

## 📝 Student Data Model

```javascript
{
  studentId: String,      // Unique, required
  fullName: String,       // Required
  email: String,          // Unique, required, valid email
  phone: String,          // Required
  dateOfBirth: Date,      // Required
  gender: String,         // Required: Male/Female/Other
  course: String,         // Required
  department: String,     // Required
  year: Number,           // Required: 1-5
  address: String,        // Required
  enrollmentDate: Date,   // Required, defaults to now
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

## 🧪 API Testing Examples

### Create Student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STU2024001",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555 123 4567",
    "dateOfBirth": "2000-05-15",
    "gender": "Male",
    "course": "Computer Science",
    "department": "Engineering",
    "year": 2,
    "address": "123 Main St, City, State 12345",
    "enrollmentDate": "2023-09-01"
  }'
```

### Get All Students
```bash
curl http://localhost:5000/api/students
```

### Search Students
```bash
curl "http://localhost:5000/api/students?search=john&department=Engineering&page=1&limit=5"
```

### Get Dashboard Stats
```bash
curl http://localhost:5000/api/students/stats/dashboard
```

### Update Student
```bash
curl -X PUT http://localhost:5000/api/students/STUDENT_ID \
  -H "Content-Type: application/json" \
  -d '{"year": 3, "phone": "+1 555 987 6543"}'
```

### Delete Student
```bash
curl -X DELETE http://localhost:5000/api/students/STUDENT_ID
```

## 🐛 Common Errors & Solutions

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running
- Local: `mongod` or start MongoDB service
- Atlas: Check connection string and IP whitelist

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in `.env` or kill process using port 5000

### CORS Error
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' blocked by CORS policy
```
**Solution**: Ensure backend has `cors()` middleware enabled (already configured)

### Module Not Found
```
Error: Cannot find module 'xyz'
```
**Solution**: Run `npm install` in both backend and frontend directories

### Duplicate Key Error
```
Student ID already exists / Email already exists
```
**Solution**: Use unique student ID and email for each student

### Validation Errors
```
Student ID is required, Email is required, etc.
```
**Solution**: Fill all required fields with valid data

## 🔮 Future Improvements

- [ ] User authentication & authorization
- [ ] Role-based access (Admin, Teacher, Student)
- [ ] Student profile photos
- [ ] Export to CSV/PDF
- [ ] Bulk import/export
- [ ] Email notifications
- [ ] Attendance tracking
- [ ] Grade management
- [ ] Dark mode toggle
- [ ] Unit & integration tests
- [ ] Docker support
- [ ] CI/CD pipeline

## 📄 License

This project is open-source and available for educational purposes.

## 👨‍💻 Author

Built as a beginner-friendly MERN stack project for learning full-stack development.