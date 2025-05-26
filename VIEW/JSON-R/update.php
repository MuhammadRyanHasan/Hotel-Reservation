<?php
    $data = $_POST['json'];
    $user = json_decode($data);
    echo "Updated username: ".$user->username;
?>