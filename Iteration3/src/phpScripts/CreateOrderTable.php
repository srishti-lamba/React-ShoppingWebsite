<?php
	header('Access-Control-Allow-Origin: *');

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "website";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $queryDrop = "DROP TABLE Orders;";

    $querySequence = "CREATE SEQUENCE `order-sequence` START WITH 1 INCREMENT BY 1;";

    $queryCreate = "CREATE TABLE Orders(
        orderId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        dateIssued TIMESTAMP,
        deliveryDate DATE,
        deliveryTime TIME,
        totalPrice DECIMAL(6,2) UNSIGNED NOT NULL,
        paymentCode VARCHAR(200) NOT NULL,
        salt VARCHAR(10) NOT NULL,
        userId INT(6) REFERENCES Users(user_id),
        tripId INT(6) REFERENCES Trips(tripId),
        receiptId INT(6) UNSIGNED DEFAULT( NEXT VALUE FOR `order-sequence` ),
        orderStatus VARCHAR(50) NOT NULL DEFAULT 'Processing');";

    //          1234567890
    //Status:   Processing
    //          In Transit
    //          Delivered
    
    //Drop
    //try {$conn-> query($queryDrop);}
    //catch(mysqli_sql_exception $exception) {}
    
    //Create + Insert
    try {
        $conn->query($querySequence);
        $conn->query($queryCreate);
        //echo ("<script>console.log(\"Order table created.\")</script>");
    }
    catch (mysqli_sql_exception $exception)
    { echo("<script>console.log(`Error on Orders: $conn->error`)</script>"); }
?>