<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $queryDrop = "DROP TABLE Orders;";

    $queryCreate = "CREATE TABLE Orders(
        orderId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        dateIssued TIMESTAMP,
        deliveryDate DATE,
        deliveryTime TIME,
        totalPrice DECIMAL(6,2) UNSIGNED NOT NULL,
        paymentCode INT(19) UNSIGNED,
        userId INT(6) REFERENCES Users(user_id),
        tripId INT(6) REFERENCES Trips(tripId),
        receiptId INT(6) UNSIGNED,
        orderStatus VARCHAR(50) NOT NULL DEFAULT 'Processing');";

    //          1234567890
    //Status:   Processing
    //          In Transit
    //          Delivered
    
    //Drop
    try {$conn-> query($queryDrop);}
    catch(mysqli_sql_exception $exception) {}
    
    //Create + Insert
    try {
        $conn->query($queryCreate);
        //echo ("<script>console.log(\"Order table created.\")</script>");
    }
    catch (mysqli_sql_exception $exception)
    { echo("Error on Orders:" . $conn->error); }
?>