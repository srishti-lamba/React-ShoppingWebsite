<?php 
    require("./NavBar.php");
    unset($_SESSION['orderConfirmationMessage']);
?>

<!DOCTYPE html>
<html>
    <head>
        <title>About Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/reviews.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="../controllers/reviews.js"></script>
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

            <!-- Result -->
            <div class="box" style="display:none">
                <div id="successMsg">Your review has been posted.</div>
                <div id="errorMsg"></div>
            </div>

            <!-- Item -->
            <div id="reviewItem" class="box">
                <h4></h4>
                <img>
            </div>

            <!-- Review Cards -->
            <div id="reviewCards"></div>  

            <!-- Write Review -->
            <form id="writeReviewForm" action="../models/getReviews.php" method="POST">
                <div class="box">
                    <h4>WRITE A REVIEW</h4>

                    <input id="reviewUserID" type="text" name="reviewUserID" style="display: none">
                    <input id="reviewItemID" type="text" name="reviewItemID" style="display: none">
                    <input id="reviewItemName" type="text" name="reviewItemName" style="display: none">
                    <input id="reviewItemURL" type="text" name="reviewItemURL" style="display: none">

                    <div id="reviewStars">
                        <input type="radio" id="star1" name="reviewRating" value="1" />
                        <label for="star1" title="text" class="star"> <span class="visuallyHidden">1</span> <i class="fa fa-star fa-lg"></i> </label>

                        <input type="radio" id="star2" name="reviewRating" value="2" />
                        <label for="star2" title="text" class="star"> <span class="visuallyHidden">2</span> <i class="fa fa-star fa-lg"></i> </label>

                        <input type="radio" id="star3" name="reviewRating" value="3" />
                        <label for="star3" title="text" class="star"> <span class="visuallyHidden">3</span> <i class="fa fa-star fa-lg"></i> </label>

                        <input type="radio" id="star4" name="reviewRating" value="4" />
                        <label for="star4" title="text" class="star"> <span class="visuallyHidden">4</span> <i class="fa fa-star fa-lg"></i> </label>

                        <input type="radio" id="star5" name="reviewRating" value="5" />
                        <label for="star5" title="text" class="star"> <span class="visuallyHidden">5</span> <i class="fa fa-star fa-lg"></i> </label>

                        <span id="reviewStarsText" class="visuallyHidden"></span>
                    </div>

                    <div>
                        <label for="reviewTitle">Title:</label>
                        <input id="reviewTitle" type="text" name="reviewTitle" placeholder="Enter title...">
                    </div>

                    <div>
                        <label for="reviewContent">Review:</label>
                        <textarea id="reviewContent" name="reviewContent" rows="10" maxlength="1000" placeholder="Write review..."></textarea>
                    </div>

                    <button class="submit" type="button" name="reviewWrite" value="reviewWrite" onclick="submitReviewWrite()">Submit</button>
                </div> 
            </form>

        </div>
    </body>
</html>

<?php
   
    function echoJavascript($script) {
        echo "<script type='text/javascript'>$script</script>";
    }

    function consoleLog($script) {
        echoJavascript("console.log(`$script`);");
    }

    // Search already set
    if( isset($_GET['search']) && !isset($_SESSION['review-reviews']) ) {
        echoJavascript("submitReviewSearch(`" . $_GET['search'] . "`);");
        exit;
    }

    // Items
    if (isset($_SESSION['review-items'])) {
        echoJavascript("fillDatalist(`" . $_SESSION['review-items'] . "`)");
        unset($_SESSION['review-items']);
    }
    else {
        echoJavascript("submitEmpty();");
        exit;
    }

    // Error
    if (isset($_SESSION['review-error'])) {
        echoJavascript("showErrorMsg('" . $_SESSION['review-error'] . "');");
        unset($_SESSION['review-error']);
    }

    // Success
    if (isset($_SESSION['review-success'])) {
        echoJavascript("showSuccessMsg();");
        unset($_SESSION['review-success']);
    }

    // Write
    if (  isset($_SESSION['review-searchInfo']) && isset($_SESSION['userId']) && $_SESSION['review-reviews'] != "" ) {
        echoJavascript("showWriteReview('" . $_SESSION['userId'] . "', '" . 
            $_SESSION['review-searchInfo'][0] . "', '" . 
            $_SESSION['review-searchInfo'][1] . "', '" . 
            $_SESSION['review-searchInfo'][2] . "');");
    }

    // Search Info
    if (isset($_SESSION['review-searchInfo'])) {
        echoJavascript("fillItemInfo(`" .  
            $_SESSION['review-searchInfo'][1] . "`, `" . 
            $_SESSION['review-searchInfo'][2] . "`)");
        unset($_SESSION['review-searchInfo']);
    }

    // Reviews
    if (isset($_SESSION['review-reviews'])) {
        echoJavascript("fillReviews(`" . $_SESSION['review-reviews'] . "`)");
        unset($_SESSION['review-reviews']);
    }
?>