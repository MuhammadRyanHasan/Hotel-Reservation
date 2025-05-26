<?php
require_once('dbconnect.php');
header('Content-Type: application/json');

$hotelId = isset($_GET['hotel_id']) ? intval($_GET['hotel_id']) : 0;


$sql = "SELECT a.amenities_id, a.amenity_name, a.amenity_description, a.weekday_hours, a.weekend_hours, a.amenities_type
        FROM amenities a
        JOIN hotel_amenities ha ON a.amenities_id = ha.amenities_id
        WHERE ha.hotel_id = $hotelId";
$result = $conn->query($sql);

$amenities = [];
while ($row = $result->fetch_assoc()) {
    $amenities[] = [
        'id' => $row['amenities_id'],
        'name' => $row['amenity_name'],
        'description' => $row['amenity_description'],
        'weekday_hours' => $row['weekday_hours'],
        'weekend_hours' => $row['weekend_hours'],
        'amenities_type' => $row['amenities_type']
    ];
}
echo json_encode($amenities);
?>