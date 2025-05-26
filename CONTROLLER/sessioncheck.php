<?php
session_start();


if (!isset($_SESSION['email']) || !isset($_COOKIE['session_expire']) || time() > $_COOKIE['session_expire']) {
    
    session_unset();
    session_destroy();
    
    
    setcookie("session_expire", "", time() - 3600, "/");

    header('Location: ../UserAuthentication-R/login.html');
    exit();
}


setcookie("session_expire", time() + 100, time() + 100, "/");


if (!isset($_SESSION['role'])) {
    $_SESSION['role'] = 'guest';
}
?>