<?php
require_once('dbconnect.php');
header('Content-Type: application/json');

$sql = "SELECT amenities_id, amenity_name, amenity_description, weekday_hours, weekend_hours FROM amenities";
$result = $conn->query($sql);

$amenities = [];
while ($row = $result->fetch_assoc()) {
    $amenities[] = [
        'id' => $row['amenities_id'],
        'name' => $row['amenity_name'],
        'description' => $row['amenity_description'],
        'weekday_hours' => $row['weekday_hours'],
        'weekend_hours' => $row['weekend_hours']
    ];
}
echo json_encode($amenities);
?>