<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "mysql";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $query = "CREATE TABLE BranchLocation(
            location_id int(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            locationAddress varchar(100) not null,
            latitude DECIMAL(12,6) not null,
            longitude DECIMAL(12,6) not null);";

    $query2 = "INSERT INTO BranchLocation (locationAddress, latitude, longitude) 
                VALUES('2872 Danforth Avenue, Toronto, Ontario M4C 1M1, Canada', 43.690060, -79.294570);";

    $query3 = "INSERT INTO BranchLocation (locationAddress, latitude, longitude) 
    VALUES('10 Suntract Road, Toronto, Ontario M9N 3N9, Canada', 43.715750, -79.511300);";

    $query4 = "INSERT INTO BranchLocation (locationAddress, latitude, longitude) 
    VALUES('20 McLevin Avenue, Scarborough, Ontario M1B 2V5, Canada', 43.800710, -79.239760);";

    $query5 = "INSERT INTO BranchLocation (locationAddress, latitude, longitude) 
    VALUES('2070 Dundas Street East, Mississauga, Ontario L4X 1L9, Canada', 43.623510, -79.567870);";

    $query6 = "INSERT INTO BranchLocation (locationAddress, latitude, longitude) 
    VALUES('201 Britannia Road East, Mississauga, Ontario L4Z 3X8, Canada', 43.631580, -79.675940);";

    try{
        $conn->query($query);
        $conn->query($query2);
        $conn->query($query3);
        $conn->query($query4);
        $conn->query($query5);
        $conn->query($query6);
        //echo "query's executed successfully";
    } catch (mysqli_sql_exception $exception) {
        //echo $exception;
    }
?>