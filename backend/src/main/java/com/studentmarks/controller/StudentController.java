package com.studentmarks.controller;

import com.studentmarks.model.Student;
import com.studentmarks.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*") // Allow React frontend + mobile access
public class StudentController {

    @Autowired
    private StudentService studentService;

    // ─────────────────────────────────────────
    // GET all students
    // ─────────────────────────────────────────
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // ─────────────────────────────────────────
    // GET student by ID
    // ─────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ─────────────────────────────────────────
    // POST - Normal insert
    // ─────────────────────────────────────────
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student saved = studentService.saveStudent(student);
        return ResponseEntity.ok(saved);
    }

    // ─────────────────────────────────────────
    // PUT - Update student
    // ─────────────────────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id,
                                                  @RequestBody Student updated) {
        return studentService.getStudentById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setSubject(updated.getSubject());
            existing.setMark(updated.getMark());
            return ResponseEntity.ok(studentService.saveStudent(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ─────────────────────────────────────────
    // DELETE - Remove student
    // ─────────────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(Map.of("message", "Student deleted successfully"));
    }

    
}
