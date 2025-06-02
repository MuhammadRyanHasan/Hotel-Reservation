<?php
session_start();
if (!isset($_SESSION['authenticated']) && !isset($_COOKIE['login_status'])) 
    {
    header('Location: Login.html');
    exit();
    }
?>
<html>
  <title>Dash</title>
<body>
<br>
<H1>DashBoard</h1>
<table border="1">
  <tr>
    <th colspan="3">Navigation</th>
  </tr>
  <tr>
    <td><a href="../LandingPage-R/LandingPage.html">Landing Page</a></td>
    <td><a href="../ProfileManagement-R/ProfileManagement.php">Profile Management</a></td>
    <td><a href="../BillingSummary-R/BillingSymmary.php">Billing Summary</a></td>
  </tr>
  <tr>
    <td><a href="../DataExport-R/DataExport.php">Data Export</a></td>
    <td><a href="../ReviewSystem-R/ReviewSystem.php">Review System</a></td>
    <td><a href="../JSON-R/Json.html">Profile (AJAX-JSON)</a></td>
  </tr>
  <tr>
    <td><a href="../ConciergeRequests-R/ConciergeRequests.php">Concierge Requests</a></td>
    <td><a href="../AvailabilityCalendar-R/AvailabilityCalendar.html">Availability Calendar</a></td>
    <td><a href="../CancellationPolicy-R/CancellationPolicy.php">Cancellation Policy</a></td>
  </tr>
  <tr>
    <td colspan="3" align="center" > <a href="../../CONTROLLER/Logout.php">Logout</a></td>
  </tr>
<body>
</html>