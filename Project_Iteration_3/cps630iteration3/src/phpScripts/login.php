<?php
    session_start();
    header('Access-Control-Allow-Origin: *');
    //include_once('../config/CreateAndPopulateUsersTable.php');

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    function getUser($username, $password) {
        $username = test_input($username);
        $password = test_input($password);

        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        $sql = "SELECT * FROM users WHERE (loginId = '$username' AND `password` = '$password')";
        $result;

        try { 
            $result = $conn->query($sql);
            
            if($result->num_rows > 0 ){
                return $result;
            } else {
                header("HTTP/1.1 404 Not Found");
            }
        }
        catch (mysqli_sql_exception $exception)
            { 
                echo("<script>console.log(`Error on login.php: $conn->error`)</script>"); 
                exit();
            }

    }

    $username = $_POST['username'];
    $password = $_POST['password'];
    $result = getUser($username, $password);
    echo json_encode($result->fetch_assoc());

    

    // if ($result->num_rows > 0) {
    //     //$row = $result->fetch_assoc();
    //     // $_SESSION['loggedin'] = true;
    //     // $_SESSION['username'] = $row['userName'];
    //     // $_SESSION['userId'] = $row['user_id'];
    //     // $_SESSION['failedLogin'] = false;
    //     // $_SESSION['isAdmin'] = $row['isAdmin'];

    // }
    // else{
    //     $_SESSION['failedLogin'] = true;
    // }
    //header('Location: ' . $_SERVER['HTTP_REFERER']);
    //header('Location: http://localhost/CPS630-Project-Iteration-1_2/home.php')
    //header('Location: ' . substr($_SERVER['HTTP_REFERER'], 0, strrpos($_SERVER['HTTP_REFERER'], "/")) . '/home.php');
?>