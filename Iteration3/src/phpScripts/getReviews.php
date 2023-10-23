<?php
    header('Access-Control-Allow-Origin: *');
    
    // Get Reviews
    if ( isset($_REQUEST["searchItem"]) ) {
        getReviews();
        exit;
    }

    function getReviews() {
        $query = 
            "SELECT Reviews.reviewID, Users.userName, Items.item_id, Items.productName, Items.image_url, Reviews.dateTime, Reviews.rating, Reviews.title, Reviews.content 
                FROM Reviews 
                INNER JOIN Items
                    ON Reviews.itemID = Items.item_id
                INNER JOIN Users
                    ON Reviews.userID = Users.user_id
                WHERE Items.productName = '" . $_REQUEST["searchItem"] . "';";
        
        $resultSql = sendQuery($query);
        $colNum = $resultSql->field_count;

        $arr = [];
        // For each row
        while ( $data = $resultSql->fetch_array() ) {
            // For each column
			$row = [];
            for ($i = 0; $i < $colNum; $i++) 
				{ array_push($row, $data[$i]); }
			array_push($arr, $row);
        }

        echo json_encode($arr);
    }

    function sendQuery($query) {
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "website";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        $resultSql = "";

        try {
            $resultSql = $conn->query($query);
        }
        catch(mysqli_sql_exception $exception) {
            echo($conn->error);
            //$_SESSION['review-error'] = $conn->error;
            exit;
        }

        return $resultSql;
    }
?>
