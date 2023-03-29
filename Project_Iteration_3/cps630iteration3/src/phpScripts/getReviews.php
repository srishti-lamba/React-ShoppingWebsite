<?php
    session_start();
    header('Access-Control-Allow-Origin: *');
    
    // Get Reviews
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // Get Reviews
	    if ( isset($_POST["searchItem"]) ) {
            getReviews();
        }

        // Write Review
        else if ( isset($_POST["reviewUserID"]) &&  isset($_POST["reviewItemID"]) &&
                isset($_POST["reviewTitle"]) && $_POST["reviewTitle"] != "" &&
                isset($_POST["reviewContent"]) && $_POST["reviewContent"] != "" ) {
            $_SESSION['review-searchInfo'] = array($_POST["reviewItemID"], $_POST["reviewItemName"], $_POST["reviewItemURL"]);
            writeReview();
        }

        // Write Review failed
        else if ( isset($_POST["reviewWrite"]) ) {
            $_SESSION['review-error'] = "Please fill all fields to submit a review.";
            $_SESSION['review-searchInfo'] = array($_POST["reviewItemID"], $_POST["reviewItemName"], $_POST["reviewItemURL"]);
        }

        // Get Items
        else {
            getItems();
        }

        exit;
    }

    // -----------------
    // --- Get Items ---
    // -----------------

    function getItems() {
        $query = "SELECT item_id, productName FROM Items;";

        $resultSql = sendQuery($query);
        $resultHtml = getDatalistHTML($resultSql);

        $_SESSION['review-items'] = $resultHtml;
    }

    // -------------------
    // --- Get Reviews ---
    // -------------------

    function getReviews() {
        $query = 
            "SELECT Reviews.reviewID, Users.userName, Items.item_id, Items.productName, Items.image_url, Reviews.dateTime, Reviews.rating, Reviews.title, Reviews.content 
                FROM Reviews 
                INNER JOIN Items
                    ON Reviews.itemID = Items.item_id
                INNER JOIN Users
                    ON Reviews.userID = Users.user_id
                WHERE Items.productName = '" . $_POST["searchItem"] . "';";
        
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

    // --------------------
    // --- Write Review ---
    // --------------------

    function writeReview() {
        $userID = $_POST["reviewUserID"];
        $itemID = $_POST["reviewItemID"];
        $rating = 0;
        $title = $_POST["reviewTitle"];
        $content = $_POST["reviewContent"];

        if ( isset($_POST["reviewRating"]) )
            { $rating = $_POST["reviewRating"]; }

        $userID = str_replace("'", "\'", $userID);
        $itemID = str_replace("'", "\'", $itemID);
        $title = str_replace("'", "\'", $title);
        $content = str_replace("'", "\'", $content);

        $query = "INSERT INTO Reviews(userID, itemID, rating, title, content) VALUES ('$userID', '$itemID', '$rating', '$title', '$content');";
        
        $resultSql = writeQuery($query);
    }

    // ------------------------
    // --- Helper Functions ---
    // ------------------------

    function sendQuery($query) {
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        $resultSql = "";

        try {
            $resultSql = $conn->query($query);
        }
        catch(mysqli_sql_exception $exception) {
            echo("<script>console.log(`Error on getReviews.php: $conn->error`)</script>");
            $_SESSION['review-error'] = $conn->error;
            exit;
        }

        return $resultSql;
    }

    function writeQuery($query) {
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        try {
            $conn->query($query);
            $_SESSION['review-success'] = true;
        }
        catch(mysqli_sql_exception $exception) {
            echo("<script>console.log(`Error on getReviews.php: $conn->error`)</script>");
            $_SESSION['review-error'] = $conn->error;
            exit;
        }

        return $resultSql;
    }

    function getDatalistHTML($resultSql) {
        $resultHtml = "";

        while ( $row = $resultSql->fetch_array() ) {

            $id = $row['item_id'];
            $name = $row['productName'];

            $resultHtml .= "<option value='$name'>";
        }

        return $resultHtml;
    }
?>
