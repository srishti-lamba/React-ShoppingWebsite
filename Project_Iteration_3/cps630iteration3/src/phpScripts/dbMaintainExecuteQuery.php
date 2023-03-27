<?php
    header('Access-Control-Allow-Origin: *');

    $query = $_POST['query'];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    try {
        $conn->query($query);
        echo "Query executed successfully";
        
    }  catch (mysqli_sql_exception $exception) {
         
            echo $conn->error; 
    }

    $conn->close();
?>