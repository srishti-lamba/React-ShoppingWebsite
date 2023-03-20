<?php
    session_start();
    //include_once('../config/CreateAndPopulateUsersTable.php');

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    $username = test_input($_POST["username"]);
    $password = test_input($_POST["password"]);

    $sql = "SELECT * FROM users WHERE (loginId = '$username' AND `password` = '$password')";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $row['userName'];
        $_SESSION['userId'] = $row['user_id'];
        $_SESSION['failedLogin'] = false;
    }
    else{
        $_SESSION['failedLogin'] = true;
    }
    //header('Location: ' . $_SERVER['HTTP_REFERER']);
    //header('Location: http://localhost/CPS630-Project-Iteration-1_2/home.php')
    header('Location: ' . substr($_SERVER['HTTP_REFERER'], 0, strrpos($_SERVER['HTTP_REFERER'], "/")) . '/home.php');
?>