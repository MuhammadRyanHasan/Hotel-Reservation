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
<a href="http://127.0.0.1/Hotel-Reservation/VIEW/BillingSummary-R/BillingSummary.html">BillingSummary</a> <br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="https://www.example.com">Visit Example.com</a><br>
<a href="../../CONTROLLER/Logout.php">Logout</a><br>
<body>
</html>