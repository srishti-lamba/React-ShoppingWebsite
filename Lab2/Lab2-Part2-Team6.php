<style>
    <?php include 'Lab2-Part2-Team6.css'; ?>
</style>

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


$dropTable = "DROP TABLE StRec";

$createTable = "CREATE TABLE StRec (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    university VARCHAR(50),
    gpa FLOAT(2),
    reg_date TIMESTAMP
    )";

// $insertRow = "INSERT INTO StRec (firstname, lastname, email)
// VALUES ('John', 'Smith', 'john@example.com');";

// $insertRow2 = "INSERT INTO StRec (firstname, lastname, email)
// VALUES ('Bob', 'Smith', 'bob.smith@gmail.com');";

mysqli_begin_transaction($conn);

try {
    mysqli_query($conn, $dropTable);
    mysqli_query($conn, $createTable);

    mysqli_execute_query($conn, "INSERT INTO StRec (firstname, lastname, email, university, gpa)
    VALUES ('John', 'Smith', 'john@example.com', 'Toronto Metropolitan University', 4.33);");
    
    mysqli_execute_query($conn, "INSERT INTO StRec (firstname, lastname, email, university, gpa)
    VALUES ('Bob', 'Smith', 'bob.smith@gmail.com', 'Toronto Metropolitan University', 4.01);");

    mysqli_execute_query($conn, "INSERT INTO StRec (firstname, lastname, email, university, gpa)
    VALUES ('Joe', 'Blow', 'joe.blow@gmail.com', 'University of Toronto', 3.92);");

    mysqli_execute_query($conn, "INSERT INTO StRec (firstname, lastname, email, university, gpa)
    VALUES ('Mike', 'Brown', 'mike.brown@gmail.com', 'York University', 3.5);");

    mysqli_execute_query($conn, "INSERT INTO StRec (firstname, lastname, email, university, gpa)
    VALUES ('Mark', 'Jones', 'mjones@gmail.com', 'University of Toronto', 3.40);");

    mysqli_execute_query($conn, "INSERT INTO StRec (firstname, lastname, email, university, gpa)
    VALUES ('George', 'Miller', 'george.miller@gmail.com', 'Toronto Metropolitan University', 3.40);");

    mysqli_execute_query($conn, "DELETE FROM StRec WHERE university = 'University of Toronto';");

    $tmuStudents = mysqli_execute_query($conn, "SELECT firstname, lastname, email, university, gpa 
    FROM StRec WHERE university = 'Toronto Metropolitan University';");


    $students = mysqli_execute_query($conn, "SELECT firstname, lastname, email, university, gpa
    FROM StRec WHERE id > 1 AND id < 6;");

    mysqli_commit($conn);

    echo "<h3>Table Displaying all TMU Students:</h3>";
    echo "<table><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>University</th><th>GPA</th></tr>";
    
    if($tmuStudents->num_rows > 0){
        while($row = $tmuStudents->fetch_assoc()) {
            echo "<tr><td>".$row["firstname"]."</td><td>".$row["lastname"]."</td><td>".$row["email"]."</td><td>".$row["university"]."</td><td>".$row["gpa"]."</td></tr>";
        }  
    }

    echo "</table><h3>Table Displaying all Students with an Id greater than 1 and less than 6:</h3>";
    echo "<table><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>University</th><th>GPA</th></tr>";
    
    if($students->num_rows > 0){
        while($row = $students->fetch_assoc()) {
            echo "<tr><td>".$row["firstname"]."</td><td>".$row["lastname"]."</td><td>".$row["email"]."</td><td>".$row["university"]."</td><td>".$row["gpa"]."</td></tr>";
        }  
    }
    echo "<table>";

} catch(mysqli_sql_exception $exception) {
    $conn->rollback();
    echo $exception;
}



mysqli_close($conn);
?> 



