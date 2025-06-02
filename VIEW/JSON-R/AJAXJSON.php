<?php
session_start();
require_once('../../MODEL/DB.php');
require_once('../../MODEL/UserModel.php');
if (!isset($_SESSION['authenticated']) && !isset($_COOKIE['login_status'])) 
    {
    header('Location: Login.html');
    exit();
    }
    $data = $_POST['json'];
    $user = json_decode($data);
    $email = trim($user->email);
    $password = trim($user->password);
    $lname = $user->lname;
    $fname = $user->fname;
    $phone = $user->tel;
    $role = "Admin";
    $con = getConnection();
    $sql = "insert into users values(null, '{$fname}', '{$lname}','{$email}','{$phone}','{$password}','{$role}')";
    $result = mysqli_query($con, $sql);
    $response = "<h3>Updated Profile:</h3>";
    $response .= "<p>First Name: ".htmlspecialchars($user->fname)."</p>";
    $response .= "<p>Last Name: ".htmlspecialchars($user->lname)."</p>";
    $response .= "<p>Email: ".htmlspecialchars($user->email)."</p>";
    $response .= "<p>Phone: ".htmlspecialchars($user->tel)."</p>";
    $response .= "<p>Password: ".htmlspecialchars($user->password)."</p>";
    $response .= "<p>Role: ".htmlspecialchars($role)."</p>";
    echo $response;
?>