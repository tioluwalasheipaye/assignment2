<?php
header("Content-Type: application/json");

$host = "localhost";
$dbname = "college";
$user = "root";
$password = "";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
    echo json_encode(["status" => "error"]);
    exit;
}

$firstName = isset($data["firstName"]) ? trim($data["firstName"]) : "";
$lastName  = isset($data["lastName"])  ? trim($data["lastName"])  : "";
$email     = isset($data["email"])     ? trim($data["email"])     : "";
$program   = isset($data["program"])   ? trim($data["program"])   : "";

if ($firstName === "" || $lastName === "" || $email === "" || $program === "") {
    echo json_encode(["status" => "error"]);
    exit;
}

if (strpos($email, "@") === false) {
    echo json_encode(["status" => "error"]);
    exit;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO students (firstName, lastName, email, program)
            VALUES (:firstName, :lastName, :email, :program)";

    $statement = $pdo->prepare($sql);
    $statement->execute([
        ":firstName" => $firstName,
        ":lastName"  => $lastName,
        ":email"     => $email,
        ":program"   => $program
    ]);

    echo json_encode(["status" => "success"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error"]);
}
