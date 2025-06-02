<?php
require_once('userModel.php'); 
session_start();
if(isset($_REQUEST['submit'])){
    $email = trim($_REQUEST['email']);
    $fname = trim($_REQUEST['fname']); 
    $lname = trim($_REQUEST['lname']);
    $phone = trim($_REQUEST['phone']);
    $password = trim($_REQUEST['password']);
    $user = [
        'email' => $email,
        'fname' => $fname,
        'lname' => $lname,
        'phone' => $phone,
        'password' => $password];
        $status = change($user);
    if($status){
        header('Location: ../VIEW/ProfileManagement-R/ProfileManagement.php');
        exit();
    }
}

?>