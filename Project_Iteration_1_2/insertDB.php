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

        <!-- Table View -->
        <table id="tableView">
        </table>
    </body>
</html>

<script>
    $(document).ready(function() {

        $('#tableName').change(function(){
            $("#tableNameForm").submit();
            //showErrorMessage("Value has changed to " + $("#tableName").val());
        });

    });

    function showErrorMessage(error) {
        $(".errorMsg").html(error);
    }

    function displayTable(tableHtml) {
        $("#tableView").html(tableHtml);
    }

</script>

<?php
    if(isset($_SESSION['db-tableView']) && $_SESSION['db-tableView'] <> ""){
        echo '<script type="text/javascript">displayTable(`' . $_SESSION['db-tableView'] . '`);</script>';
        //echo '<script type="text/javascript">console.log(`tableView: ' . $_SESSION['db-tableView'] . '`);</script>';
        unset($_SESSION['db-tableView']);
    }

    if(isset($_SESSION['db-error']) && $_SESSION['db-error'] <> ""){
        echo '<script type="text/javascript">showErrorMessage(`' . $_SESSION['db-error'] . '`);</script>';
        //echo '<script type="text/javascript">console.log(`Error: ' . $_SESSION['db-error'] . '`);</script>';
        unset($_SESSION['db-error']);
    }
?>