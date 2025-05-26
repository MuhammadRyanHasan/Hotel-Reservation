<?php
    $data = $_POST['json'];
    $user = json_decode($data);
    $response = "<h3>Updated Profile:</h3>";
    $response .= "<p>Name: ".htmlspecialchars($user->name)."</p>";
    $response .= "<p>Email: ".htmlspecialchars($user->email)."</p>";
    $response .= "<p>Password: ".htmlspecialchars($user->password)."</p>";
    echo $response;
?>