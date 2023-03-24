$(document).ready(function() {

    // Page height
    function setMinHeight() {
        var navHeight = $("header").outerHeight(true);
        $("#main-image").css("min-height", $(window).height() - navHeight);
    };

    $(window).resize(function () {
        setMinHeight();
    });

    $("#reviewSearchForm input").blur(function(){
        checkSearchInput();
    });

    setMinHeight();

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

        resultHtml += `<div class="card box">`;
        resultHtml +=       `<div class="user-container">`;
        resultHtml +=           `<img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/>`;
        resultHtml +=           `<div class="reviewInfo">`;
        resultHtml +=               `<h3>${reviewArray[i][1]}</h3>`;            //Name
            
        for (let star = 0; star < parseInt(reviewArray[i][4]); star++) {
            resultHtml +=           `<i class="fa fa-star star"></i>`;          //Rating
        }

        for (let star = parseInt(reviewArray[i][4]); star < 5; star++) {
            resultHtml +=           `<i class="fa fa-star-o star"></i>`;        //Rating
        }
            
        resultHtml +=           `</div>`;
        resultHtml +=       `</div>`;
        resultHtml +=       `<h4>${reviewArray[i][5]}</h4>`;                    //Title
        resultHtml +=       `<p class="review">${reviewArray[i][6]}</p>`;       //Content
        resultHtml += `</div>`;

    }
        
    $("#reviewCards").html(resultHtml);

    if (resultHtml != "")
        { $("#writeReviewForm").css("display", "block"); }
}