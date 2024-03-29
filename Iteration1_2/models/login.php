<?php
    session_start();
    include_once('../config/CreateAndPopulateUsersTable.php');

    function encrypt($password, $salt){
        return md5($password.$salt);
    }

    function getConnection(){
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "website";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);
        return $conn;
    }

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    function fetchEncryptedPassword($username, $password){
        $conn = getConnection();
        $fetchSalt = "SELECT salt FROM users WHERE (loginId = '$username')";

        try{
            $result = $conn->query($fetchSalt);
            if($result->num_rows > 0 ){
                $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
                $salt = $row['salt'];
                return encrypt($password, $salt);
            } else {
                header("HTTP/1.1 404 Not Found");
            }
        }
        catch (mysqli_sql_exception $exception){ 
        }
    }

    $username = test_input($_POST["username"]);
    $password = test_input($_POST["password"]);
    $encryptedPassword = fetchEncryptedPassword($username, $password);
    $conn = getConnection();

    $sql = "SELECT * FROM users WHERE (loginId = '$username' AND `password` = '$encryptedPassword')";
    $result;

    try 
        { $result = $conn->query($sql);}
    catch (mysqli_sql_exception $exception)
        { echo("<script>console.log(`Error on login.php: $conn->error`)</script>"); }

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $row['userName'];
        $_SESSION['userId'] = $row['user_id'];
        $_SESSION['failedLogin'] = false;
        $_SESSION['isAdmin'] = $row['isAdmin'];
    }
    else{
        $_SESSION['failedLogin'] = true;
    }

    header('Location: ' . substr($_SERVER['HTTP_REFERER'], 0, strrpos($_SERVER['HTTP_REFERER'], "/")) . '/home.php');
?>