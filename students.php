<?php
header("Content-Type: application/json");

// XAMPP defaults
$host = "localhost";
$dbname = "college";
$user = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT studentID, firstName, lastName, email, program
            FROM students
            ORDER BY studentID";

    $statement = $pdo->query($sql);
    $students = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($students);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([]);
}
