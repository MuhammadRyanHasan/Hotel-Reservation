<?php
require_once('../../CONTROLLER/sessioncheck.php');
echo "Welcome, " . htmlspecialchars($_SESSION['email']);

$hotelId = isset($_GET['hotel_id']) ? intval($_GET['hotel_id']) : 0;
?>




<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Room Types - Hotel Reservation</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
  <link rel="stylesheet" href="../../ASSET/CSS/Roomtypes-F/roomtypes.css">
</head>
<body>
  <div class="container">
    <h1>Explore Our Rooms</h1>

    <div class="filters">
      <button data-type="all" class="active">All</button>
      <button data-type="standard">Standard</button>
      <button data-type="deluxe">Deluxe</button>
      <button data-type="suite">Suite</button>
    </div>

    <div id="room-gallery" class="gallery"></div>
    <div class="panorama" id="panorama" style="width: 100%; height: 400px;"></div>

    <h2>Amenity Comparison</h2>
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Standard</th>
          <th>Deluxe</th>
          <th>Suite</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>WiFi</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
        <tr><td>TV</td><td>✔️</td><td>✔️</td><td>✔️</td></tr>
        <tr><td>Air Conditioning</td><td>❌</td><td>✔️</td><td>✔️</td></tr>
        <tr><td>Breakfast</td><td>❌</td><td>✔️</td><td>✔️</td></tr>
        <tr><td>Pool</td><td>❌</td><td>❌</td><td>✔️</td></tr>
      </tbody>
    </table>
  </div>
  <a href="../../CONTROLLER/Logout_F.php" class="logout-btn">Logout</a>

  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
  <script src="../../ASSET/JS/Roomtypes-F/roomtypes.js"></script>
</body>
</html>
