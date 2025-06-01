<?php
require_once('../../CONTROLLER/sessioncheck.php');
echo "Welcome, " . htmlspecialchars($_SESSION['email']);
?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Amenities</title>
    <link rel="stylesheet" href="../../ASSET/CSS/AmenitiesList-F/Amenities.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="container">
        
        <header class="header">
            <h1>Hotel Amenities</h1>
            <div class="tabs">
                <button class="tab-btn active" data-tab="facility-explorer">Facility Explorer</button>
                <button class="tab-btn" data-tab="service-directory">Service Directory</button>
                <button class="tab-btn" data-tab="operating-hours">Operating Hours</button>
            </div>
        </header>

        
        <main class="main-content">
            
            <section id="facility-explorer" class="tab-content active">
                <div class="filter-section">
                    <h3>Filter Amenities</h3>
                    <div class="filter-options">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="pool">Pool</button>
                        <button class="filter-btn" data-filter="gym">Gym</button>
                        <button class="filter-btn" data-filter="breakfast">Breakfast</button>
                        <button class="filter-btn" data-filter="wifi">Wifi</button>
                        <button class="filter-btn" data-filter="tv">TV</button>
                        <button class="filter-btn" data-filter="ac">Air Conditioning</button>
                    </div>
                </div>

                <div class="amenities-grid">
                    
                </div>
            </section>

           
            <section id="service-directory" class="tab-content">
                <div class="services-list">
                    
                </div>
            </section>

            
            <section id="operating-hours" class="tab-content">
                <div class="hours-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Facility</th>
                                <th>Monday - Friday</th>
                                <th>Weekend</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </section>
        </main>

        
        <div id="amenity-modal" class="modal">
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <div class="modal-header">
                    <h2 id="modal-title">Amenity Details</h2>
                    <div class="availability-badge" id="availability-badge">Available Now</div>
                </div>
                <div class="modal-body">
                    <div class="amenity-gallery" id="amenity-gallery"></div>
                    <div class="amenity-info">
                        <h3>Description</h3>
                        <p id="amenity-description"></p>
                        <div class="amenity-features">
                            <h3>Features</h3>
                            <ul id="amenity-features"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a href="../../CONTROLLER/Logout_F.php" class="logout-btn">Logout</a>
    <script src="../../ASSET/JS/AmenitiesList-F/Amenities.js"></script>
</body>
</html>