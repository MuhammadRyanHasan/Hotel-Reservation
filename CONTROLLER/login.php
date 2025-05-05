<?php
session_start();

// Hardcoded guest user for now
$valid_email = "guest@example.com";
$valid_password = "12345678";

// Get user input
$email = $_POST['email'];
$password = $_POST['password'];

// Validate
if ($email === $valid_email && $password === $valid_password) {
    $_SESSION['email'] = $email;
    $_SESSION['role'] = 'guest'; // manually assign 'guest' role
    header("Location: guestprofile.php");
    exit;
} else {
    echo "Invalid email or password. <a href='login.html'>Try again</a>";
}
?>
