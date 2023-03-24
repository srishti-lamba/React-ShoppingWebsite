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
        <div class="main-image">
        
            <!-- Title -->
            <article class="main-title">
                <h1>Reviews</h1>
            </article>

            <!-- Search -->
            <form id="emptyForm" action="../models/getReviews.php" method="POST"></form>
            <form id="reviewSearchForm" action="../models/getReviews.php" method="POST">
                <label for="searchItemList">Search:</label>
                <input list="searchItemList" name="searchItem" placeholder="Enter item to search...">
                <datalist id="searchItemList"></datalist>
                <button class="submit" type="button" name="reviewSearch" value="reviewSearch" onclick="submitReviewSearch()" style="display: none">Go</button>
            </form>

            <!-- Review Cards -->
            <main>
                <div class="reviewCards"></div>  
            </main>
        </div>
    </body>
</html>

<script>
    var reviewArray = <?php echo json_encode($reviewArray); ?>;

    $(document).ready(function() {

        $("#reviewSearchForm input").blur(function(){
            checkSearchInput();
        });

    });

    function submitReviewSearch() {
        $("#reviewSearchForm").submit();
    }

    function submitEmpty() {
        $("#emptyForm").submit();
    }

    function checkSearchInput() {
        var searchVal = $('#reviewSearchForm input').val();
        var foundMatch = false;

        $("#searchItemList option").each(function(index, domEle) {
            let optionVal = $(this).val().toLowerCase();

            if ( searchVal.toLowerCase() === optionVal.toLowerCase() ) {
                foundMatch = true;
                return false; //break
            }
        });

        if (foundMatch == false) {
            $('#reviewSearchForm input').val("");
        }
    }

    function fillDatalist(data) {
        $("#searchItemList").html(data);
    }

    function fillReviews() {
        var resultHtml = "";

        for (let i = 0; i < reviewArray.length; i++) {

            resultHtml += `<div class="card">`;
            resultHtml +=       `<div class="user-container">`;
            resultHtml +=           `<img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/>`;
            resultHtml +=           `<div class="reviewInfo">`;
            resultHtml +=               `<p>${reviewArray[i][1]}</p>`;
            
            for (let star = 0; star < parseInt(reviewArray[i][4]); star++) {
                resultHtml +=           `<i class="fa fa-star checked"></i>`;
            }
            
            resultHtml +=           `</div>`;
            resultHtml +=       `</div>`;
            resultHtml +=       `<p class="review center">${reviewArray[i][6]}</p>`;
            resultHtml += `</div>`;

        }
        
        $(".reviewCards").html(resultHtml);
    }

</script>

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