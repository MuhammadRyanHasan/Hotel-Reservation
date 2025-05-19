<?php
session_start();
if (!isset($_SESSION['authenticated']) && !isset($_COOKIE['login_status'])) 
    {
    header('Location:../UserAuthentication-R/Login.html');
    exit();
    }
?>
<html>
<head>
    <title>Cancellation Policy</title>
    <link rel="stylesheet" href="../../ASSET/CSS/CancellationPolicy-R/CancellationPolicy.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Cancellation Policy</h1>
        </header>
        <div class="tabs">
            <button class="tab-button active" onclick="openTab('terms')">Terms</button>
            <button class="tab-button" onclick="openTab('calculator')">Fee Calculator</button>
            <button class="tab-button" onclick="openTab('modify')">Modify Booking</button>
        </div>
        <div id="terms" class="tab-content" style="display: block;">
            <h2>Policy Terms</h2>
            <div class="rate-types">
                <button onclick="showPolicy('nonrefundable')">Non-Refundable Rate</button>
                <button onclick="showPolicy('standard')">Standard Rate</button>
                <button onclick="showPolicy('flexible')">Flexible Rate</button>
            </div>
            <div id="policy-display" class="policy-display">
                <p>Select a rate type to view cancellation policy.</p>
            </div>
        </div>
        <div id="calculator" class="tab-content">
            <h2>Cancellation Fee Calculator</h2>
            <form id="fee-calculator">
                <div class="form-group">
                    <label>Rate Type:</label>
                    <select id="rate-type" required>
                        <option value="">Select rate type</option>
                        <option value="nonrefundable">Non-Refundable</option>
                        <option value="standard">Standard</option>
                        <option value="flexible">Flexible</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Number of Nights:</label>
                    <input type="number" id="nights" min="1" required>
                </div>
                <div class="form-group">
                    <label">Total Price (/-):</label>
                    <input type="number" id="price" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="days-before">Days Before Check-in:</label>
                    <input type="number" id="days-before" min="0" required>
                </div>
                <button type="button" onclick="calculateFee()">Calculate Fee</button>
            </form>
            <div id="fee-result" class="result-box"></div>
        </div>
        <div id="modify" class="tab-content">
            <h2>Modify Your Booking</h2>
            <form id="modify-booking">
                <div class="form-group">
                    <label>Booking ID:</label>
                    <input type="text" id="booking-id" required>
                </div>
                <div class="form-group">
                    <label>Email:</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label>New Check-in Date:</label>
                    <input type="date" id="new-date" required>
                </div>
                <button type="button" onclick="checkModification()">Check Modification</button>
            </form>
            <div id="modify-result" class="result-box"></div>
        </div>
    </div>
    <script src="../../ASSET/JS/CancellationPolicy-R/CancellationPolicy.js"></script>
</body>
</html>
