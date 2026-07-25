CREATE DATABASE IF NOT EXISTS college;

USE college;

CREATE TABLE IF NOT EXISTS students (
    studentID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100),
    program VARCHAR(100)
);

INSERT INTO students (firstName, lastName, email, program) VALUES
('Mary', 'Karim', 'mary.karim@college.edu', 'Computer Science'),
('Rahul', 'Tylor', 'rahul.tylor@college.edu', 'Software Engineering');
