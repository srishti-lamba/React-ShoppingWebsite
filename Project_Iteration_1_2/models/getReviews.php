<?php
    session_start();
    
    include("../config/CreateAndPopulateUsersTable.php");
    include("../config/CreateAndPopulateItemsTable.php");
    include("../config/CreateAndPopulateReviewsTable.php");


    // Get Reviews
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // Get Reviews
	    if ( isset($_POST["searchItem"]) ) {
            echo("<script>console.log(`Getting Reviews`)</script>");
            getReviews();
        }

        // Write Review
        else if ( isset($_POST["reviewUserID"]) && isset($_POST["reviewItemID"]) && isset($_POST["reviewRating"]) && isset($_POST["reviewTitle"]) && isset($_POST["reviewContent"]) ) {
            writeReview();
        }

        // Get Items
        else {
            echo("<script>console.log(`Getting Items`)</script>");
            getItems();
            //header( 'Location: ' . $_SERVER['HTTP_REFERER'] );
            //exit;
        }
        
        header( 'Location: ' . $_SERVER['HTTP_REFERER'] );
        exit;
    }

    // -----------------
    // --- Get Items ---
    // -----------------

    function getItems() {

        // Fetch Data
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        $query = "SELECT item_id, productName FROM Items;";
        $resultSql = "";

        try {
            $resultSql = $conn->query($query);
        }
        catch(mysqli_sql_exception $exception) {
            echo("<script>console.log(`Error on getReviews.php: $conn->error`)</script>");
            exit;
        }

        // Convert to HTML
        $resultHtml = "";

        while ( $row = $resultSql->fetch_array() ) {

            $id = $row['item_id'];
            $name = $row['productName'];

            $resultHtml .= "<option value='$name'>";
        }

        $_SESSION['review-items'] = $resultHtml;
    }

    // -------------------
    // --- Get Reviews ---
    // -------------------

    function getReviews() {
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        $query = 
            "SELECT Reviews.reviewID, Users.userName, Items.productName, Reviews.dateTime, Reviews.rating, Reviews.title, Reviews.content 
                FROM Reviews 
                INNER JOIN Items
                    ON Reviews.itemID = Items.item_id
                INNER JOIN Users
                    ON Reviews.userID = Users.user_id
                WHERE Items.productName = '" . $_POST["searchItem"] . "';";
        $resultSql = "";

        try {
            $resultSql = $conn->query($query);
        }
        catch(mysqli_sql_exception $exception) {
            echo("<script>console.log(`Error on getReviews.php: $conn->error`)</script>");
            exit;
        }

        $resultArray = [];
        $resultHtml = "";

        // For each row
        while ( $row = $resultSql->fetch_array() ) {
            $colArr = [];

            array_push($colArr, $row['reviewID']);
            array_push($colArr, $row['userName']);
            array_push($colArr, $row['productName']);
            array_push($colArr, $row['dateTime']);
            array_push($colArr, $row['rating']);
            array_push($colArr, $row['title']);
            array_push($colArr, $row['content']);

            array_push($resultArray, $colArr);

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
        $resultHtml = str_replace("  ", "", $resultHtml);
        $resultHtml = str_replace("  ", "", $resultHtml);
        $resultHtml = str_replace("  ", "", $resultHtml);
        $_SESSION['review-reviews'] = $resultHtml;
    }

    // --------------------
    // --- Write Review ---
    // --------------------

    function writeReview() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $username, $password, $dbname);

        $userID = $_POST["reviewUserID"];
        $itemID = $_POST["reviewItemID"];
        $rating = $_POST["reviewRating"];
        $title = $_POST["reviewTitle"];
        $content = $_POST["reviewContent"];

        $query = "INSERT INTO Reviews(userID, itemID, rating, title, content) VALUES ($userID, $itemID, $rating, $title, $content);";

        try {
            $resultSQL = $conn->query($query);
        }
        catch(mysqli_sql_exception $exception) {
            $_SESSION['db-error'] = $conn->error;
        }
    }

?>
