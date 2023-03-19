<?php
    require("./NavBar.php");
    $columnArray = $_SESSION['db-columns'] ?? null;
?>

<!DOCTYPE html>
<html>
    <head>
        <meta char="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="../css/dbMaintain.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    </head>
    <body>
        <div id="pageBox">

            <h1>DATABASE: UPDATE</h1>

            <!-- Result -->
            <div id="errorMsg"></div>
            <div id="successMsg"></div>

            <!-- Table Name -->
            <form id="tableNameForm" action="../controllers/dbMaintain.php" method="POST">
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

            <form id="inputValuesForm" action="../controllers/dbMaintain.php" method="POST">
                <!-- Input Values -->
                <hr>
                <label for"inputValues">New Values:</label>
                <div id="inputValues"></div>

                <!-- Condition Values -->
                <hr>
                <label for"conditionValues">Conditions:</label>
                <div id="conditionValues"></div>
            </form>

            <!-- Query Display -->
            <p id="queryDisplay"></p>

            <!-- Submit Query -->
            <form id="querySubmitForm" action="../controllers/dbMaintain.php" method="POST">
                <input type="text" name="querySubmit" id="querySubmit" style="display: none">
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
        $("#successMsg").html("Record(s) have been successfully updated.");
    }

    function displayTable(tableHtml) {
        $("#tableView").css("display", "block");
        $("#tableView table").html(tableHtml);
        $("#tableView p").html(columnArray[0][0].toUpperCase() + " TABLE");
    }

    function updateQueryDisplay() {
        $("#queryDisplay").html(queryDisplay);
    }

    function displayInputs() {
        $("#inputValuesForm").css("display", "block");

        if (columnArray != "") {
            $("#tableName option[value='select']").prop("selected", false);
            $("#tableName option[value='" + columnArray[0][2] + "']").prop("selected", true);
            var resultHtml = "";
            for (let i = 1; i < columnArray.length; i++) {
                let display = columnArray[i][0];
                let value = columnArray[i][1];

                resultHtml += `<div class='queryColumn queryColumnInput'>`;
                resultHtml += `<label for='${value}'>${display}</label>`;
                resultHtml += `<input type='text' name='${value}' id='db-${value}' placeholder='Enter value'>`;
                resultHtml += `</div>`;
            }
            $("#inputValues").html(resultHtml);

            if ( $("#tableView table").width() > $('#tableView').parent().width()) {
                $("#tableView table").css("width", "100%");
            }

            displayConditions();
        }
    }

    function displayConditions() {
        $("#inputValuesForm").css("display", "block");

        if (columnArray != "") {
            $("#tableName option[value='select']").prop("selected", false);
            $("#tableName option[value='" + columnArray[0][2] + "']").prop("selected", true);
            var resultHtml = "";
            for (let i = 1; i < columnArray.length; i++) {
                let display = columnArray[i][0];
                let value = columnArray[i][1];

                resultHtml += `<div class='queryColumn queryColumnCondition'>`;
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
            $("#conditionValues").html(resultHtml);
        }
    }

    function resetQuery() {
        if (columnArray != "") {
            queryDisplay = `UPDATE <div class="bold">${columnArray[0][0]}</div>`;
            querySQL = `UPDATE ${columnArray[0][1]}`;
            updateQueryDisplay();
        }
    }

    function updateQuery() {
        resetQuery();

        // Getting input
        var disColArr = [];
        var sqlColArr = [];
        var valArr = [];

        $(".queryColumnInput").each(function(index, domEle) {
            let dis = columnArray[index+1][0];
            let sql = columnArray[index+1][1];
            let value = $(this).children("input").val();
            let comp = $( `input[name='queryColumnBtn-${sql}']:checked` ).val();

            // Getting used columns
            if (value != "") {
                disColArr.push(dis);
                sqlColArr.push(sql);
                valArr.push(value);
            }
        });

        // Appending input
        if (disColArr.length > 0) {
            $("#querySubmitForm").css("display", "block");
            queryDisplay += " SET ";
            querySQL += " SET ";

            for (let i = 0; i < disColArr.length; i++) {
                if (i != 0) {
                    queryDisplay += ", ";
                    querySQL += ", ";
                }
                queryDisplay += `${disColArr[i]} = '<div class="bold">${valArr[i]}</div>'`;
                querySQL += `${sqlColArr[i]} = '${valArr[i]}'`;
            }

            // Getting conditions
            var conDisColArr = [];
            var conSqlColArr = [];
            var conValArr = [];
            var cmpArr = [];

            $(".queryColumnCondition").each(function(index, domEle) {
                let dis = columnArray[index+1][0];
                let sql = columnArray[index+1][1];
                let value = $(this).children("input").val();
                let comp = $( `input[name='queryColumnBtn-${sql}']:checked` ).val();

                // Getting used columns
                if (value != "") {
                    conDisColArr.push(dis);
                    conSqlColArr.push(sql);
                    conValArr.push(value);
                    cmpArr.push(comp);
                }
            });
        
            // Appending conditions
            if (conDisColArr.length > 0) {
                $("#querySubmitForm").css("display", "block");
                queryDisplay += " WHERE ";
                querySQL += " WHERE ";

                for (let i = 0; i < conDisColArr.length; i++) {
                    if (i != 0) {
                        queryDisplay += " AND ";
                        querySQL += " AND ";
                    }
                    queryDisplay += `(${conDisColArr[i]} ${cmpArr[i]} '<div class="bold">${conValArr[i]}</div>')`;
                    querySQL += `(${conSqlColArr[i]} ${cmpArr[i]} '${conValArr[i]}')`;
                }
            }

            queryDisplay += ";";
            querySQL += ";";
            updateQueryDisplay();
        }
    }

    function submitQuery() {
        $("#querySubmit").val(querySQL);
        $("#querySubmitForm").submit();
    }

</script>

<?php

    function echoJavascript($script) {
        echo "<script type='text/javascript'>$script</script>";
    }

    function consoleLog($script) {
        echoJavascript("console.log('$script');");
    }

    if(isset($_SESSION['db-success']) && $_SESSION['db-success'] == true){
        echoJavascript("showSuccessMessage();");
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
        echoJavascript("displayTable(`" . $_SESSION['db-tableView'] . "`);");
        echoJavascript("resetQuery();");
        echoJavascript("displayInputs();");
        unset($_SESSION['db-tableView']);
    }

?>