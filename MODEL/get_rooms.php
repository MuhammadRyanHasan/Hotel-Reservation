<?php
require_once('dbconnect.php'); 

header('Content-Type: application/json');

$hotelId = isset($_GET['hotel_id']) ? intval($_GET['hotel_id']) : 0;

$sql = "SELECT room_id, room_type, room_price, room_image FROM room WHERE hotel_id = $hotelId";
$result = $conn->query($sql);

$rooms = [];
while ($row = $result->fetch_assoc()) {
    $rooms[] = [
        'id' => $row['room_id'],
        'type' => $row['room_type'],
        'price' => $row['room_price'],
        'image' => $row['room_image']
    ];
}
echo json_encode($rooms);
?>