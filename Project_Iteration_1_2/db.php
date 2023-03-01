<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mysql";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Create 'users' table if it does not exist under mysql database, with 1 entry {admin:password}
    try {
        $query = "SELECT * FROM USERS";
        $result = mysqli_query($conn, $query);
    }
    catch(mysqli_sql_exception $exception) {
        $query = "CREATE TABLE users (
            username VARCHAR(50) NOT NULL PRIMARY KEY,
            password VARCHAR(50) NOT NULL
            )";
        mysqli_query($conn, $query);
        mysqli_query($conn, "INSERT INTO users VALUES ('admin', 'password');");
    }

?> 