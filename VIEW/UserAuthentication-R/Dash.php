<?php
session_start();
if (!isset($_SESSION['authenticated']) && !isset($_COOKIE['login_status'])) 
    {
    header('Location: Login.html');
    exit();
    }
?>
<html>
<body>
<br>
<table border="1">
  <tr>
    <th colspan="2">Navigation</th>
  </tr>
  <tr>
    <td><a href="../LandingPage-R/LandingPage.html">Landing Page</a></td>
    <td><a href="../ProfileManagement-R/ProfileManagement.php">Profile Management</a></td>
  </tr>
  <tr>
    <td><a href="../BillingSummary-R/BillingSymmary.php">Billing Summary</a></td>
    <td><a href="../DataExport-R/DataExport.php">Data Export</a></td>
  </tr>
  <tr>
    <td><a href="../ReviewSystem-R/ReviewSystem.php">Review System</a></td>
    <td><a href="../CancellationPolicy-R/CancellationPolicy.php">Cancellation Policy</a></td>
  </tr>
  <tr>
    <td><a href="../ConciergeRequests-R/ConciergeRequests.php">Concierge Requests</a></td>
    <td><a href="../JSON-R/Json.html">JSON</a></td>
  </tr>
  <tr>
    <td colspan="2"><a href="../../CONTROLLER/Logout.php">Logout</a></td>
  </tr>
<body>
</html>