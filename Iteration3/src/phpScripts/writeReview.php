<?php

    header('Access-Control-Allow-Origin: *');
    header( 'Location: ' . strtok($_SERVER['HTTP_REFERER'], "?"));

    $result = writeReview();
    //echo "write review ";
    echo $result;

    function writeReview() {
        $userID = $_REQUEST["reviewUserID"];
        $itemID = $_REQUEST["reviewItemID"];
        $rating = 0;
        $title = $_REQUEST["reviewTitle"];
        $content = $_REQUEST["reviewContent"];

        if ( isset($_REQUEST["reviewRating"]) )
            { $rating = $_REQUEST["reviewRating"]; }

        $userID = str_replace("'", "\'", $userID);
        $itemID = str_replace("'", "\'", $itemID);
        $title = str_replace("'", "\'", $title);
        $content = str_replace("'", "\'", $content);

        $query = "INSERT INTO Reviews(userID, itemID, rating, title, content) VALUES ('$userID', '$itemID', '$rating', '$title', '$content');";
        
        $resultSql = writeQuery($query);

        return $resultSql;
    }

    function writeQuery($query) {
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "website";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        $result = "";

        try {
            $conn->query($query);
            $result = "successful";
        }
        catch(mysqli_sql_exception $exception) {
            echo($conn->error);
            $result = $conn->error;
        }

        return $result;
    }

?>