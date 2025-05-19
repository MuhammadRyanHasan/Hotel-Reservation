<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    if ($email === 'r@r.com' && $password === 'rrrrr') {
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
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'];
    
    if (strlen($password) < 4) {
        echo "<script>alert('Password must be at least 4 characters long'); window.history.back();</script>";
        exit();
    }
}
?>
