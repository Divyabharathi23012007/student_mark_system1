# Student Mark System - Go Backend

A RESTful API built with Go, Gin framework, and GORM for managing student marks.

## Features

- Student management (CRUD operations)
- Mark management (CRUD operations)
- MySQL database with GORM ORM
- CORS support for frontend integration

## API Endpoints

### Students
- `POST /api/students` - Create a new student
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Marks
- `POST /api/marks` - Create a new mark
- `GET /api/marks` - Get all marks
- `GET /api/marks/student/:studentId` - Get marks for a specific student
- `PUT /api/marks/:id` - Update a mark
- `DELETE /api/marks/:id` - Delete a mark

## Setup

1. Install dependencies:
```bash
go mod tidy
```

2. Update database configuration in `config/database.go`:
   - Change the DSN string to match your MySQL credentials

3. Run the application:
```bash
go run cmd/main.go
```

The server will start on port 8080.

## Database Schema

### Students
- id (uint, primary key)
- name (string)
- email (string, unique)
- age (int)
- created_at, updated_at, deleted_at

### Marks
- id (uint, primary key)
- student_id (uint, foreign key)
- subject (string)
- score (int)
- max_score (int)
- created_at, updated_at, deleted_at
