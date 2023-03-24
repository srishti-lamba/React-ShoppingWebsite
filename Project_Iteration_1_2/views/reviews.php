<?php 
    require("./NavBar.php");
    unset($_SESSION['orderConfirmationMessage']);

    $reviewArray = $_SESSION['review-reviews'] ?? null;
?>

<!DOCTYPE html>
<html>
    <head>
        <title>About Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/reviews.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>        
        <!-- Page -->
        <div id="main-image">
        
            <!-- Title -->
            <article id="main-title">
                <h1>Reviews</h1>
            </article>

            <!-- Search -->
            <form id="emptyForm" action="../models/getReviews.php" method="POST"></form>
            <form id="reviewSearchForm" class="box" action="../models/getReviews.php" method="POST">
                <label for="searchItemList">Search:</label>
                <input list="searchItemList" name="searchItem" placeholder="Enter item to search...">
                <datalist id="searchItemList"></datalist>
                <button class="submit" type="button" name="reviewSearch" value="reviewSearch" onclick="submitReviewSearch()" style="display: none">Go</button>
            </form>

            <!-- Review Cards -->
            <div id="reviewCards"></div>  

            <!-- Write Review -->
            <form id="writeReviewForm" action="../models/getReviews.php" method="POST">
                <div class="box">
                    <h4>WRITE A REVIEW</h4>

                    <div>
                        <label for="reviewTitle">Title:</label>
                        <input name="reviewTitle" placeholder="Enter title...">
                    </div>

                    <div>
                        <label for="reviewContent">Review:</label>
                        <textarea name="reviewContent" rows="10" maxlength="1000" placeholder="Write review..."></textarea>
                    </div>

                    <button class="submit" type="button" name="reviewWrite" value="reviewWrite" onclick="submitReviewWrite()">Submit</button>
                </div> 
            </form>

        </div>
    </body>
</html>

<script> var reviewArray = <?php echo json_encode($reviewArray); ?>; </script>
<script src="../controllers/reviews.js"></script>

<?php
   
    function echoJavascript($script) {
        echo "<script type='text/javascript'>$script</script>";
    }

    function consoleLog($script) {
        echoJavascript("console.log('$script');");
    }

    # Items
    if (isset($_SESSION['review-items'])) {
        echoJavascript("fillDatalist(\"" . $_SESSION['review-items'] . "\")");
        unset($_SESSION['review-items']);
    }
    else {
        echoJavascript("submitEmpty();");
    }

    # Reviews
    if ( isset($_SESSION['review-reviews']) ) {
        echoJavascript("fillReviews();");
    }

?>