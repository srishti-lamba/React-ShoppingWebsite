<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "website";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $query = "INSERT INTO USERS (user_id, userName, telephoneNum, email, address, postalCode, loginId, password) 
            VALUES (0, 'Admin User', 'N/A', 'N/A', 'N/A', 'N/A', 'admin_user', '1234') ";

    try {
        $conn->query($query);
        echo "Admin user added successfully";
    } catch (mysqli_sql_exception $e) {
        echo $conn->error;
    }
?>