<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $queryDrop = "DROP TABLE Users;";

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
        loginId VARCHAR(15) NOT NULL,
        password VARCHAR(200) NOT NULL,
        salt VARCHAR(10) NOT NULL,
        balance DECIMAL(6,2) SIGNED NOT NULL DEFAULT 0,
        isAdmin BOOLEAN DEFAULT False);";

    $query1 = "INSERT INTO USERS (userName, telephoneNum, email, address, postalCode, loginId, password, salt, isAdmin) 
            VALUES ('Admin User', '4167654321', 'admin@smartcustomerservices.ca', '827 Smart Ave', 'K2J4H9', 'admin_user', '5cc841142e161b16199842cb7031f708', '6bca1d', 1) ";

    $query2 = "INSERT INTO Users (userName, telephoneNum, email, address, postalCode, loginId, password, salt) 
              VALUES('John Smith', '4161234567', 'john.smith@gmail.com', '258 Avro Rd', 'L6A1X8', 'john_smith', '7ac3b22ccb25592e3a6b5b229b968d63', '2f7e21') ";

    $query3 = "INSERT INTO Users (userName, telephoneNum, email, address, postalCode, loginId, password, salt) 
              VALUES('Jane Doe', '4162345678', 'jane.doe@gmail.com', '264 River Ave', 'U4T9B4', 'jane_doe', '965f7e38497da85681015b41ea53a62b', '087b5f') ";
              
    $query4 = "INSERT INTO Users (userName, telephoneNum, email, address, postalCode, loginId, password, salt) 
              VALUES('Eric Miller', '4163456789', 'eric.miller@gmail.com', '632 Cottage St', 'R6E7Y2', 'eric_miller', '14e4bcee4c5bd4683f1a596d57622294', 'c82ff1') ";

    $query5 = "INSERT INTO Users (userName, telephoneNum, email, address, postalCode, loginId, password, salt) 
              VALUES('Monica Jones', '4164567890', 'monica.jones@gmail.com', '842 Park Blvd', 'S5L8R3', 'monica_jones', '254565addd07118c201a0f958437fc26', '4bd957') ";
    
    
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
        $conn->query($query5);
    }
    catch(mysqli_sql_exception $exception)
    { echo("<script>console.log(`Error on Users: $conn->error`)</script>"); }
?>