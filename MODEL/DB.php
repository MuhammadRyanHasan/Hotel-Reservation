<?php
    //$hostx = "127.0.0.1";
    $dbname = "db";
    $dbuser = "root";
    $dbpass = "";
    function getConnection(){
        global $dbname;
        global $dbuser;
        global $dbpass;
        $con = mysqli_connect("127.0.0.1", $dbuser, $dbpass, $dbname);
        return $con;
    }
?>