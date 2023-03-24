$(document).ready(function () {

    $('#tableName').change(function () {
        $("#tableNameForm").submit();
    });

});

function showErrorMessage(error) {
    $("#errorMsg").html(error);
}

function displayTable(tableHtml) {
    $("#tableView").css("display", "block");
    $("#tableView table").html(tableHtml);
    $("#tableView p").html(columnArray[0][0].toUpperCase() + " TABLE");
}

function updateQueryDisplay() {
    $("#queryDisplay").html(queryDisplay);
}

function submitQuery() {
    $("#querySubmit").val(querySQL);
    $("#querySubmitForm").submit();
}