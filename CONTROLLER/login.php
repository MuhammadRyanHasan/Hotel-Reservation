<?php
session_start();

// Hardcoded users
$users = [
    'guest@example.com' => [
        'password' => '12345678',
        'role' => 'guest'
    ],
    'admin@example.com' => [
        'password' => 'admin123',
        'role' => 'admin'
    ]
];


$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';


if (isset($users[$email]) && $users[$email]['password'] === $password) {
    $_SESSION['email'] = $email;
    $_SESSION['role'] = $users[$email]['role'];
    
    
    setcookie("session_expire", time() + 10, time() + 10, "/");

    
    header("Location: ../VIEW/Dashboard-F/hotel_dashboard.php");
    exit;
} else {
    echo "Invalid email or password. <a href='../VIEW/UserAuthentication-R/login.html'>Try again</a>";
}
?>