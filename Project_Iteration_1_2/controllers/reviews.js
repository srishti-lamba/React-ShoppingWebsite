$(document).ready(function() {

    // Page height
    function setMinHeight() {
        var navHeight = $("header").outerHeight(true);
        $("#main-image").css("min-height", $(window).height() - navHeight);
    };

    $(window).resize(function () {
        setMinHeight();
    });

    // Search enter
    $('#reviewSearchForm input').bind('keypress keydown keyup', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            submitReviewSearch();
        }
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

function submitReviewSearch(data = "") {
    if (data != "") {
        $('#reviewSearchForm input').val(data);
    }
    $("#reviewSearchForm").submit();
}

function submitReviewWrite() {
    if (document.querySelectorAll("input[type='radio'][name='reviewRating']:checked").length === 0 ) {
        $("input[type='radio'][name='reviewRating']").val("0");
    }

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

function fillItemInfo(itemName, itemURL) {
    $("#reviewItem").css("display", "block");
    $("#reviewItem h4").html(itemName);
    $("#reviewItem img").attr("src", itemURL);
}

function fillReviews(data) {        
    $("#reviewCards").html(data);
}

function showWriteReview(userID, itemID, itemName, itemURL) {

    $("#reviewUserID").val(userID);
    $("#reviewItemID").val(itemID);
    $("#reviewItemName").val(itemName);
    $("#reviewItemURL").val(itemURL);

    $("#writeReviewForm").css("display", "block");
}

function showSuccessMsg() {
    $("#reviewSearchForm + .box").css("display", "block");
    $("#successMsg").css("display", "block");
}

function showErrorMsg(msg) {
    $("#reviewSearchForm + .box").css("display", "block");
    $("#errorMsg").css("display", "block");
    $("#errorMsg").html(msg);
}