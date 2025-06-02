<?php


require_once('../../CONTROLLER/sessioncheck.php');

if (!isset($_SESSION['role']) || ($_SESSION['role'] !== 'guest' && $_SESSION['role'] !== 'admin')) {
    echo "Access denied. Guest or Admin privileges required.";
    exit();
}


if (!isset($_SESSION['groups'])) $_SESSION['groups'] = [];
if (!isset($_SESSION['room_blocks'])) $_SESSION['room_blocks'] = [];
if (!isset($_SESSION['events'])) $_SESSION['events'] = [];

$message = '';
$error = '';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    
    if ($action === 'create_group') {
        $group_name = trim($_POST['group_name'] ?? '');
        $group_contact = trim($_POST['group_contact'] ?? '');
        $group_email = trim($_POST['group_email'] ?? '');
        $group_phone = trim($_POST['group_phone'] ?? '');
        $group_arrival = $_POST['group_arrival'] ?? '';
        $group_departure = $_POST['group_departure'] ?? '';
        $group_rooms = intval($_POST['group_rooms'] ?? 0);
        $payment_terms = trim($_POST['payment_terms'] ?? '');

        if ($group_name === '') {
            $error = "Group name is required.";
        } elseif ($group_contact === '') {
            $error = "Contact person is required.";
        } elseif ($group_email === '') {
            $error = "Email is required.";
        } elseif ($group_arrival === '' || $group_departure === '') {
            $error = "Arrival and departure dates are required.";
        } elseif ($group_rooms < 1) {
            $error = "Number of rooms must be at least 1.";
        } elseif ($payment_terms === '') {
            $error = "Payment terms are required.";
        } else {
            $group_id = uniqid('g');
            $_SESSION['groups'][$group_id] = [
                'id' => $group_id,
                'name' => $group_name,
                'contact' => $group_contact,
                'email' => $group_email,
                'phone' => $group_phone,
                'arrival' => $group_arrival,
                'departure' => $group_departure,
                'rooms' => $group_rooms,
                'paymentTerms' => $payment_terms
            ];
            $message = "Group created successfully!";
        }
    }

    
    if ($action === 'delete_group' && isset($_POST['group_id'])) {
        $gid = $_POST['group_id'];
        unset($_SESSION['groups'][$gid]);
        
        $_SESSION['room_blocks'] = array_filter($_SESSION['room_blocks'], fn($b) => $b['groupId'] !== $gid);
        $_SESSION['events'] = array_filter($_SESSION['events'], fn($e) => $e['groupId'] !== $gid);
        $message = "Group deleted.";
    }

   
    if ($action === 'add_room_block' && $_SESSION['role'] === 'admin') {
        $room_type = trim($_POST['room_type'] ?? '');
        $room_qty = intval($_POST['room_qty'] ?? 0);
        $group_selected = trim($_POST['select_group'] ?? '');

        if ($group_selected === '') {
            $error = "Please select a group for the room block.";
        } elseif ($room_type === '') {
            $error = "Room type is required.";
        } elseif ($room_qty < 1) {
            $error = "Room quantity must be at least 1.";
        } else {
            $block_id = uniqid('b');
            $_SESSION['room_blocks'][$block_id] = [
                'id' => $block_id,
                'groupId' => $group_selected,
                'type' => $room_type,
                'quantity' => $room_qty,
                'dateAdded' => date('Y-m-d')
            ];
            $message = "Room block added successfully!";
        }
    }

   
    if ($action === 'delete_room_block' && isset($_POST['block_id'])) {
        unset($_SESSION['room_blocks'][$_POST['block_id']]);
        $message = "Room block deleted.";
    }

    
    if ($action === 'add_event') {
        $event_name = trim($_POST['event_name'] ?? '');
        $event_date = $_POST['event_date'] ?? '';
        $event_group = trim($_POST['event_group'] ?? '');

        if ($event_group === '') {
            $error = "Please select a group for the event.";
        } elseif ($event_name === '') {
            $error = "Event name is required.";
        } elseif ($event_date === '') {
            $error = "Event date is required.";
        } else {
            $event_id = uniqid('e');
            $_SESSION['events'][$event_id] = [
                'id' => $event_id,
                'groupId' => $event_group,
                'name' => $event_name,
                'date' => $event_date
            ];
            $message = "Event added successfully!";
        }
    }

    
    if ($action === 'delete_event' && isset($_POST['event_id'])) {
        unset($_SESSION['events'][$_POST['event_id']]);
        $message = "Event deleted.";
    }
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
                <?php if ($_SESSION['role'] === 'admin'): ?>
                    <button class="tab-btn" data-tab="room-blocks">Room Blocks</button>
                <?php endif; ?>
                <button class="tab-btn" data-tab="event-planner">Event Planner</button>
            </nav>
        </header>

        <main class="gb-main-content">
            <?php if ($error): ?>
                <div class="error-message"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>
            <?php if ($message): ?>
                <div class="success-message"><?= htmlspecialchars($message) ?></div>
            <?php endif; ?>

            <!-- Group Manager Tab -->
            <div id="group-manager" class="gb-tab-content active">
                <h2>Create Group</h2>
                <form id="group-form" method="post" class="gb-form">
                    <input type="hidden" name="action" value="create_group">
                    <div class="form-group">
                        <label>Group Name:</label>
                        <input type="text" name="group_name" required>
                    </div>
                    <div class="form-group">
                        <label>Contact Person:</label>
                        <input type="text" name="group_contact" required>
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" name="group_email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone:</label>
                        <input type="text" name="group_phone">
                    </div>
                    <div class="form-group">
                        <label>Arrival Date:</label>
                        <input type="date" name="group_arrival" required>
                    </div>
                    <div class="form-group">
                        <label>Departure Date:</label>
                        <input type="date" name="group_departure" required>
                    </div>
                    <div class="form-group">
                        <label>Number of Rooms:</label>
                        <input type="number" name="group_rooms" min="1" required>
                    </div>
                    <div class="form-group">
    <label>Payment Terms:</label>
    <select name="payment_terms" required>
        <option value="">-- Select Payment Terms --</option>
        <option value="Prepaid">Prepaid</option>
        <option value="Pay at Hotel">Pay at Hotel</option>
        <option value="Company Billing">Company Billing</option>
        <option value="Split Billing">Split Billing</option>
        <option value="Other">Other</option>
    </select>
