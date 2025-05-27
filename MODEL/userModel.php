<?php
 require_once('DB.php');

function login($user){
    $con = getConnection();
    $sql = "select * from users where email='{$user['email']}' and password='{$user['password']}'";
    $result = mysqli_query($con, $sql);
    $count = mysqli_num_rows($result);
    $result = mysqli_query($con, $sql);
    if($result){return true;}else{return false;}

}
function change($user)
{
    $con = getConnection();
    $sql = "update users set fname='{$user['fname']}', lname='{$user['lname']}', phone='{$user['phone']}', password='{$user['password']}' where email='{$user['email']}'";
    $result = mysqli_query($con, $sql);
    if($result){return true;}else{return false;}
}

function delete($user){
    {
    $con = getConnection();
    $sql = $sql = "UPDATE users SET fname=NULL, lname=NULL, phone=NULL, password = NULL, email=NULL, role=NULL WHERE email='{$user['email']}'";
    $result = mysqli_query($con, $sql);
    if($result){
        return true;
    }else{
        return false;
    }
}
}

function user($useremail)
{
    $con = getConnection();
    $sql = "select * from users where email='{$useremail['email']}'";
    $result = mysqli_query($con, $sql);
    return $result;
}

?>