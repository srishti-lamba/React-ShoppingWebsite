<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $queryDrop = "DROP TABLE Trucks;";

    $queryCreate = "CREATE TABLE Trucks(
        truckId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        availabilityCode VARCHAR(15) NOT NULL);";

    $query1 = "INSERT INTO Trucks (availabilityCode) VALUES('Available');";
    $query2 = "INSERT INTO Trucks (availabilityCode) VALUES('Available');";
    $query3 = "INSERT INTO Trucks (availabilityCode) VALUES('Available');";
    $query4 = "INSERT INTO Trucks (availabilityCode) VALUES('Available');";

    //Drop
    //try {$conn-> query($queryDrop);}
    //catch(mysqli_sql_exception $exception) {}
    
    //Create + Insert
    try {
        $conn->query($queryCreate);
        $conn->query($query1);
        $conn->query($query2);
        $conn->query($query3);
        $conn->query($query4);
        //echo "Executed Query";
    }
    catch (mysqli_sql_exception $exception)
    { echo("<script>console.log(`Error on Trucks: $conn->error`)</script>"); }
?>