<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mysql";

    $conn = new mysqli($servername, $username, $password, $dbname);

    try {
        //$query = "DROP TABLE Users;";
        $query = "CREATE TABLE Users(
            User_id int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            userName varchar(50) NOT NULL,
            telephoneNum varchar(10) not null,
            Email varchar(30) not null,
            `Address` varchar(70) not null,
            PostalCode varchar(6) not null,
            LoginId varchar(10) not null,
            `Password` varchar(20) not null,
            Balance decimal(6,2) SIGNED not null default 0);";
        $conn->query($query);
        
        $query2 = "INSERT INTO Users (userName, telephoneNum, Email, `Address`, PostalCode, loginId, `Password`)
                    VALUES('John Smith', '4161234567', 'john.smith@gmail.com', '258 Avro Rd', 'L6A1X8', 'john_smith', '1234') ";

        $conn->query($query2);
        echo "Query executed successfully";

    } catch(mysqli_sql_exception $exception) {
        echo $exception;
    }
?>