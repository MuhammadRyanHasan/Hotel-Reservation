<?php
require_once('sessioncheck.php');


if (!isset($_FILES['profile_photo'])) {
    echo json_encode(['success' => false, 'message' => 'No file uploaded']);
    exit;
}

$src = $_FILES['profile_photo']['tmp_name'];
$originalName = $_FILES['profile_photo']['name'];


$ext = explode('.', $originalName);
$extension = strtolower(end($ext));


$allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
if (!in_array($extension, $allowedExt)) {
    echo json_encode(['success' => false, 'message' => 'Only image files allowed']);
    exit;
}


if ($_FILES['profile_photo']['size'] > 5 * 1024 * 1024) {
    echo json_encode(['success' => false, 'message' => 'File too large. Max 5MB']);
    exit;
}


$uploadDir = '../ASSET/UPLOADS/profile_photos/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}


$userEmail = $_SESSION['email'];
$filename = 'profile_' . md5($userEmail . time()) . '.' . $extension;
$des = $uploadDir . $filename;


if (move_uploaded_file($src, $des)) {
    
    $_SESSION['profile_photo'] = 'ASSET/UPLOADS/profile_photos/' . $filename;
    
    echo json_encode([
        'success' => true, 
        'message' => 'Photo uploaded successfully',
        'photo_url' => 'ASSET/UPLOADS/profile_photos/' . $filename
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Upload failed']);
}
?>