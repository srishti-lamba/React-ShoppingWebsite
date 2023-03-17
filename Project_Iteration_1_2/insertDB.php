<?php
    require("./NavBar.php");
    $columnArray = $_SESSION['db-columns'] ?? null;
?>

<!DOCTYPE html>
<html>
    <head>
        <meta char="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="dbMaintain.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    </head>
    <body>
        <div id="pageBox">
            <!-- Error -->
            <div class="errorMsg"></div>

            <!-- Table Name -->
            <form id="tableNameForm" action="./dbMaintain.php" method="POST">
                <label for="tableName">Table name:</label>
                <select name="tableName" id="tableName">
                    <option value="select" disabled selected hidden>Select table name</option>
                    <option value="users">Users</option>
                    <option value="items">Items</option>
                    <option value="orders">Orders</option>
                    <option value="locations">Locations</option>
                    <option value="trucks">Trucks</option>
                    <option value="trips">Trips</option>
                </select>
            </form>

            <!-- Insert Values -->
            <form id="inputValuesForm" action="./dbMaintain.php" method="POST">
                <hr>
                <label for"inputValues">Values to insert:</label>
                <div id="inputValues"></div>
            </form>

            <!-- Query Display -->
            <p id="queryDisplay"></p>

            <!-- Submit Query -->
            <form id="querySubmitForm" action="./dbMaintain.php" method="POST">
                <input type="text" name="insertQuery" id="querySubmit" style="display: none">
                <button id="querySubmitBtn" type="button" name="submit" onclick="submitQuery()">Run Query</button>
            </form>

            <!-- Table View -->
            <div id="tableView">
                <hr>
                <p></p>
                <table></table>
            </div>
        </div>
    </body>
</html>

<script>
    var columnArray = <?php echo json_encode($columnArray); ?>;
    var queryDisplay = "";
    var querySQL = "";

    $(document).ready(function() {

        $('#tableName').change(function(){
            $("#tableNameForm").submit();
        });

        $('.queryColumn input').change(function(){
            updateQuery();
            $("#querySubmitForm").css("display", "block");
        });

    });

    function showErrorMessage(error) {
        $(".errorMsg").html(error);
    }

    function displayTable(tableHtml) {
        $("#tableView").css("display", "block");
        $("#tableView table").html(tableHtml);
        $("#tableView p").html(columnArray[0][0].toUpperCase() + " TABLE");
    }

    function updateQueryDisplay() {
        //$("#queryDisplay").html("Display: " + queryDisplay + "<br><br>SQL: " + querySQL);
        $("#queryDisplay").html(queryDisplay);
    }

    function displayColumns() {
        $("#inputValuesForm").css("display", "block");

        if (columnArray != "") {
            $("#tableName option[value='select']").prop("selected", false);
            $("#tableName option[value='" + columnArray[0][2] + "']").prop("selected", true);
            var resultHtml = "";
            for (let i = 1; i < columnArray.length; i++) {
                let display = columnArray[i][0];
                let value = columnArray[i][1];

                resultHtml += `<div class='queryColumn'>`;
                resultHtml += `<label for='${value}'>${display}</label>`;
                resultHtml += `<input type='text' name='${value}' id='db-${value}' placeholder='Enter value'>`;
                resultHtml += `</div>`;
            }
            $("#inputValues").html(resultHtml);
        }

        if ( $("#tableView table").width() > $('#tableView').parent().width()) {
            $("#tableView table").css("width", "100%");
        }
    }

    function resetQuery() {
        if (columnArray != "") {
            queryDisplay = `INSERT INTO <div class="bold">${columnArray[0][0]}</div>`;
            querySQL = `INSERT INTO <div class="bold">${columnArray[0][1]}</div>`;
            updateQueryDisplay();
        }
    }

    function updateQuery() {
        resetQuery();

        var disColArr = [];
        var sqlColArr = [];
        var valArr = [];

        $(".queryColumn").each(function(index, domEle) {
            let value = $(this).children("input").val();

            // Getting used columns
            if (value != "") {
                disColArr.push(columnArray[index+1][0]);
                sqlColArr.push(columnArray[index+1][1]);
                valArr.push(value);
            }
        });

        if (disColArr.length > 0) {
            // Part 1 of query
            queryDisplay += "(";
            querySQL += "(";

            for (let i = 0; i < disColArr.length; i++) {
                if (i != 0) {
                    queryDisplay += ", ";
                    querySQL += ", ";
                }
                queryDisplay += disColArr[i];
                querySQL += sqlColArr[i];
            }

            // Part 2 of Query
            queryDisplay += ") VALUES (";
            querySQL += ") VALUES (";

            for (let i = 0; i < valArr.length; i++) {
                if (i != 0) {
                    queryDisplay += ", ";
                    querySQL += ", ";
                }
                queryDisplay += `'<div class="bold">${valArr[i]}</div>'`;
                querySQL += `'<div class="bold">${valArr[i]}</div>'`;
            }

            queryDisplay += ");";
            querySQL += ");";
        }
        updateQueryDisplay();
    }

    function submitQuery() {

    }

</script>

<?php

    function echoJavascript($script) {
        echo "<script type='text/javascript'>$script</script>";
    }

    if(isset($_SESSION['db-tableView']) && $_SESSION['db-tableView'] <> ""){
        echoJavascript("displayTable(`" . $_SESSION['db-tableView'] . "`);");
        echoJavascript("resetQuery();");
        echoJavascript("displayColumns();");
        unset($_SESSION['db-tableView']);
    }

    if(isset($_SESSION['db-error']) && $_SESSION['db-error'] <> ""){
        echoJavascript("showErrorMessage(`" . $_SESSION['db-error'] . "`);");
        unset($_SESSION['db-error']);
    }
?>