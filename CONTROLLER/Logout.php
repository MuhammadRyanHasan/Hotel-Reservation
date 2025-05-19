<?php
    session_start();
    session_destroy();
    setcookie('login_status', 'true', time()-10, '/');
    header('location: ../VIEW/LandingPage-R/LandingPage.html');
?>