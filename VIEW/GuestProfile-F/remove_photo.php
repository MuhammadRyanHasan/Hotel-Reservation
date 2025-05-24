<?php
require_once('../../CONTROLLER/sessioncheck.php');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}


if (!isset($_SESSION['profile_photo']) || empty($_SESSION['profile_photo'])) {
    echo json_encode(['success' => false, 'message' => 'No profile photo to remove']);
    exit;
}

$photoPath = '../../' . $_SESSION['profile_photo'];


if (file_exists($photoPath)) {
    if (!unlink($photoPath)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to delete photo file']);
        exit;
    }
}


unset($_SESSION['profile_photo']);

echo json_encode(['success' => true, 'message' => 'Photo removed successfully']);
?>