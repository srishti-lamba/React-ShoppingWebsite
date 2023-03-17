<?php
    require("./NavBar.php");
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

        <!-- Insert Columns -->
        <form id="insertValuesForm" action="./dbMaintain.php" method="POST">
            <label for"insertValues">Values to insert:</label>
            <div id="insertValues"></div>
        </form>

        <!-- Insert Query -->
        <p id="insertQuery"></p>

        <!-- Table View -->
        <table id="tableView">
        </table>
    </body>
</html>

<script>
    $(document).ready(function() {

        $('#tableName').change(function(){
            $("#tableNameForm").submit();
        });

    });

    function showErrorMessage(error) {
        $(".errorMsg").html(error);
    }

    function displayTable(tableHtml) {
        $("#tableView").html(tableHtml);
    }

    function showQueryInput() {
        $("#insertQueryForm label:first-child").html("INSERT INTO");
    }

</script>

<?php
    $query = "";

    function resetQuery() {
        if(isset($_SESSION['db-columns']) && count($_SESSION['db-columns']) <> 0){
            $query = "INSERT INTO " . $_SESSION['db-columns'][0][0];
            echo '<script type="text/javascript">$("#insertQuery").html("' . $query . '");</script>';
        }
    }

    function displayColumns() {
        echo '<script type="text/javascript">$("#insertValuesForm>label").css("display", "block");</script>';

        if(isset($_SESSION['db-columns']) && count($_SESSION['db-columns']) <> 0){
            $columnArray = $_SESSION['db-columns'];
            $resultHtml = "";
            for ($i = 1; $i < count($columnArray); $i++) {
                $display = $columnArray[$i][0];
                $value = $columnArray[$i][1];

                $resultHtml .= "<div id='queryColumn'>";
                $resultHtml .= "<label for='$value'>$display</label>";
                $resultHtml .= "<input type='text' name='$value' id='$value' placeholder='Enter value'>";
                $resultHtml .= "</div>";
            }
            echo '<script type="text/javascript">$("#insertValues").html("' . $resultHtml . '");</script>';
        }
    }

    if(isset($_SESSION['db-tableView']) && $_SESSION['db-tableView'] <> ""){
        echo '<script type="text/javascript">displayTable(`' . $_SESSION['db-tableView'] . '`);</script>';
        echo '<script type="text/javascript">console.log(`tableView: ' . $_SESSION['db-tableView'] . '`);</script>';
        unset($_SESSION['db-tableView']);
        resetQuery();
        displayColumns();
    }

    if(isset($_SESSION['db-error']) && $_SESSION['db-error'] <> ""){
        echo '<script type="text/javascript">showErrorMessage(`' . $_SESSION['db-error'] . '`);</script>';
        //echo '<script type="text/javascript">console.log(`Error: ' . $_SESSION['db-error'] . '`);</script>';
        unset($_SESSION['db-error']);
    }
?>