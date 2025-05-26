<?php
require_once('../MODEL/DB.php');
session_start();
if(isset($_REQUEST['submit'])){
    $email = trim($_REQUEST['email']);
    $password = trim($_REQUEST['password']);
    $lname = trim($_REQUEST['lname']);
    $fname = trim($_REQUEST['fname']);
    $phone = trim($_REQUEST['phone']);

    if (!validatePasswordRules($password)) {
        header('Location: ../VIEW/UserAuthentication-R/Login.html');
        exit();
    }
    
    $con = getConnection();
    $sql = "insert into users values(null, '{$fname}', '{$lname}','{$email}','{$phone}','{$password}')";
    $result = mysqli_query($con, $sql);
    if($result){
                header('Location: ../VIEW/UserAuthentication-R/Login.html');
            }else{
                header('Location: ../VIEW/UserAuthentication-R/SignUp.html');
            }
    
} else {
    header('Location: ../VIEW/UserAuthentication-R/Login.html');
    exit();
}

function validatePasswordRules($password) {
    $hasUpper = false;
    $hasLower = false;
    $hasNumber = false;
    $hasSpecial = false;
    $specialChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?\\";
    if (strlen($password) < 8) {
        return false;
    }
    for ($i = 0; $i < strlen($password); $i++) {
        $char = $password[$i];
        $charCode = ord($char);
        if ($charCode >= 65 && $charCode <= 90) {
            $hasUpper = true;
        } else if ($charCode >= 97 && $charCode <= 122) {
            $hasLower = true;
        } else if ($charCode >= 48 && $charCode <= 57) {
            $hasNumber = true;
        } else {
            for ($j = 0; $j < strlen($specialChars); $j++) {
                if ($char === $specialChars[$j]) {
                    $hasSpecial = true;
                    break;
                }
            }
        }
    }
    if (!$hasUpper || !$hasLower || !$hasNumber || !$hasSpecial) {
        return false;
    }
    return true;
}
?>