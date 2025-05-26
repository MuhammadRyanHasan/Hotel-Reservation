<?php

    session_start();
    session_destroy();
    setcookie('session_expire', '', time() - 3600, '/');
    setcookie('login_status', '', time() - 3600, '/');
    header('Location: ../VIEW/Dashboard-F/hotel_dashboard.php');
    exit();
?>