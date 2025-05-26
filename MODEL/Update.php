<?php
require_once('userModel.php'); 
session_start();
if(isset($_REQUEST['submit'])){
    $email = trim($_REQUEST['email']);
    $fname = trim($_REQUEST['fname']); 
     
    $user = ['email'=> $email, 'fname'=>$fname];
            $status = change($user);
    if($status){
        header('Location: ../VIEW/UserAuthentication-R/Login.html');
        exit();
    }
}

?>