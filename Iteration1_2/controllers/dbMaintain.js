var queryDisplay = "";
var querySQL = "";

$(document).ready(function () {

    $('#tableName').change(function () {
        $("#tableNameForm").submit();
    });

    // Page height
    function setMinHeight() {
        var navHeight = $("header").outerHeight(true);
        $("#main-image").css("min-height", $(window).height() - navHeight);
    };

    $(window).resize(function () {
        setMinHeight();
    });

    setMinHeight();

});

function showErrorMessage(error) {
    $("#main-title + .box").css("display", "block");
    $("#errorMsg").css("display", "block");
    $("#errorMsg").html(error);
}

function showInputAndQuery() {
    $("#inputValuesForm").css("display", "block");
    $("#queryDiv").css("display", "block");
}

function displayTable(tableHtml) {
    $("#tableView").css("display", "block");
    $("#tableView table").html(tableHtml);
    $("#tableView p").html(columnArray[0][0].toUpperCase() + " TABLE");

    if ($("#tableView table").width() >= $('#tableView').width()) {
        $("#tableView table").css("width", "100%");
    }
}

function updateQueryDisplay() {
    $("#queryDisplay").html(queryDisplay);
}

function submitQuery() {
    $("#querySubmit").val(querySQL);
    $("#querySubmitForm").submit();
}