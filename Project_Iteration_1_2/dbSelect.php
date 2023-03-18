<?php
    require("./NavBar.php");
    if (session_id() === "") { session_start(); }

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

            <!-- Result -->
            <div id="errorMsg"></div>
            <div id="successMsg"></div>
            <div id="resultTableView">
                <p></p>
                <table></table>
            </div>

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

            <!-- InputColumns -->
            <div id="inputColumns">
                <hr>
                <label>Columns:</label>
                <div id="inputColumnsBtn"></div>
            </div>

            <!-- Input Values -->
            <form id="inputValuesForm" action="./dbMaintain.php" method="POST">
                <hr>
                <label for"inputValues">Conditions:</label>
                <div id="inputValues"></div>
            </form>

            <!-- Query Display -->
            <p id="queryDisplay"></p>

            <!-- Submit Query -->
            <form id="querySubmitForm" action="./dbMaintain.php" method="POST">
                <input type="text" name="querySubmit" id="querySubmit" style="display: none">
                <input type="text" name="querySubmit-tableName" id="querySubmit-tableName" style="display: none">
                <button id="querySubmitBtn" type="button" name="querySubmitBtn" onclick="submitQuery()">Run Query</button>
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
    var resultTableName = "";

    $(document).ready(function() {

        $('#tableName').change(function(){
            $("#tableNameForm").submit();
        });

        $('.queryColumn').change(function(){
            updateQuery();
        });

        $('#inputColumnsBtn input[type="checkbox"]').change(function(){
            updateQuery();
        });

    });

    function showErrorMessage(error) {
        $("#errorMsg").html(error);
    }

    function showSuccessMessage() {
        $("#successMsg").html("Here are the query results:");
    }

    function displayTable(tableHtml) {
        $("#tableView").css("display", "block");
        $("#tableView table").html(tableHtml);
        $("#tableView p").html(columnArray[0][0].toUpperCase() + " TABLE");
    }

    function updateQueryDisplay() {
        $("#queryDisplay").html(queryDisplay);
    }

    function displayColumnSelector() {
        $("#inputColumns").css("display", "block");

        if (columnArray != "") {
            var resultHtml = "";
            for (let i = 1; i < columnArray.length; i++) {
                let display = columnArray[i][0];
                let value = columnArray[i][1];

                resultHtml += `<input type="checkbox" id="col-${value}" name="${value}" value="${value}">`;
                resultHtml += `<label for='col-${value}'>${display}</label>`;
            }
            $("#inputColumnsBtn").html(resultHtml);
        }
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
                resultHtml += `<div class='queryColumnBtn'>
                                    <input type="radio" name="queryColumnBtn-${value}" value="<"  id="db-${value}-<" ><label        for="db-${value}-<" >\<</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value="<=" id="db-${value}-<="><label        for="db-${value}-<=">\<=</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value="="  id="db-${value}-=" checked><label for="db-${value}-=" >=</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value="!=" id="db-${value}-!="><label        for="db-${value}-!=">!=</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value=">=" id="db-${value}->="><label        for="db-${value}->=">>=</label>
                                    <input type="radio" name="queryColumnBtn-${value}" value=">"  id="db-${value}->" ><label        for="db-${value}->" >></label>
                               </div>`;
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
            queryDisplay = `SELECT * FROM <div class="bold">${columnArray[0][0]}</div>`;
            querySQL = `SELECT * FROM ${columnArray[0][1]}`;
            updateQueryDisplay();
        }
    }

    function updateQuery() {
        resetQuery();

        // Getting selected columns
        var selDisColArr = [];
        var selSqlColArr = [];

        $("#inputColumnsBtn input[type='checkbox']").each(function(index, domEle) {
            let dis = columnArray[index+1][0];
            let sql = columnArray[index+1][1];
            let isChecked = $(this).prop("checked");

            if (isChecked == true) {
                selDisColArr.push(dis);
                selSqlColArr.push(sql);
            }
        });

        // Getting conditions
        var disColArr = [];
        var sqlColArr = [];
        var valArr = [];
        var cmpArr = [];

        $(".queryColumn").each(function(index, domEle) {
            let dis = columnArray[index+1][0];
            let sql = columnArray[index+1][1];
            let value = $(this).children("input").val();
            let comp = $( `input[name='queryColumnBtn-${sql}']:checked` ).val();

            if (value != "") {
                disColArr.push(dis);
                sqlColArr.push(sql);
                valArr.push(value);
                cmpArr.push(comp);
            }
        });

        // Appending selected columns
        if (selDisColArr.length > 0) {
            $("#querySubmitForm").css("display", "block");
            queryDisplay = `SELECT `;
            querySQL = `SELECT `;

            for (let i = 0; i < selDisColArr.length; i++) {
                if (i != 0) {
                    queryDisplay += ", ";
                    querySQL += ", ";
                }
                queryDisplay += `<div class="bold">${selDisColArr[i]}</div>`;
                querySQL += `${selSqlColArr[i]}`;
            }

            queryDisplay += ` FROM <div class="bold">${columnArray[0][0]}</div>`;
            querySQL += ` FROM ${columnArray[0][1]}`;
        }


        // Appending conditions
        if (disColArr.length > 0) {
            $("#querySubmitForm").css("display", "block");
            queryDisplay += " WHERE ";
            querySQL += " WHERE ";

            for (let i = 0; i < disColArr.length; i++) {
                if (i != 0) {
                    queryDisplay += " AND ";
                    querySQL += " AND ";
                }
                queryDisplay += `(${disColArr[i]} ${cmpArr[i]} '<div class="bold">${valArr[i]}</div>')`;
                querySQL += `(${sqlColArr[i]} ${cmpArr[i]} '${valArr[i]}')`;
            }

            queryDisplay += ";";
            querySQL += ";";
        }
        updateQueryDisplay();
    }

    function submitQuery() {
        $("#querySubmit").val(querySQL);
        $("#querySubmit-tableName").val(columnArray[0][2]);
        $("#querySubmitForm").submit();
    }

    function showQueryResult(tableHtml) {
        $("#resultTableView").css("display", "block");
        $("#resultTableView table").html(tableHtml);
        $("#resultTableView p").html(columnArray[0][0].toUpperCase() + " TABLE");
    }

