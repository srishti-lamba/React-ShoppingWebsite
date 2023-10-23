<?php

    header('Access-Control-Allow-Origin: *');

    function fetchLocations() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "website";

        $conn = new mysqli($servername, $username, $password, $dbname);

        $query = "SELECT locationAddress FROM BranchLocations;";

        try {
            $result = $conn->query($query);
            $output = array();
            while($row = $result->fetch_assoc()){
                array_push($output, json_encode($row));
            }

            return $output;
        } catch (mysqli_sql_exception $exception) {
            { echo("<script>console.log(`Error on fetchLocations.php: $conn->error`)</script>"); }
        }
    }

    $result = fetchLocations();
    echo json_encode($result);
    header('HTTP/1.1 200 OK');
    
?>