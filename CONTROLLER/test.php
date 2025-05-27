<?php

require_once('../MODEL/DB.php');

    $email = 'ss';
    $password = 'ss';
    $lname = 'ss';
    $fname = 'ss';
    $phone = 'ss';


    $con = getConnection();
    $sql = "insert into users values(null, '{$fname}', '{$lname}','{$email}','{$phone}','{$password}')";
    $result = mysqli_query($con, $sql);
    $count = mysqli_num_rows($result);
    if(mysqli_query($con, $sql)){
                echo "Yes";
            }else{
                echo "No";
            }

            ?>