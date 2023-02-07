<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "testnew";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
$sql1 = "CREATE TABLE StRec (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP
    )";

$sql2 = $sql = "INSERT INTO StRec (firstname, lastname, email)
VALUES ('Johni', 'Smith', 'john@example.com')";

if(mysqli_query($conn, $sql1)){
    echo "\nRow inserted";
} else {
    echo "Error creating table";
}

if(mysqli_query($conn, $sql2)){
    echo "\nRow inserted";
} else {
    echo "Error inserting row";
}

mysqli_close($conn);
?> 