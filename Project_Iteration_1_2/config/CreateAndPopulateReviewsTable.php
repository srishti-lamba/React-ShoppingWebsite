<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $queryDrop = "DROP TABLE Reviews;";

    $queryCreate = "CREATE TABLE Reviews(
        reviewId INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        userID INT(6) NOT NULL REFERENCES Users(user_id),
        itemID INT(6) NOT NULL REFERENCES Items(item_id),
        dateTime TIMESTAMP,
        rating INT(1) NOT NULL CHECK(rating >= 0 AND rating <= 5),
        title VARCHAR(50) NOT NULL,
        content VARCHAR(500) NOT NULL);";

    $query1 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('3', '1', '2023-01-16', '4', 'Family loves it!', 'My family loves this couch! It is well made and it\'s quality is really good. Shipping was super fast!') ";

    $query2 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('4', '1', '2023-02-25', '5', 'Will be coming back!', 'I purchased a sofa last month and I couldn\'t be happier with my purchase. The whole process was seamless. Delivery was fast and on time and the quality was amazing. Whenever I need furniture I will make sure to purchase from Smart Customer Service.') ";
        
    $query3 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content)
              VALUES ('5', '1', '2023-03-17' , '5', 'Easy to use!', 'I made a purchase a few months ago and can not complain. The online store is very well desgined and easy to use and makes online shopping easy!') ";
    
    $query4 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('3', '2', '2023-03-18', '1', 'Smaller than expected', 'It\'s smaller than I thought! I\'ll need to get a replacement.') ";

    $query5 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('4', '2', '2023-01-28', '4', 'Love the colour!', 'The colour is great and matches all my furniture! The material looks high quality too.') ";

    $query6 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('5', '3', '2022-11-20', '3', 'Smaller than I thought', 'It\'s smaller than I thought, but the shipping was super fast! The service is amazing. They refunded my order immediately.') ";

    $query7 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('3', '4', '2022-6-16', '4', 'Love the material!', 'The material is great! It feels very soft.') ";

    $query8 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('4', '5', '2023-02-19', '5', 'Huge storage!', 'There's tons of storage inside! It looks fabulous too!') ";

    $query9 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('5', '6', '2023-01-29', '1', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

    $query10 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('3', '7', '2022-07-03', '3', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

    $query11 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('4', '8', '2022-10-13', '5', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

    $query12 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('5', '9', '2022-9-11', '2', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

    $query13 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('3', '', '2023-01-25', '4', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

    $query14 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('4', '', '2022-11-13', '5', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

    $query15 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('5', '', '2023-02-02', '3', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

    $query16 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('3', '', '2023-01-10', '2', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

    $query17 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('4', '', '2023-03-03', '5', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

    $query18 = "INSERT INTO Reviews (userID, itemID, dateTime, rating, title, content) 
            VALUES ('5', '', '2022-12-31', '4', 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.') ";

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
        $conn->query($query6);
        $conn->query($query7);
        $conn->query($query8);
        $conn->query($query9);
        $conn->query($query10);
        $conn->query($query11);
        $conn->query($query12);
        $conn->query($query13);
        $conn->query($query14);
        $conn->query($query15);
        $conn->query($query16);
        $conn->query($query17);
        $conn->query($query18);
    }
    catch(mysqli_sql_exception $exception)
    { echo("<script>console.log(`Error on Reviews: $conn->error`)</script>"); }
?>