<?php

    function fetchLocations() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "cps630";

        $conn = new mysqli($servername, $username, $password, $dbname);

        $query = "SELECT locationAddress FROM BranchLocations;";

        try {
            $result = $conn->query($query);
            return $result;
        } catch (mysqli_sql_exception $exception) {
            echo $exception;
        }
    }
    
?>