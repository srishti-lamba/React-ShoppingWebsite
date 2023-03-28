<?php
    session_start();
    header('Access-Control-Allow-Origin: *');
    
    include("../config/CreateAndPopulateUsersTable.php");
    include("../config/CreateAndPopulateItemsTable.php");
    include("../config/CreateAndPopulateReviewsTable.php");


    // Get Reviews
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // Get Reviews
	    if ( isset($_POST["searchItem"]) ) {
            getReviews();
            header( 'Location: ' . strtok($_SERVER['HTTP_REFERER'], "?") . "?search=" . $_POST["searchItem"] );
        }

        // Write Review
        else if ( isset($_POST["reviewUserID"]) &&  isset($_POST["reviewItemID"]) &&
                isset($_POST["reviewTitle"]) && $_POST["reviewTitle"] != "" &&
                isset($_POST["reviewContent"]) && $_POST["reviewContent"] != "" ) {
            $_SESSION['review-searchInfo'] = array($_POST["reviewItemID"], $_POST["reviewItemName"], $_POST["reviewItemURL"]);
            writeReview();
            header( 'Location: ' . strtok($_SERVER['HTTP_REFERER'], "?") . "?search=" . $_POST["reviewItemName"] );
        }

        // Write Review failed
        else if ( isset($_POST["reviewWrite"]) ) {
            $_SESSION['review-error'] = "Please fill all fields to submit a review.";
            $_SESSION['review-searchInfo'] = array($_POST["reviewItemID"], $_POST["reviewItemName"], $_POST["reviewItemURL"]);
            header( 'Location: ' . strtok($_SERVER['HTTP_REFERER'], "?") . "?search=" . $_POST["reviewItemName"] );
        }

        // Get Items
        else {
            getItems();
            header( 'Location: ' . $_SERVER['HTTP_REFERER'] );
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
        $resultHtml = getReviewHTML($resultSql);

        $_SESSION['review-reviews'] = $resultHtml;
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

    function getReviewHTML($resultSql) {
        $resultHtml = "";

        // For each row
        while ( $row = $resultSql->fetch_array() ) {

            // Review-Search ItemID
            if ( !isset($_SESSION['review-searchInfo']) ) {
                $_SESSION['review-searchInfo'] = array($row['item_id'], $row['productName'], $row['image_url']);
            }

            $userName = $row['userName'];
            $starNum = intval($row['rating']);
            $reviewTitle = $row['title'];
            $reviewContent = $row['content'];

            $starHtml = "";
            for ($i = 0; $i < $starNum; $i++) 
                { $starHtml .= "<i class='fa fa-star star-checked'></i>"; }
            for ($x = $starNum; $x < 5; $x++) 
                { $starHtml .= "<i class='fa fa-star star-unchecked'></i>"; }

            $resultHtml .=
                "<div class='card box'>
                    <div class='user-container'>
                        <img src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png'/>
                        <div class='reviewInfo'>
                            <h3>$userName</h3>
                            $starHtml
                            <span class='visuallyHidden'>$starNum stars</span>
                        </div>
                    </div>
                    <h4>$reviewTitle</h4>
                    <p class='review'>$reviewContent</p>
                </div>";
        }

        return $resultHtml;
    }

?>
