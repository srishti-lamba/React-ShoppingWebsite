$(document).ready(function() {

    // Page height
    function setMinHeight() {
        var navHeight = $("header").outerHeight(true);
        $("#main-image").css("min-height", $(window).height() - navHeight);
    };

    $(window).resize(function () {
        setMinHeight();
    });

    // Search check
    $("#reviewSearchForm input").blur(function(){
        checkSearchInput();
    });

    // Star rating
    $("#reviewStars label").css("color", "lightgray");

    $("input[type='radio'][name='reviewRating']").change(function () {
        let value = $(this).val();
        $("#reviewStarsText").html(`${value} stars`);

        $("#reviewStars label").css("color", "");
    });

    setMinHeight();

});

// -------------------
// --- Submit Form ---
// -------------------

function submitEmpty() {
    $("#emptyForm").submit();
}

function submitReviewSearch() {
    $("#reviewSearchForm").submit();
}

function submitReviewWrite() {
    $("#writeReviewForm").submit();
}

// --------------------
// --- Search Check ---
// --------------------

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

// ------------------------
// --- Fill Information ---
// ------------------------

function fillDatalist(data) {
    $("#searchItemList").html(data);
}

function fillReviews(data) {        
    $("#reviewCards").html(data);
}

function showWriteReview(userID, itemID) {

    $("#reviewUserID").val(userID);
    $("#reviewItemID").val(itemID);

    $("#writeReviewForm").css("display", "block");
}