</div>
                    <button type="submit" class="gb-btn primary">Create Group</button>
                </form>

                <h3>Groups</h3>
                <table id="groups-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Dates</th>
                            <th>Rooms</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php if (empty($_SESSION['groups'])): ?>
                        <tr><td colspan="6">No groups created yet.</td></tr>
                    <?php else: foreach ($_SESSION['groups'] as $group): ?>
                        <tr>
                            <td><?= htmlspecialchars($group['name']) ?></td>
                            <td><?= htmlspecialchars($group['contact']) ?></td>
                            <td><?= htmlspecialchars($group['arrival']) ?> to <?= htmlspecialchars($group['departure']) ?></td>
                            <td><?= htmlspecialchars($group['rooms']) ?></td>
                            <td><?= htmlspecialchars($group['paymentTerms']) ?></td>
                            <td>
                                <form method="post" style="display:inline;">
                                    <input type="hidden" name="action" value="delete_group">
                                    <input type="hidden" name="group_id" value="<?= htmlspecialchars($group['id']) ?>">
                                    <button type="submit" class="gb-btn danger" onclick="return confirm('Delete this group?')">Delete</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; endif; ?>
                    </tbody>
                </table>
            </div>

            <!-- Room Blocks Tab (Admin Only) -->
            <?php if ($_SESSION['role'] === 'admin'): ?>
            <div id="room-blocks" class="gb-tab-content">
                <h2>Add Room Block</h2>
                <form id="room-block-form" method="post" class="room-block-controls">
                    <input type="hidden" name="action" value="add_room_block">
                    <div class="form-group">
                        <label>Group:</label>
                        <select name="select_group" id="select-group" required>
                            <option value="">-- Select Group --</option>
                            <?php foreach ($_SESSION['groups'] as $group): ?>
                                <option value="<?= htmlspecialchars($group['id']) ?>">
                                    <?= htmlspecialchars($group['name']) ?> (<?= htmlspecialchars($group['contact']) ?>)
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Room Type:</label>
                        <select name="room_type" required>
                            <option value="">-- Select Room Type --</option>
                            <option value="Standard">Standard</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Quantity:</label>
                        <input type="number" name="room_qty" min="1" required>
                    </div>
                    <button type="submit" id="add-room-block" class="gb-btn primary">Add Room Block</button>
                </form>

                <h3>Room Blocks</h3>
                <?php if (empty($_SESSION['room_blocks'])): ?>
                    <p>No room blocks created yet.</p>
                <?php else: ?>
                    <ul>
                    <?php foreach ($_SESSION['room_blocks'] as $block): 
                        $g = $_SESSION['groups'][$block['groupId']] ?? null;
                        ?>
                        <li>
                            <?= $g ? htmlspecialchars($g['name']) : 'Unknown Group' ?> - 
                            <?= htmlspecialchars($block['type']) ?> (<?= htmlspecialchars($block['quantity']) ?>) 
                            [<?= htmlspecialchars($block['dateAdded']) ?>]
                            <form method="post" style="display:inline;">
                                <input type="hidden" name="action" value="delete_room_block">
                                <input type="hidden" name="block_id" value="<?= htmlspecialchars($block['id']) ?>">
                                <button type="submit" class="gb-btn danger" onclick="return confirm('Delete this room block?')">Delete</button>
                            </form>
                        </li>
                    <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- Event Planner Tab -->
            <div id="event-planner" class="gb-tab-content">
                <h2>Add Event</h2>
                <form id="event-form" method="post" class="event-controls">
                    <input type="hidden" name="action" value="add_event">
                    <div class="form-group">
                        <label>Group:</label>
                        <select name="event_group" id="event-group" required>
                            <option value="">-- Select Group --</option>
                            <?php foreach ($_SESSION['groups'] as $group): ?>
                                <option value="<?= htmlspecialchars($group['id']) ?>">
                                    <?= htmlspecialchars($group['name']) ?> (<?= htmlspecialchars($group['contact']) ?>)
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="form-group">
                            <label>Meeting Type:</label>
                            <select name="meeting_type" required>
                                <option value="">-- Select Meeting Type --</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Conference">Conference</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Party">Party</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    <div class="form-group">
                        <label>Event Name:</label>
                        <input type="text" name="event_name" required>
                    </div>
                    <div class="form-group">
                        <label>Event Date:</label>
                        <input type="date" name="event_date" required>
                    </div>
                    <button type="submit" id="add-event" class="gb-btn primary">Add Event</button>
                </form>

                <h3>Events</h3>
                <?php if (empty($_SESSION['events'])): ?>
                    <p>No events scheduled yet.</p>
                <?php else: ?>
                    <ul>
                    <?php foreach ($_SESSION['events'] as $event): 
                        $g = $_SESSION['groups'][$event['groupId']] ?? null;
                        ?>
                        <li>
                            <?= $g ? htmlspecialchars($g['name']) : 'Unknown Group' ?> - 
                            <?= htmlspecialchars($event['name']) ?> (<?= htmlspecialchars($event['date']) ?>)
                            <form method="post" style="display:inline;">
                                <input type="hidden" name="action" value="delete_event">
                                <input type="hidden" name="event_id" value="<?= htmlspecialchars($event['id']) ?>">
                                <button type="submit" class="gb-btn danger" onclick="return confirm('Delete this event?')">Delete</button>
                            </form>
                        </li>
                    <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        </main>
    </div>
    <a href="../../CONTROLLER/Logout_F.php" class="logout-btn">Logout</a>
    <script src="../../ASSET/JS/GroupBooking-F/group-booking.js"></script>
</body>
</html>