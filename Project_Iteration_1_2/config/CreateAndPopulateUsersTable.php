<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $queryDrop = "DROP TABLE Users;";

    $queryCreate = "CREATE TABLE Users(
        user_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userName VARCHAR(50) NOT NULL,
        telephoneNum VARCHAR(10) NOT NULL,
        email VARCHAR(30) NOT NULL,
        address VARCHAR(70) NOT NULL,
        postalCode VARCHAR(6) NOT NULL,
        loginId VARCHAR(10) NOT NULL,
        password VARCHAR(20) NOT NULL,
        balance DECIMAL(6,2) SIGNED NOT NULL DEFAULT 0);";
        
    $query1 = "INSERT INTO Users (userName, telephoneNum, email, address, postalCode, loginId, password)
              VALUES('John Smith', '4161234567', 'john.smith@gmail.com', '258 Avro Rd', 'L6A1X8', 'john_smith', '1234') ";
    
    //Drop
    //try {$conn-> query($queryDrop);}
    //catch(mysqli_sql_exception $exception) {}
    
    //Create + Insert
    try {
        $conn->query($queryCreate);
        include("./addAdminUser.php");
        $conn->query($query1);
        //echo "Query executed successfully";

    }
    catch(mysqli_sql_exception $exception)
    { echo("Error on Users:" . $conn->error); }
?>