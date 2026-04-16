-- ============================================
-- Student Mark System - MySQL Setup Script
-- Run this in MySQL Workbench before starting
-- the Spring Boot backend.
-- ============================================

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS student_marks_db;
USE student_marks_db;

-- 2. Create the student table
CREATE TABLE IF NOT EXISTS student (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)   NOT NULL,
    subject    VARCHAR(100)   NOT NULL,
    mark       DOUBLE         NOT NULL,
    created_at DATETIME       DEFAULT CURRENT_TIMESTAMP
);

-- 3. Seed some sample data (optional)
INSERT INTO student (name, subject, mark) VALUES
    ('Arjun',   'Mathematics',  88.0),
    ('Sharma',  'Physics',       74.5),
    ('Ravi',    'IT',     91.0),
    ('Sneha',   'DAA',       65.0),
    ('Karthik',  'Computer Science', 96.5);

-- 4. Verify
SELECT * FROM student;
