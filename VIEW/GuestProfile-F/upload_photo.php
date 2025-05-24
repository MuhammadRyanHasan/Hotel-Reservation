<?php
require_once('../../CONTROLLER/sessioncheck.php');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

if (!isset($_FILES['profile_photo']) || $_FILES['profile_photo']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No file uploaded or upload error']);
    exit;
}

$file = $_FILES['profile_photo'];
$userEmail = $_SESSION['email']; 


$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed']);
    exit;
}


$maxSize = 5 * 1024 * 1024; 
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'File too large. Maximum size is 5MB']);
    exit;
}


$uploadDir = '../../ASSET/UPLOADS/profile_photos/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}


$fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
$fileName = 'profile_' . md5($userEmail . time()) . '.' . $fileExtension;
$filePath = $uploadDir . $fileName;


if (!move_uploaded_file($file['tmp_name'], $filePath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save file']);
    exit;
}

$_SESSION['profile_photo'] = 'ASSET/UPLOADS/profile_photos/' . $fileName;



echo json_encode([
    'success' => true, 
    'message' => 'Photo uploaded successfully',
    'photo_url' => 'ASSET/UPLOADS/profile_photos/' . $fileName
]);
?>