</script>

<?php

    function echoJavascript($script) {
        echo "<script type='text/javascript'>$script</script>";
    }

    function consoleLog($script) {
        echoJavascript("console.log(`$script`);");
    }

    if(isset($_SESSION['db-success']) && $_SESSION['db-success'] == true){
        echoJavascript("showSuccessMessage();");
        echoJavascript("resultTableName = " . $_SESSION['db-columns'][0][0] . ".toUpperCase()");        
        echoJavascript("showQueryResult(`" . $_SESSION['db-tableView'] . "`)");

        consoleLog($_SESSION['db-tableView']);
        unset($_SESSION['db-success']);
        unset($_SESSION['db-error']);
        unset($_SESSION['db-tableView']);
        unset($_SESSION['db-columns']);
    }

    if(isset($_SESSION['db-error']) && $_SESSION['db-error'] <> ""){
        echoJavascript("showErrorMessage(`" . $_SESSION['db-error'] . "`);");
        unset($_SESSION['db-error']);
    }

    if(isset($_SESSION['db-tableView']) && $_SESSION['db-tableView'] <> ""){
        consoleLog(isset($_SESSION['db-columns']));
        consoleLog($_SESSION['db-columns'][0][0]);

        echoJavascript("displayTable(`" . $_SESSION['db-tableView'] . "`);");
        echoJavascript("resetQuery();");
        echoJavascript("displayColumnSelector();");
        echoJavascript("displayColumns();");
        unset($_SESSION['db-tableView']);
    }

?>