<?php
require_once('../../CONTROLLER/sessioncheck.php');
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    echo "Access denied. Admin privileges required.";
    exit();
}
require_once('../../MODEL/admin_crud.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Admin CRUD Panel</title>
  <link rel="stylesheet" href="../../ASSET/CSS/Dashboard-F/admin_crud.css"/>
  
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>Admin CRUD Panel</h1>
      <a href="hotel_dashboard.php" style="float:right;">Back to Dashboard</a>
    </header>

    
    <section class="crud-section">
      <h2>Hotels</h2>
      <form method="post">
        <input type="hidden" name="entity" value="hotel">
        <input type="hidden" name="action" value="add">
        <input type="text" name="hotel_name" placeholder="Hotel Name" required>
        <input type="text" name="hotel_location" placeholder="Location" required>
        <input type="number" name="hotel_rating" placeholder="Rating" min="1" max="5" step="0.1" required>
        <button type="submit">Add Hotel</button>
      </form>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Location</th><th>Rating</th><th>Actions</th></tr>
        </thead>
        <tbody>
        <?php foreach(getHotels() as $hotel): ?>
          <tr>
            <td><?= $hotel['hotel_id'] ?></td>
            <td><?= $hotel['hotel_name'] ?></td>
            <td><?= $hotel['hotel_location'] ?></td>
            <td><?= $hotel['hotel_rating'] ?></td>
            <td>
              <form class="inline" method="post">
                <input type="hidden" name="entity" value="hotel">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="hotel_id" value="<?= $hotel['hotel_id'] ?>">
                <button type="submit">Delete</button>
              </form>
              <form class="inline" method="post">
                <input type="hidden" name="entity" value="hotel">
                <input type="hidden" name="action" value="edit">
                <input type="hidden" name="hotel_id" value="<?= $hotel['hotel_id'] ?>">
                <input type="text" name="hotel_name" value="<?= $hotel['hotel_name'] ?>" required>
                <input type="text" name="hotel_location" value="<?= $hotel['hotel_location'] ?>" required>
                <input type="number" name="hotel_rating" value="<?= $hotel['hotel_rating'] ?>" min="1" max="5" step="0.1" required>
                <button type="submit">Update</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
    </section>

    
    <section class="crud-section">
      <h2>Rooms</h2>
      <form method="post">
        <input type="hidden" name="entity" value="room">
        <input type="hidden" name="action" value="add">
        <select name="hotel_id" required>
          <option value="">Select Hotel</option>
          <?php foreach(getHotels() as $hotel): ?>
            <option value="<?= $hotel['hotel_id'] ?>"><?= $hotel['hotel_name'] ?></option>
          <?php endforeach; ?>
        </select>
        <input type="text" name="room_type" placeholder="Room Type" required>
        <input type="number" name="room_price" placeholder="Price" required>
        <input type="text" name="room_image" placeholder="Image Path">
        <button type="submit">Add Room</button>
      </form>
      <table>
        <thead>
          <tr><th>ID</th><th>Hotel</th><th>Type</th><th>Price</th><th>Image</th><th>Actions</th></tr>
        </thead>
        <tbody>
        <?php foreach(getRooms() as $room): ?>
          <tr>
            <td><?= $room['room_id'] ?></td>
            <td><?= $room['hotel_name'] ?></td>
            <td><?= $room['room_type'] ?></td>
            <td><?= $room['room_price'] ?></td>
            <td><?= $room['room_image'] ?></td>
            <td>
              <form class="inline" method="post">
                <input type="hidden" name="entity" value="room">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="room_id" value="<?= $room['room_id'] ?>">
                <button type="submit">Delete</button>
              </form>
              <form class="inline" method="post">
                <input type="hidden" name="entity" value="room">
                <input type="hidden" name="action" value="edit">
                <input type="hidden" name="room_id" value="<?= $room['room_id'] ?>">
                <select name="hotel_id" required>
                  <option value="<?= $room['hotel_id'] ?>"><?= $room['hotel_name'] ?></option>
                  <?php foreach(getHotels() as $hotel): if($hotel['hotel_id'] != $room['hotel_id']): ?>
                    <option value="<?= $hotel['hotel_id'] ?>"><?= $hotel['hotel_name'] ?></option>
                  <?php endif; endforeach; ?>
                </select>
                <input type="text" name="room_type" value="<?= $room['room_type'] ?>" required>
                <input type="number" name="room_price" value="<?= $room['room_price'] ?>" required>
                <input type="text" name="room_image" value="<?= $room['room_image'] ?>">
                <button type="submit">Update</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
    </section>

    
    <section class="crud-section">
      <h2>Amenities</h2>
      <form method="post">
        <input type="hidden" name="entity" value="amenity">
        <input type="hidden" name="action" value="add">
        <input type="text" name="amenity_name" placeholder="Amenity Name" required>
        <input type="text" name="amenity_description" placeholder="Description" required>
        <input type="text" name="amenities_type" placeholder="Type" required>
        <input type="text" name="weekday_hours" placeholder="Weekday Hours">
        <input type="text" name="weekend_hours" placeholder="Weekend Hours">
        <button type="submit">Add Amenity</button>
      </form>
      <table>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Description</th><th>Type</th><th>Weekday Hours</th><th>Weekend Hours</th><th>Actions</th></tr>
        </thead>
        <tbody>
        <?php foreach(getAmenities() as $a): ?>
          <tr>
            <td><?= $a['amenities_id'] ?></td>
            <td><?= $a['amenity_name'] ?></td>
            <td><?= $a['amenity_description'] ?></td>
            <td><?= $a['amenities_type'] ?></td>
            <td><?= $a['weekday_hours'] ?></td>
            <td><?= $a['weekend_hours'] ?></td>
            <td>
              <form class="inline" method="post">
                <input type="hidden" name="entity" value="amenity">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="amenities_id" value="<?= $a['amenities_id'] ?>">
                <button type="submit">Delete</button>
              </form>
              <form class="inline" method="post">
                <input type="hidden" name="entity" value="amenity">
                <input type="hidden" name="action" value="edit">
                <input type="hidden" name="amenities_id" value="<?= $a['amenities_id'] ?>">
                <input type="text" name="amenity_name" value="<?= $a['amenity_name'] ?>" required>
                <input type="text" name="amenity_description" value="<?= $a['amenity_description'] ?>" required>
                <input type="text" name="amenities_type" value="<?= $a['amenities_type'] ?>" required>
                <input type="text" name="weekday_hours" value="<?= $a['weekday_hours'] ?>">
                <input type="text" name="weekend_hours" value="<?= $a['weekend_hours'] ?>">
                <button type="submit">Update</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
    </section>
  </div>
  <a href="../../CONTROLLER/Logout_F.php" class="logout-btn">Logout</a>
</body>
</html>