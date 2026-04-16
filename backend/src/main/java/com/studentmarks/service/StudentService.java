package com.studentmarks.service;

import com.studentmarks.model.Student;
import com.studentmarks.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Thread pool for running background threats
    private final ExecutorService executorService = Executors.newCachedThreadPool();

    // ─────────────────────────────────────────────
    // CRUD
    // ─────────────────────────────────────────────

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    
}
