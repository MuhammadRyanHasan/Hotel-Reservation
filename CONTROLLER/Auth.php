<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    if ($email === 'r@r.com' && $password === 'rrr') {
        $_SESSION['authenticated'] = true;
        setcookie('login_status', 'true', time() + 600, '/');
        header('Location: ../VIEW/UserAuthentication-R/temp.php');
        exit();
    } else {
        header('Location: ../VIEW/UserAuthentication-R/Login.html');
        exit();
    }
} else {
    header('Location: ../VIEW/UserAuthentication-R/Login.html');
    exit();
}
?>
