<?php
    require_once('../MODEL/DB.php');
    session_start();
    $data = $_POST['json'];
    $user = json_decode($data);
    $email = trim($user->email);
    $password = trim($user->password);
    $lname = "JSON Demo LAST NAME!" ;
    $fname = "JSON Demo FIRST NAME!";
    $phone = "TELETALK";
    $role =  "JSON-BUILDER";
    $con = getConnection();
    $sql = "insert into users values(null, '{$fname}', '{$lname}','{$email}','{$phone}','{$password}','{$role}')";
    $result = mysqli_query($con, $sql);
    $response = "<h3>Updated Profile:</h3>";
    $response .= "<p>Email: ".htmlspecialchars($user->email)."</p>";
    $response .= "<p>Password: ".htmlspecialchars($user->password)."</p>";
    echo $response;
?>