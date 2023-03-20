<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $queryDrop = "DROP TABLE BranchLocations;";

    $queryCreate = "CREATE TABLE BranchLocations(
            location_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            locationAddress VARCHAR(100) NOT NULL,
            latitude DECIMAL(12,6) NOT NULL,
            longitude DECIMAL(12,6) NOT NULL);";

    $query1 = "INSERT INTO BranchLocations (locationAddress, latitude, longitude) 
                VALUES('2872 Danforth Avenue, Toronto, Ontario M4C 1M1, Canada', 43.690060, -79.294570);";

    $query2 = "INSERT INTO BranchLocations (locationAddress, latitude, longitude) 
    VALUES('10 Suntract Road, Toronto, Ontario M9N 3N9, Canada', 43.715750, -79.511300);";

    $query3 = "INSERT INTO BranchLocations (locationAddress, latitude, longitude) 
    VALUES('20 McLevin Avenue, Scarborough, Ontario M1B 2V5, Canada', 43.800710, -79.239760);";

    $query4 = "INSERT INTO BranchLocations (locationAddress, latitude, longitude) 
    VALUES('2070 Dundas Street East, Mississauga, Ontario L4X 1L9, Canada', 43.623510, -79.567870);";

    $query5 = "INSERT INTO BranchLocations (locationAddress, latitude, longitude) 
    VALUES('201 Britannia Road East, Mississauga, Ontario L4Z 3X8, Canada', 43.631580, -79.675940);";

    //Drop
    //try {$conn-> query($queryDrop);}
    //catch(mysqli_sql_exception $exception) {}
    
    //Create + Insert
    try{
        $conn->query($queryCreate);
        $conn->query($query1);
        $conn->query($query2);
        $conn->query($query3);
        $conn->query($query4);
        $conn->query($query5);
    } 
    catch (mysqli_sql_exception $exception)
    { echo("<script>console.log(`Error on BranchLocations: $conn->error`)</script>"); }
?>