<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mysql";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $query = "CREATE TABLE Orders(
        orderId int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        dateIssued TIMESTAMP,
        totalPrice DECIMAL(6,2) UNSIGNED not null,
        paymentCode int(6) UNSIGNED,
        user_id int(6) REFERENCES Users(user_id),
        tripId int(6) REFERENCES Trip(tripId),
        receiptId int(6) UNSIGNED);";

    try {
        $conn->query($query);
        echo "Executed Query";
    } catch (mysqli_sql_exception $exception) {
        echo $exception;
    }
?>