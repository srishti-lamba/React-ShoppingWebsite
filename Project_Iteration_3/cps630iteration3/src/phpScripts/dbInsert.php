<?php
    header('Access-Control-Allow-Origin: *');

    $query = $_POST['query'];

    $output = array();

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    try {
        $result = $conn->query($query);
        while($row = $result->fetch_assoc()){
            array_push($output, $row);
        }

        echo json_encode($output);
    }  catch (mysqli_sql_exception $exception) { 
            echo $conn->error; 
    }

    $conn->close();
?>

