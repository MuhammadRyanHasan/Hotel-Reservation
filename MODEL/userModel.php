<?php
 require_once('DB.php');

function login($user){
    $con = getConnection();
    $sql = "select * from users where email='{$user['email']}' and password='{$user['password']}'";
    $result = mysqli_query($con, $sql);
    $count = mysqli_num_rows($result);
    if($count == 1){return true;}else{return false;
    }

}
function change($user)
{
    $con = getConnection();
    $sql = "update users set fname='{$user['fname']}' where email='{$user['email']}'";
    $result = mysqli_query($con, $sql);
    if($result){
        return true;
    }else{
        return false;
    }
}

function delete($user){
    {
    $con = getConnection();
    $sql = "update users set fname = NULL WHERE email = '{$user['email']}'";
    $result = mysqli_query($con, $sql);
    if($result){
        return true;
    }else{
        return false;
    }
}
    
}
?>