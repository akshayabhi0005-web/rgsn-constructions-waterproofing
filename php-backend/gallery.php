<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Helper to save base64 image data to files
function saveBase64Image($base64String, $prefix = 'gallery_') {
    if (!preg_match('/^data:image\/(\w+);base64,/', $base64String, $type)) {
        return $base64String; // Return original if not base64
    }
    
    $image_data = base64_decode(substr($base64String, strpos($base64String, ',') + 1));
    $image_type = strtolower($type[1]);
    
    if ($image_data === false || !in_array($image_type, ['jpg', 'jpeg', 'gif', 'png'])) {
        return $base64String;
    }

    $upload_dir = 'uploads/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $file_name = $prefix . uniqid() . '.' . $image_type;
    $file_path = $upload_dir . $file_name;

    if (file_put_contents($file_path, $image_data)) {
        return 'php-backend/' . $file_path;
    }
    return $base64String;
}

if ($method === 'GET') {
    // Fetch all gallery items
    try {
        $stmt = $conn->query("SELECT * FROM gallery ORDER BY id DESC");
        $gallery = $stmt->fetchAll();
        
        // Return JSON list
        echo json_encode([
            "status" => "success",
            "data" => $gallery
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Failed to fetch gallery: " . $e->getMessage()
        ]);
    }
} elseif ($method === 'POST') {
    // Insert new gallery photo
    $rawInput = file_get_contents("php://input");
    $input = json_decode($rawInput, true);
    
    if (!$input) {
        $input = $_POST;
    }

    $category = isset($input['category']) ? trim($input['category']) : 'completed';
    $title = isset($input['title']) ? trim($input['title']) : '';
    $description = isset($input['description']) ? trim($input['description']) : '';
    $is_before_after = isset($input['is_before_after']) ? (int)$input['is_before_after'] : 0;
    
    $src = isset($input['src']) ? trim($input['src']) : '';
    $before_src = isset($input['before_src']) ? trim($input['before_src']) : '';
    $after_src = isset($input['after_src']) ? trim($input['after_src']) : '';

    if (empty($title) || empty($description)) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Missing required gallery fields."
        ]);
        exit();
    }

    // Process images
    if ($is_before_after) {
        if (empty($before_src) || empty($after_src)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Before and After images are both required."]);
            exit();
        }
        $before_src = saveBase64Image($before_src, 'before_');
        $after_src = saveBase64Image($after_src, 'after_');
        $src = $after_src; // Primary source points to completed
    } else {
        if (empty($src)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Image source is required."]);
            exit();
        }
        $src = saveBase64Image($src, 'gallery_');
    }

    try {
        $query = "INSERT INTO gallery (category, title, description, src, is_before_after, before_src, after_src) 
                  VALUES (:category, :title, :description, :src, :is_before_after, :before_src, :after_src)";
        $stmt = $conn->prepare($query);
        
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':src', $src);
        $stmt->bindParam(':is_before_after', $is_before_after, PDO::PARAM_INT);
        $stmt->bindParam(':before_src', $before_src);
        $stmt->bindParam(':after_src', $after_src);
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Gallery item added successfully!",
                "gallery_id" => $conn->lastInsertId()
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Failed to add gallery item."
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
