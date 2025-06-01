<?php
require_once('sessioncheck.php');


if (!isset($_SESSION['profile_photo']) || empty($_SESSION['profile_photo'])) {
    echo json_encode(['success' => false, 'message' => 'No photo to remove']);
    exit;
}


$photoPath = '../' . $_SESSION['profile_photo'];


if (file_exists($photoPath)) {
    if (unlink($photoPath)) {
       
        unset($_SESSION['profile_photo']);
        echo json_encode(['success' => true, 'message' => 'Photo removed successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete photo']);
    }
} else {
    
    unset($_SESSION['profile_photo']);
    echo json_encode(['success' => true, 'message' => 'Photo removed from profile']);
}
?>