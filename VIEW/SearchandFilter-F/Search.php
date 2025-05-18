<?php
require_once('../../CONTROLLER/sessioncheck.php');
echo "Welcome, " . htmlspecialchars($_SESSION['email']);
?>



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hotel Search</title>
  <link rel="stylesheet" href="../../ASSET/CSS/SearchandFilter-F/search.css">
</head>
<body>
  <div class="container">
    <h1>Find Your Hotel</h1>
    <input type="text" id="searchInput" placeholder="Search by name or location...">

    <div class="filters">
      <h2>Filters</h2>
      <label>
        <input type="checkbox" class="filter-amenity" value="WiFi"> WiFi
      </label>
      <label>
        <input type="checkbox" class="filter-amenity" value="Pool"> Pool
      </label>
      <label>
        <input type="checkbox" class="filter-amenity" value="Breakfast"> Breakfast
      </label>
      <label>
        <input type="checkbox" class="filter-amenity" value="Parking"> Parking
      </label>

      <label>Max Price: <input type="range" id="priceFilter" min="500" max="30000" value="30000"></label>
      <span id="priceDisplay">$30000</span>
    </div>

    <div id="results" class="results"></div>
  </div>

  <script src="../../ASSET/JS/SearchandFilter-F/SearchandFilter.js"></script>
</body>
</html>
