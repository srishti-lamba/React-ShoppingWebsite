<?php
    require("./NavBar.php");
    $columnArray = $_SESSION['db-columns'] ?? null;
?>

<!DOCTYPE html>
<html>
    <head>
        <meta char="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Database: Insert</title>
        <link rel="stylesheet" href="../css/dbMaintain.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    </head>
    <body>
        <!-- Page -->
        <div id="main-image">

            <!-- Title -->
            <article id="main-title">
                <h1>DATABASE: INSERT</h1>
            </article>

            <!-- Result -->
            <div class="box">
                <div id="errorMsg"></div>
                <div id="successMsg"></div>
            </div>

            <!-- Table Name -->
            <form id="tableNameForm" class="box" action="../models/dbMaintain.php" method="POST">
                <label for="tableName">Table name:</label>
                <select name="tableName" id="tableName">
                    <option value="select" disabled selected hidden>Select table name</option>
                    <option value="users">Users</option>
                    <option value="items">Items</option>
                    <option value="orders">Orders</option>
                    <option value="locations">Locations</option>
                    <option value="trucks">Trucks</option>
                    <option value="trips">Trips</option>
                    <option value="reviews">Reviews</option>
                </select>
            </form>

            <!-- Input Values -->
            <form id="inputValuesForm" class="box" action="../models/dbMaintain.php" method="POST">
                <label for"inputValues">Values to insert:</label>
                <div id="inputValues"></div>
            </form>

            <div id="queryDiv" class="box">
                <!-- Query Display -->
                <p id="queryDisplay"></p>
                
                <!-- Submit Query -->
                <form id="querySubmitForm" action="../models/dbMaintain.php" method="POST">
                    <input type="text" name="querySubmit" id="querySubmit" style="display: none">
                    <button id="querySubmitBtn" type="button" name="querySubmitBtn" onclick="submitQuery()">Run Query</button>
                </form>
            </div>

            <!-- Table View -->
            <div id="tableView" class="box">
                <p></p>
                <table></table>
            </div>

        </div>
    </body>
</html>

<script> var columnArray = <?php echo json_encode($columnArray); ?>; </script>
<script src="../controllers/dbMaintain.js"></script>
<script src="../controllers/dbInsert.js"></script>

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
        unset($_SESSION['db-columns']);
        unset($_SESSION['db-error']);
    }

    if(isset($_SESSION['db-tableView']) && $_SESSION['db-tableView'] <> ""){
        echoJavascript("displayTable(`" . $_SESSION['db-tableView'] . "`);");
        echoJavascript("resetQuery();");
        echoJavascript("displayColumns();");
        unset($_SESSION['db-tableView']);
        unset($_SESSION['db-columns']);
    }
?>