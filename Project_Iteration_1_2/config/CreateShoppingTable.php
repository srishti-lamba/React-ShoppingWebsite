<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $queryDrop = "DROP TABLE Shopping;";

    $queryCreate = "CREATE TABLE Shopping(
        receiptId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        location_id INT(6) REFERENCES BranchLocations(location_id),
        totalPrice DECIMAL(6,2) UNSIGNED NOT NULL);";
    
    //Drop
    //try {$conn-> query($queryDrop);}
    //catch(mysqli_sql_exception $exception) {}
    
    //Create + Insert
    try {
        $conn->query($queryCreate);
        //echo "Executed Query";
    }
    catch (mysqli_sql_exception $exception)
    { echo("<script>console.log(`Error on Shopping: $conn->error`)</script>"); }
?>