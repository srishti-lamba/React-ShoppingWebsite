<?php
    $table = $_REQUEST['table'];

    header('Access-Control-Allow-Origin: *');

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "website";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $query = "SELECT * FROM $table;";

    //echo $query;

    try {
        $output = array();
        $result = $conn->query($query);
        while($row = $result->fetch_assoc()) {
            array_push($output, json_encode($row));
        }
        echo json_encode($output);
        $conn->close();
    } catch (mysqli_sql_exception $exception) {
        { header('HTTP/1.1 400 Bad Request'); }
    }
?>