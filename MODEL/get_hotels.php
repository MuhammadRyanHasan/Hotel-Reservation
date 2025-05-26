<?php
require_once('dbconnect.php'); 

header('Content-Type: application/json');

$sql = "SELECT hotel_id, hotel_name, hotel_location, hotel_rating FROM hotel";
$result = $conn->query($sql);

$hotels = [];


if ($result === false) {
    echo json_encode(['error' => $conn->error]);
    exit;
}

while ($row = $result->fetch_assoc()) {
    $hotels[] = [
        'id' => $row['hotel_id'],
        'name' => $row['hotel_name'],
        'location' => $row['hotel_location'],
        'rating' => (float)$row['hotel_rating'],
        
    ];
}
echo json_encode($hotels);
?>