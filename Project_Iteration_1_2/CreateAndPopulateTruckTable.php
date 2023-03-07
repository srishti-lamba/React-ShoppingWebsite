<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mysql";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $query = "CREATE TABLE Truck(
        truckId int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        availabilityCode varchar(15) not null);";

    $query2 = "INSERT INTO Truck (availabilityCode) VALUES('Available');";
    $query3 = "INSERT INTO Truck (availabilityCode) VALUES('Available');";
    $query4 = "INSERT INTO Truck (availabilityCode) VALUES('Available');";
    $query5 = "INSERT INTO Truck (availabilityCode) VALUES('Available');";

    try {
        $conn->query($query);
        $conn->query($query2);
        $conn->query($query3);
        $conn->query($query4);
        $conn->query($query5);
        //echo "Executed Query";
    } catch (mysqli_sql_exception $exception) {
        //echo $exception;
    }
?>