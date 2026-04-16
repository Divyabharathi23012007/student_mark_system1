
CREATE DATABASE IF NOT EXISTS student_marks_db;
USE student_marks_db;

CREATE TABLE IF NOT EXISTS student (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)   NOT NULL,
    subject    VARCHAR(100)   NOT NULL,
    mark       DOUBLE         NOT NULL,
    created_at DATETIME       DEFAULT CURRENT_TIMESTAMP
);



SELECT * FROM student;
