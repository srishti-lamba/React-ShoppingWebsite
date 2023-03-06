<?php

    function fetchLocations() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "mysql";

        $conn = new mysqli($servername, $username, $password, $dbname);

        $query = "SELECT locationAddress FROM BranchLocation;";

        try {
            $result = $conn->query($query);
            return $result;
        } catch (mysqli_sql_exception $exception) {
            echo $exception;
        }
    }
    
?>