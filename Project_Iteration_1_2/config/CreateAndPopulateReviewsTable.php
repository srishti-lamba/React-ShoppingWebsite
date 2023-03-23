<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $queryDrop = "DROP TABLE Reviews;";

    $queryCreate = "CREATE TABLE Reviews(
        reviewId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userID INT(6) NOT NULL,
        itemID INT(6) NOT NULL,
        dateTime TIMESTAMP,
        rating INT(1) NOT NULL CHECK(rating >= 0 AND rating <= 5),
        title VARCHAR(50) NOT NULL,
        content VARCHAR(500) NOT NULL);";

    $query1 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('3', '1', '2023-02-25 011:26:32', '5', 'Will be coming back!', 'I purchased a sofa last month and I couldn\'t be happier with my purchase. The whole process was seamless. Delivery was fast and on time and the quality was amazing. Whenever I need furniture I will make sure to purchase from Smart Customer Service.') ";
        
    $query2 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content)
              VALUES ('4', '9', '2023-03-17 016:42:54' , '5', 'Easy to use!', 'I made a purchase a few months ago and can not complain. The online store is very well desgined and easy to use and makes online shopping easy!') ";
    
    //Drop
    //try {$conn-> query($queryDrop);}
    //catch(mysqli_sql_exception $exception) {}
    
    //Create + Insert
    try {
        $conn->query($queryCreate);
        $conn->query($query1);
        $conn->query($query2);
    }
    catch(mysqli_sql_exception $exception)
    { echo("<script>console.log(`Error on Reviews: $conn->error`)</script>"); }
?>