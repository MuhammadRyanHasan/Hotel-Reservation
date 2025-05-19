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
<a href="../BillingSummary-R/BillingSymmary.html">BillingSummary</a> <br>
<a href="../LandingPage-R/LandingPage.html">LandingPage</a><br>
<a href="../ReviewSystem-R/ReviewSystem.html">ReviewSystem</a><br>
<a href="../ProfileManagement-R/ProfileManagement.html">ProfileManagement</a><br>
<a href="../DataExport-R/DataExport.html">DataExport</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="../../CONTROLLER/Logout.php">Logout</a><br>
<body>
</html>