<?php
    session_start();
	
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Table Name
	    if ( isset($_POST["tableName"]) ) {
            $_SESSION['db-tableView'] = getTableView($_POST["tableName"]);
        }

        // Query Submit (Select)
        else if ( isset( $_POST["querySubmit-tableName"] ) ) {
            $_SESSION['db-tableView'] = getResultTableView($_POST["querySubmit-tableName"], $_POST["querySubmit"]);
        }

        // Query Submit
        else if ( isset($_POST["querySubmit"]) ) {
            unset($_SESSION['db-tableView']);
            submitQuery($_POST["querySubmit"]);
        }

        header('Location: ' . $_SERVER['HTTP_REFERER']);
        exit;
        
    }

    // ------------------------
    // --- Helper Functions ---
    // ------------------------

    function sendQuery($query) {
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        try {
            return $conn->query($query);
        }
        catch(mysqli_sql_exception $exception) {
            $_SESSION['db-error'] = $conn->error; 
            return "";
        }
    }

    function submitQuery($query) {
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        try {
            $result = $conn->query($query);
            $_SESSION['db-success'] = true;
            return $result;
        }
        catch(mysqli_sql_exception $exception) {
            $_SESSION['db-error'] = $conn->error;
            $_SESSION['db-success'] = false;
            return "";
        }
    }

    function getDisplayFromSQL($columnArray, $sql) {
        $display = "";

        foreach ($columnArray as $column) {
            if ($column[1] == $sql) {
                $display = $column[0];
                break;
            }
        }
        return $display;
    }

    function getSqlFromDisplay($columnArray, $display) {
        $sql = "";

        foreach ($columnArray as $column) {
            if ($column[0] == $display) {
                $sql = $column[1];
                break;
            }
        }
        return $sql;
    }

    // ------------------
    // --- Table View ---
    // ------------------

    function getTableView($tableName) {
        $columnArray = getColumns($tableName);

        include_once($columnArray[0][3]);
        $query = "SELECT * FROM " . $columnArray[0][1] . ";";
        $resultSql = sendQuery($query);

        return makeTable($columnArray, $resultSql);
    }

    function getResultTableView($tableName, $query) {
        $columnArray = getColumns($tableName);

        include_once($columnArray[0][3]);
        $resultSql = submitQuery($query);

        return makeTable($columnArray, $resultSql);
    }

    function makeTable($columnArray, $resultSql) {
        $colNum = $resultSql->field_count;
        $colDisplayArr = [];
        $colSqlArr = [];

        // Header
        $resultHtml = 
        "<thead>
            <tr>";
        while ($col = mysqli_fetch_field($resultSql) ) {
            $sql = $col->name;
            $display = getDisplayFromSQL($columnArray, $sql);
            array_push($colDisplayArr, $display);
            array_push($colSqlArr, $sql);
            
            $resultHtml .= "<th>" . $display . "</th>";
        }
        $resultHtml .= 
        "    </tr>
        </thead>
        <tbody>";

        // Body
        // For each row
        while ( $row = $resultSql->fetch_array() ) {
            $resultHtml .= "<tr>";

            // For each column
            for ($i = 0; $i < $colNum; $i++) { 
                $colDisplay = $colDisplayArr[$i];
                $colSql = $colSqlArr[$i];
                
                if (($colDisplay == "Price") || ($colDisplay == "Balance"))
                    { $resultHtml .= "<td>$" . $row[$colSql] . "</td>"; }
                else if ($colDisplay == "Image URL") 
                    { $resultHtml .= "<td style='font-size: 0.75em'>" . $row[$colSql] . "</td>"; }
                else 
                    { $resultHtml .= "<td>" . $row[$colSql] . "</td>"; }
            }
            $resultHtml .= "</tr>";
        }
        $resultHtml .= "</tbody>";
        return $resultHtml;
    }

    // ---------------
    // --- Columns ---
    // ---------------

    function getColumns($tableName) {
        $resultArray;

        switch ($tableName) {
            case "users":
                $resultArray = 
                array (
                    // Display Name | SQL Name | HTML Element Value Name | Create PHP File Name
                    array("Users", "Users", "users", "../config/CreateAndPopulateUsersTable.php"),
                    array("User ID", "user_id"),
                    array("Name", "userName"),
                    array("Phone Number", "telephoneNum"),
                    array("Email", "email"),
                    array("Address", "address"),
                    array("Postal Code", "postalCode"),
                    array("Username", "loginId"),
                    array("Password", "password"),
                    array("Balance", "balance"),
                    array("Admin", "isAdmin")
                );
                break;

            case "items":
                $resultArray = 
                array (
                    array("Items", "Items", "items", "../config/CreateAndPopulateItemsTable.php"),
                    array("Item ID", "item_id"),
                    array("Product Name", "productName"),
                    array("Price", "price"),
                    array("Category", "category"),
                    array("Country Produced", "made_in"),
                    array("Department Code", "department_code"),
                    array("Image URL", "image_url")
                );
                break;

            case "orders":
                $resultArray = 
                array (
                    array("Orders", "Orders", "orders", "../config/CreateOrderTable.php"),
                    array("Order ID", "orderId"),
                    array("Date Issued", "dateIssued"),
                    array("Delivery Date", "deliveryDate"),
                    array("Delivery Time", "deliveryTime"),
                    array("Price", "totalPrice"),
                    array("Payment Code", "paymentCode"),
                    array("User ID", "userId"),
                    array("Trip ID", "tripId"),
                    array("Receipt ID", "receiptId"),
                    array("Order Status", "orderStatus")
                );
                break;

            case "locations":
                $resultArray = 
                array (
                    array("Locations", "BranchLocations", "locations", "../config/CreateAndPopulateLocationsTable.php"),
                    array("Location ID", "location_id"),
                    array("Address", "locationAddress"),
                    array("Latitude", "latitude"),
                    array("Longitude", "longitude")
                );
                break;

            case "trucks":
                $resultArray = 
                array (
                    array("Trucks", "Trucks", "trucks", "../config/CreateAndPopulateTruckTable.php"),
                    array("Truck ID", "truckId"),
                    array("Availability", "availabilityCode")
                );
                break;

            case "trips":
                $resultArray = 
                array (
                    array("Trips", "Trips", "trips", "../config/CreateTripTable.php"),
                    array("Trip ID", "tripId"),
                    array("Departure", "source"),
                    array("Destination", "destination"),
                    array("Distance", "distance"),
                    array("Truck ID", "truckId")
                );
                break;

            case "reviews":
                $resultArray = 
                array (
                    array("Reviews", "Reviews", "reviews", "../config/CreateAndPopulateReviewsTable.php"),
                    array("Review ID", "reviewId"),
                    array("User ID", "userID"),
                    array("Item ID", "itemID"),
                    array("Date", "dateTime"),
                    array("Rating", "rating"),
                    array("Title", "title"),
                    array("Content", "content")
                );
                break;
        }

        $_SESSION['db-columns'] = $resultArray;
        return $resultArray;
    }

?>
