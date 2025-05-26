<?php
require_once('dbconnect.php');

// --- HOTEL CRUD ---
function getHotels() {
    global $conn;
    $res = $conn->query("SELECT * FROM hotel");
    return $res ? $res->fetch_all(MYSQLI_ASSOC) : [];
}
function addHotel($name, $location, $rating) {
    global $conn;
    $stmt = $conn->prepare("INSERT INTO hotel (hotel_name, hotel_location, hotel_rating) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $name, $location, $rating);
    $stmt->execute();
}
function editHotel($id, $name, $location, $rating) {
    global $conn;
    $stmt = $conn->prepare("UPDATE hotel SET hotel_name=?, hotel_location=?, hotel_rating=? WHERE hotel_id=?");
    $stmt->bind_param("ssdi", $name, $location, $rating, $id);
    $stmt->execute();
}
function deleteHotel($id) {
    global $conn;
    $stmt = $conn->prepare("DELETE FROM hotel WHERE hotel_id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
}

// --- ROOM CRUD ---
function getRooms() {
    global $conn;
    $res = $conn->query("SELECT r.*, h.hotel_name FROM room r JOIN hotel h ON r.hotel_id = h.hotel_id");
    return $res ? $res->fetch_all(MYSQLI_ASSOC) : [];
}
function addRoom($hotel_id, $type, $price, $image) {
    global $conn;
    $stmt = $conn->prepare("INSERT INTO room (hotel_id, room_type, room_price, room_image) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isds", $hotel_id, $type, $price, $image);
    $stmt->execute();
}
function editRoom($id, $hotel_id, $type, $price, $image) {
    global $conn;
    $stmt = $conn->prepare("UPDATE room SET hotel_id=?, room_type=?, room_price=?, room_image=? WHERE room_id=?");
    $stmt->bind_param("isdsi", $hotel_id, $type, $price, $image, $id);
    $stmt->execute();
}
function deleteRoom($id) {
    global $conn;
    $stmt = $conn->prepare("DELETE FROM room WHERE room_id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
}

// --- AMENITY CRUD ---
function getAmenities() {
    global $conn;
    $res = $conn->query("SELECT * FROM amenities");
    return $res ? $res->fetch_all(MYSQLI_ASSOC) : [];
}
function addAmenity($name, $desc, $type, $wh, $weh) {
    global $conn;
    $stmt = $conn->prepare("INSERT INTO amenities (amenity_name, amenity_description, amenities_type, weekday_hours, weekend_hours) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $desc, $type, $wh, $weh);
    $stmt->execute();
}
function editAmenity($id, $name, $desc, $type, $wh, $weh) {
    global $conn;
    $stmt = $conn->prepare("UPDATE amenities SET amenity_name=?, amenity_description=?, amenities_type=?, weekday_hours=?, weekend_hours=? WHERE amenities_id=?");
    $stmt->bind_param("sssssi", $name, $desc, $type, $wh, $weh, $id);
    $stmt->execute();
}
function deleteAmenity($id) {
    global $conn;
    $stmt = $conn->prepare("DELETE FROM amenities WHERE amenities_id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
}

// --- HANDLE POST REQUESTS ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $entity = $_POST['entity'] ?? '';
    $action = $_POST['action'] ?? '';
    if ($entity === 'hotel') {
        if ($action === 'add') addHotel($_POST['hotel_name'], $_POST['hotel_location'], $_POST['hotel_rating']);
        if ($action === 'edit') editHotel($_POST['hotel_id'], $_POST['hotel_name'], $_POST['hotel_location'], $_POST['hotel_rating']);
        if ($action === 'delete') deleteHotel($_POST['hotel_id']);
        header(header: "Location: ../../VIEW/Dashboard-F/admin_crud.php");
        exit();
    }
    if ($entity === 'room') {
        if ($action === 'add') addRoom($_POST['hotel_id'], $_POST['room_type'], $_POST['room_price'], $_POST['room_image']);
        if ($action === 'edit') editRoom($_POST['room_id'], $_POST['hotel_id'], $_POST['room_type'], $_POST['room_price'], $_POST['room_image']);
        if ($action === 'delete') deleteRoom($_POST['room_id']);
        header("Location: ../../VIEW/Dashboard-F/admin_crud.php");
        exit();
    }
    if ($entity === 'amenity') {
        if ($action === 'add') addAmenity($_POST['amenity_name'], $_POST['amenity_description'], $_POST['amenities_type'], $_POST['weekday_hours'], $_POST['weekend_hours']);
        if ($action === 'edit') editAmenity($_POST['amenities_id'], $_POST['amenity_name'], $_POST['amenity_description'], $_POST['amenities_type'], $_POST['weekday_hours'], $_POST['weekend_hours']);
        if ($action === 'delete') deleteAmenity($_POST['amenities_id']);
        header("Location: ../../VIEW/Dashboard-F/admin_crud.php");
        exit();
    }
}