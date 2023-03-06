<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mysql";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $query = "CREATE TABLE Trip(
        tripId int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        source varchar(50) not null,
        destination varchar(50) not null,
        truckId int(6) REFERENCES Truck(truckId));";

    try {
        $conn->query($query);
        echo "Executed Query";
    } catch (mysqli_sql_exception $exception) {
        echo $exception;
    }
?>