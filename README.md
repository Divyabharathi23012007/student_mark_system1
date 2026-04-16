# 🎓 Student Mark System

> React · Go (Gin) · MySQL — with Java Thread Threat Simulation

---

## 📁 Project Structure

```
student-mark-system/
|   backend/               Go (Gin Framework)
|   |   go.mod
|   |   cmd/
|   |   |   main.go
|   |   models/
|   |   |   student.go
|   |   handlers/
|   |   |   student_handler.go
|   |   |   mark_handler.go
|   |   config/
|   |   |   database.go
├── frontend/              ← React (Node 18+)
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
├── database/
│   └── setup.sql          ← Run this first in MySQL Workbench
└── README.md
```

---

## 🚀 Step-by-Step Setup

### Step 1 — MySQL Setup

1. Open **MySQL Workbench**
2. Connect to your local MySQL server
3. Open `database/setup.sql`
4. Run the entire script (Ctrl+Shift+Enter)
5. You should see the `student_marks_db` database created with sample data

---

### Step 2 — Backend (Go)

1. Open **VS Code**
2. Install the **Go extension** from the Extensions marketplace (if not installed)
3. Open the `backend/` folder: `File → Open Folder → student-mark-system/backend`
4. Edit `config/database.go` and update the DSN string with your MySQL credentials:
   ```go
   dsn := "user:password@tcp(localhost:3306)/student_marks?charset=utf8mb4&parseTime=True&loc=Local"
   ```
5. Install dependencies:
   ```bash
   go mod tidy
   ```
6. Run the application:
   ```bash
   go run cmd/main.go
   ```
7. You should see: `Server starting on port 8080...`

**Test it:**
Open browser → `http://localhost:8080/api/students` — you should see JSON data.

---

### Step 3 — Frontend (React)

1. Open a **new VS Code window** (or new terminal)
2. Open the `frontend/` folder
3. Open the terminal (Ctrl+`) and run:
   ```bash
   npm install
   npm start
   ```
4. Browser opens at `http://localhost:3000`

---

##  Thread Threats

### Threat 1  Auto-Delete
- Fill in student name, subject, mark
- Click **"Threat 1  Insert & Auto-Delete"**
- Record appears in the table
- After **2 seconds**, a background goroutine deletes the record
- Watch the table auto-refresh every 3 seconds

### Threat 2  Mark Manipulation
- Fill in student name, subject, mark
- Click **"Threat 2  Insert & Manipulate Mark"**
- Record appears with original mark
- After **2 seconds**, a background goroutine **halves the mark**
- Watch the mark change in the table

---

## 📱 Trigger Threats from Mobile

Make sure your phone and PC are on the **same WiFi network**.

1. Find your PC's local IP:
   - Windows: open CMD → type `ipconfig` → look for **IPv4 Address**
   - Mac/Linux: `ifconfig | grep inet`
   - Example: `192.168.1.45`

2. Install **Postman** on your mobile (free on App Store / Play Store)

3. Create a POST request:
   ```
   URL:  http://192.168.1.45:8080/api/students/threat1
   Body: raw → JSON
   {
     "name": "Mobile Test",
     "subject": "Physics",
     "mark": 80
   }
   ```

4. Hit **Send** — watch the React table update!

---

## 🔌 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET    | /api/students | Get all students |
| GET    | /api/students/{id} | Get student by ID |
| POST   | /api/students | Add student (normal) |
| PUT    | /api/students/{id} | Update student |
| DELETE | /api/students/{id} | Delete student |
| GET    | /api/marks | Get all marks |
| GET    | /api/marks/student/{studentId} | Get marks for specific student |
| POST   | /api/marks | Add mark |
| PUT    | /api/marks/{id} | Update mark |
| DELETE | /api/marks/{id} | Delete mark |
| POST   | /api/students/threat1 | Insert + auto-delete via goroutine |
| POST   | /api/students/threat2 | Insert + manipulate mark via goroutine |

---

## 🛠 Requirements

| Tool | Version |
|------|---------|
| Go | 1.21+ |
| Node.js | 18+ |
| MySQL | 8.0+ |
| VS Code | Any recent version |

**VS Code Extensions recommended:**
- Go (official Go extension)
- ES7+ React/Redux/React-Native snippets

---

## ❓ Troubleshooting

**Backend won't start:**
- Check MySQL is running
- Check database credentials in `config/database.go`
- Make sure `student_marks` database exists
- Run `go mod tidy` to install dependencies

**Frontend can't reach backend:**
- Ensure Go server is running on port 8080
- Check browser console for CORS errors (should not happen  CORS is enabled)

**Mobile can't reach backend:**
- Ensure phone and PC are on the same WiFi
- Use PC's local IP (not `localhost`)
- Disable Windows Firewall temporarily for port 8080 if needed
