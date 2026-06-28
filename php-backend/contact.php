<?php
// Include database connection and headers
require_once 'db.php';

// Check if request is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method Not Allowed. Only POST requests are accepted."
    ]);
    exit();
}

// Get raw JSON input
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

// If raw input is empty, fall back to $_POST variables (form data format)
if (!$input) {
    $input = $_POST;
}

// Basic input validation
$name = isset($input['name']) ? trim($input['name']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$service = isset($input['service']) ? trim($input['service']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

if (empty($name) || empty($phone) || empty($service) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Required fields are missing. Please provide name, phone, service, and message."
    ]);
    exit();
}

try {
    // Insert into database
    $query = "INSERT INTO inquiries (name, phone, email, service, message) VALUES (:name, :phone, :email, :service, :message)";
    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':service', $service);
    $stmt->bindParam(':message', $message);
    
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            "status" => "success",
            "message" => "Thank you! Your quote request has been saved.",
            "inquiry_id" => $conn->lastInsertId()
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Failed to save submission. Please try again."
        ]);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database operation failed: " . $e->getMessage()
    ]);
}
?>
