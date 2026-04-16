# 🎓 Student Mark System

> React · Spring Boot · MySQL — with Java Thread Threat Simulation

---

## 📁 Project Structure

```
student-mark-system/
├── backend/               ← Spring Boot (Java 17)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/studentmarks/
│       │   ├── StudentMarksApplication.java
│       │   ├── controller/StudentController.java
│       │   ├── model/Student.java
│       │   ├── repository/StudentRepository.java
│       │   └── service/StudentService.java
│       └── resources/
│           └── application.properties
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

### Step 2 — Backend (Spring Boot)

1. Open **VS Code**
2. Install the **Extension Pack for Java** from the Extensions marketplace (if not installed)
3. Open the `backend/` folder: `File → Open Folder → student-mark-system/backend`
4. Edit `src/main/resources/application.properties`:
   ```
   spring.datasource.password=your_actual_mysql_password
   ```
5. Run the application:
   - Click the `▶ Run` button above the `main()` method in `StudentMarksApplication.java`
   - OR use the terminal: `./mvnw spring-boot:run`
6. You should see: `Started StudentMarksApplication on port 8080`

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

## ⚡ Thread Threats

### Threat 1 — Auto-Delete
- Fill in student name, subject, mark
- Click **"Threat 1 — Insert & Auto-Delete"**
- Record appears in the table
- After **2 seconds**, a background Java thread deletes the record
- Watch the table auto-refresh every 3 seconds

### Threat 2 — Mark Manipulation
- Fill in student name, subject, mark
- Click **"Threat 2 — Insert & Manipulate Mark"**
- Record appears with original mark
- After **2 seconds**, a background Java thread **halves the mark**
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
| POST   | /api/students/threat1 | Insert + auto-delete via thread |
| POST   | /api/students/threat2 | Insert + manipulate mark via thread |

---

## 🛠 Requirements

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.8+ (bundled in Spring Boot) |
| Node.js | 18+ |
| MySQL | 8.0+ |
| VS Code | Any recent version |

**VS Code Extensions recommended:**
- Extension Pack for Java
- Spring Boot Extension Pack
- ES7+ React/Redux/React-Native snippets

---

## ❓ Troubleshooting

**Backend won't start:**
- Check MySQL is running
- Check password in `application.properties`
- Make sure `student_marks_db` database exists

**Frontend can't reach backend:**
- Ensure Spring Boot is running on port 8080
- Check browser console for CORS errors (should not happen — CORS is enabled)

**Mobile can't reach backend:**
- Ensure phone and PC are on the same WiFi
- Use PC's local IP (not `localhost`)
- Disable Windows Firewall temporarily for port 8080 if needed
