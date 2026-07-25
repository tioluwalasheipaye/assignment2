-- Student registration database
-- Run in phpMyAdmin or:  mysql -u root < database.sql

CREATE DATABASE IF NOT EXISTS college;

USE college;

CREATE TABLE IF NOT EXISTS students (
    studentID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100),
    program VARCHAR(100)
);

-- Sample rows (optional)
INSERT INTO students (firstName, lastName, email, program) VALUES
('Alice', 'Nguyen', 'alice.nguyen@college.edu', 'Computer Science'),
('Ben', 'Carter', 'ben.carter@college.edu', 'Business Administration');
