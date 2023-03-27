<?php
    function createAndPopulateCoupons() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $username, $password, $dbname);

        $createTable = "CREATE TABLE coupons(
            couponCode VARCHAR(50) UNIQUE NOT NULL,
            discount INT NOT NULL);";
        
        $insert1 = "INSERT INTO coupons VALUES ('WELCOME10', 10);";
        $insert2 = "INSERT INTO coupons VALUES ('HOLIDAY15', 15);";
        $insert3 = "INSERT INTO coupons VALUES ('SPRING20', 20);";

        try{
            $conn->query($createTable);
            $conn->query($insert1);
            $conn->query($insert2);
            $conn->query($insert3);
        }
        catch (mysqli_sql_exception $exception) {
            echo $exception;
        }
    }


    createAndPopulateCoupons();

?>