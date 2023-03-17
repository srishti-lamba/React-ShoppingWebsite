<?php
    session_start();
	header('Location: ' . $_SERVER['HTTP_REFERER']);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Table Name
	    if ( isset($_POST["tableName"]) ) {
            $_SESSION['db-tableView'] = getTableView($_POST["tableName"]);
        }
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

        try 
            { return $conn->query($query); }
        catch(mysqli_sql_exception $exception) 
            { $_SESSION['db-error'] = $conn->error; return "";}
    }

    // --------------
    // --- Insert ---
    // --------------
    function insertToUsers($name, $email, $username, $telephone, $password, $address, $postalCode){
        include_once('./CreateAndPopulateUsersTable.php');
        $query = "INSERT INTO Users (userName, telephoneNum, email, address, postalCode, loginId, password) VALUES('$name', '$telephone', '$email', '$address', '$postalCode', '$username', '$password')";
        sendQuery($query);
    }

    // ------------------
    // --- Table View ---
    // ------------------

    function getTableView($tableName) {
        $columnArray = getColumns($tableName);

        include_once($columnArray[0][3]);
        $query = "SELECT * FROM " . $columnArray[0][1] . ";";
        $resultSql = sendQuery($query);

        // Header
        $resultHtml = 
        "<thead>
            <tr>";
        for ($i = 1; $i < count($columnArray); $i++) {
            $resultHtml .= "<th>" . $columnArray[$i][0] . "</th>";
        }
        $resultHtml .= 
            "</tr>
        </thead>
        <tbody>";

        // Body
        // For each row
        while ( $row = $resultSql->fetch_assoc() ) {
            $resultHtml .= "<tr>";

            // For each column
            for ($i = 1; $i < count($columnArray); $i++) { 
                $colDisplay = $columnArray[$i][0];
                $colSql = $columnArray[$i][1];
                
                if ($colDisplay == "Price") 
                    { $resultHtml .= "<td>$" . $row[$colSql] . "</td>"; }
                else if ($colDisplay == "Image URL") 
                    { $resultHtml .= "<td style='font-size: 0.75em'>". $row[$colSql] . "</td>"; }
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
                    array("Users", "Users", "users", "./CreateAndPopulateUsersTable.php"),
                    array("User ID", "user_id"),
                    array("Name", "userName"),
                    array("Phone Number", "telephoneNum"),
                    array("Email", "email"),
                    array("Address", "address"),
                    array("Postal Code", "postalCode"),
                    array("Username", "loginId"),
                    array("Password", "password"),
                    array("Balance", "balance")
                );
                break;

            case "items":
                $resultArray = 
                array (
                    array("Items", "Items", "items", "./CreateAndPopulateItemsTable.php"),
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
                    array("Orders", "Orders", "orders", "./CreateOrderTable.php"),
                    array("Order ID", "orderId"),
                    array("Date Issued", "dateIssued"),
                    array("Delivery Date", "deliveryDate"),
                    array("Delivery Time", "deliveryTime"),
                    array("Price", "totalPrice"),
                    array("Payment Code", "paymentCode"),
                    array("User ID", "userId"),
                    array("Trip ID", "tripId"),
                    array("Order Status", "orderStatus")
                );
                break;

            case "locations":
                $resultArray = 
                array (
                    array("Locations", "BranchLocations", "locations", "./CreateAndPopulateLocationsTable.php"),
                    array("Location ID", "location_id"),
                    array("Address", "locationAddress"),
                    array("Latitude", "latitude"),
                    array("Longitude", "longitude")
                );
                break;

            case "trucks":
                $resultArray = 
                array (
                    array("Trucks", "Trucks", "trucks", "./CreateAndPopulateTruckTable.php"),
                    array("Truck ID", "truckId"),
                    array("Availability", "availabilityCode")
                );
                break;

            case "trips":
                $resultArray = 
                array (
                    array("Trips", "Trips", "trips", "./CreateTripTable.php"),
                    array("Trip ID", "tripId"),
                    array("Departure", "source"),
                    array("Destination", "destination"),
                    array("Distance", "distance"),
                    array("Truck ID", "truckId")
                );
                break;
        }

        $_SESSION['db-columns'] = $resultArray;
        return $resultArray;
    }

?>