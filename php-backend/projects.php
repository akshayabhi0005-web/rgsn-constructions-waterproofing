<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all projects
    try {
        $stmt = $conn->query("SELECT * FROM projects ORDER BY id DESC");
        $projects = $stmt->fetchAll();
        
        // Return projects list
        echo json_encode([
            "status" => "success",
            "data" => $projects
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Failed to fetch projects: " . $e->getMessage()
        ]);
    }
} elseif ($method === 'POST') {
    // Add a new project
    $rawInput = file_get_contents("php://input");
    $input = json_decode($rawInput, true);
    
    if (!$input) {
        $input = $_POST;
    }

    $category = isset($input['category']) ? trim($input['category']) : '';
    $name = isset($input['name']) ? trim($input['name']) : '';
    $location = isset($input['location']) ? trim($input['location']) : '';
    $date = isset($input['date']) ? trim($input['date']) : '';
    $description = isset($input['description']) ? trim($input['description']) : '';
    $scope = isset($input['scope']) ? trim($input['scope']) : ''; // expects comma separated string
    $image = isset($input['image']) ? trim($input['image']) : ''; // expects base64 or path

    if (empty($category) || empty($name) || empty($location) || empty($date) || empty($description) || empty($image)) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Missing required project fields."
        ]);
        exit();
    }

    // Process base64 image upload if applicable and save to 'uploads' folder
    if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
        $image_data = substr($image, strpos($image, ',') + 1);
        $image_type = strtolower($type[1]); // jpg, png, gif

        if (!in_array($image_type, ['jpg', 'jpeg', 'gif', 'png'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid image type."]);
            exit();
        }

        $image_data = base64_decode($image_data);
        if ($image_data === false) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Image decode failed."]);
            exit();
        }

        // Create uploads folder if missing
        $upload_dir = 'uploads/';
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        $file_name = 'project_' . uniqid() . '.' . $image_type;
        $file_path = $upload_dir . $file_name;

        if (file_put_contents($file_path, $image_data)) {
            // Save the relative server file path
            $image = 'php-backend/' . $file_path;
        }
    }

    try {
        $query = "INSERT INTO projects (category, name, location, date, description, scope, image) VALUES (:category, :name, :location, :date, :description, :scope, :image)";
        $stmt = $conn->prepare($query);
        
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':scope', $scope);
        $stmt->bindParam(':image', $image);
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "New project added successfully!",
                "project_id" => $conn->lastInsertId()
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to add project."
            ]);
        }
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Database error: " . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method Not Allowed."
    ]);
}
?>
