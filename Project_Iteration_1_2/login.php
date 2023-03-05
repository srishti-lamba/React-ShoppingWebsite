<?php
    session_start();
    include_once('db.php');

    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM users WHERE (loginId = '$username' AND `password` = '$password')";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['failedLogin'] = false;
    }
    else{
        $_SESSION['failedLogin'] = true;
    }
    header('Location: ' . $_SERVER['HTTP_REFERER']);
?>