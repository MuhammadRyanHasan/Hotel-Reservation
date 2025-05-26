<?php
require_once('userModel.php'); 
session_start();
if(isset($_REQUEST['submit'])){
    $email = trim($_REQUEST['email']);
     
    $user = ['email'=> $email];
            $status = delete($user);
    if($status){
        header('Location: ../VIEW/UserAuthentication-R/temp.php');
        exit();
    }
}

?>