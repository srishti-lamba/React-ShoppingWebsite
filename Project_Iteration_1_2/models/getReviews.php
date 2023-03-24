<?php
    session_start();
    
    include("../config/CreateAndPopulateUsersTable.php");
    include("../config/CreateAndPopulateItemsTable.php");
    include("../config/CreateAndPopulateReviewsTable.php");


    // Get Reviews
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
	    if ( isset($_POST["searchItem"]) ) {
            getReviews();
            header( 'Location: ' . $_SERVER['HTTP_REFERER'] );
            exit;
        }
        // Get Items
        else {
            getItems();
            header( 'Location: ' . $_SERVER['HTTP_REFERER'] );
            exit;
        }
        
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
            echo "success";
        }
        catch(mysqli_sql_exception $exception) {
            echo("<script>console.log(`Error on getReviews.php: $conn->error`)</script>");
            exit;
        }

        $resultArray = [];

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
        }

        $_SESSION['review-reviews'] = $resultArray;
    }

?>
