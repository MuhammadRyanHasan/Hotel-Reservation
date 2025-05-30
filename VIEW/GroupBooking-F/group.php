<?php



require_once('../../CONTROLLER/sessioncheck.php');


if (!isset($_SESSION['role']) || ($_SESSION['role'] !== 'guest' && $_SESSION['role'] !== 'admin')) {
    echo "Access denied. Guest or Admin privileges required.";
    exit();
}


echo "Welcome, " . htmlspecialchars($_SESSION['email']);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hotel Reservation - Group Bookings</title>
    <link rel="stylesheet" href="../../ASSET/CSS/GroupBooking-F/group-booking.css">
</head>
<body>
    <div class="group-bookings-container">
        <header class="gb-header">
            <h1>Group Bookings</h1>
            <nav class="gb-nav-tabs">
                <button class="tab-btn active" data-tab="group-manager">Group Manager</button>
                <button class="tab-btn" data-tab="room-block">Room Block Tool</button>
                <button class="tab-btn" data-tab="event-planner">Event Planner</button>
            </nav>
        </header>

        <main class="gb-main-content">
            <!-- Group Manager Tab -->
            <section id="group-manager" class="gb-tab-content active">
                <h2>Group Manager</h2>
                <form id="group-form" class="gb-form">
                    <div class="form-group">
                        <label for="group-name">Group Name</label>
                        <input type="text" id="group-name" required>
                    </div>
                    <div class="form-group">
                        <label for="group-contact">Contact Person</label>
                        <input type="text" id="group-contact" required>
                    </div>
                    <div class="form-group">
                        <label for="group-email">Email</label>
                        <input type="email" id="group-email" required>
                    </div>
                    <div class="form-group">
                        <label for="group-phone">Phone</label>
                        <input type="tel" id="group-phone" required>
                    </div>
                    <div class="form-group">
                        <label for="group-arrival">Arrival Date</label>
                        <input type="date" id="group-arrival" required>
                    </div>
                    <div class="form-group">
                        <label for="group-departure">Departure Date</label>
                        <input type="date" id="group-departure" required>
                    </div>
                    <div class="form-group">
                        <label for="group-rooms">Number of Rooms</label>
                        <input type="number" id="group-rooms" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="payment-terms">Payment Terms</label>
                        <select id="payment-terms" required>
                            <option value="">Select payment terms</option>
                            <option value="master-billing">Master Billing</option>
                            <option value="individual">Individual Billing</option>
                            <option value="deposit">Deposit Required</option>
                            <option value="split">Split Billing</option>
                        </select>
                    </div>
                    <button type="submit" class="gb-btn primary">Create Group</button>
                </form>
                <div class="group-list-container">
                    <h3>Existing Groups</h3>
                    <table id="groups-table">
                        <thead>
                            <tr>
                                <th>Group Name</th>
                                <th>Contact</th>
                                <th>Dates</th>
                                <th>Rooms</th>
                                <th>Payment Terms</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Groups will be added here dynamically -->
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Room Block Tool Tab -->
             <?php if ($_SESSION['role'] === 'admin'): ?>
            <section id="room-block" class="gb-tab-content">
                <h2>Room Block Tool</h2>
                <div class="room-block-controls">
                    <div class="form-group">
                        <label for="select-group">Select Group</label>
                        <select id="select-group">
                            <option value="">-- Select a group --</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="room-type">Room Type</label>
                        <select id="room-type">
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="suite">Suite</option>
                            <option value="executive">Executive Suite</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="room-qty">Quantity</label>
                        <input type="number" id="room-qty" min="1" value="1">
                    </div>
                    <button id="add-room-block" class="gb-btn primary">Add to Block</button>
                </div>
                <div class="room-block-display">
                    <h3>Current Room Blocks</h3>
                    <div id="room-blocks-list">
                        <p>No room blocks created yet. Select a group and add rooms.</p>
                    </div>
                </div>
            </section>
            <?php endif; ?>

            <!-- Event Planner Tab -->
            <section id="event-planner" class="gb-tab-content">
                <h2>Event Planner</h2>
                <div class="event-controls">
                    <div class="form-group">
                        <label for="event-group">Select Group</label>
                        <select id="event-group">
                            <option value="">-- Select a group --</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="event-name">Event Name</label>
                        <input type="text" id="event-name">
                    </div>
                    <div class="form-group">
                        <label for="event-date">Event Date</label>
                        <input type="date" id="event-date">
                    </div>
                    <div class="form-group">
                        <label for="event-time">Event Time</label>
                        <input type="time" id="event-time">
                    </div>
                    <div class="form-group">
                        <label for="event-type">Event Type</label>
                        <select id="event-type">
                            <option value="meeting">Meeting</option>
                            <option value="conference">Conference</option>
                            <option value="banquet">Banquet</option>
                            <option value="reception">Reception</option>
                            <option value="wedding">Wedding</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="event-attendees">Expected Attendees</label>
                        <input type="number" id="event-attendees" min="1">
                    </div>
                    <button id="add-event" class="gb-btn primary">Add Event</button>
                </div>
                <div class="event-list-container">
                    <h3>Scheduled Events</h3>
                    <div id="events-list">
                        <p>No events scheduled yet.</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
    <a href="../../CONTROLLER/Logout_F.php" class="logout-btn">Logout</a>

    <script src="../../ASSET/JS/GroupBooking-F/group-booking.js"></script>
</body>
</html>
