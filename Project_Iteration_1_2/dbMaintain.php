<?php
    session_start();
	header('Location: ' . $_SERVER['HTTP_REFERER']);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Table Name
	    if ( isset($_POST["tableName"]) ) {
            switch ($_POST["tableName"])
            {
                 case "select":
                    $_SESSION['db-tableView'] = "";
                    break;

                case "users":
                    echo $_POST["tableName"];
                    $_SESSION['db-tableView'] = displayUsers();
                    break;

                case "items":
                    break;

                case "orders":
                    break;

                case "locations":
                    break;

                case "trucks":
                    break;

                case "trips":
                    break;
            }
        }
    }



    function insertToUsers($name, $email, $username, $telephone, $password, $address, $postalCode){
        include_once('./CreateAndPopulateUsersTable.php');
        $query = "INSERT INTO Users (userName, telephoneNum, email, address, postalCode, loginId, password) VALUES('$name', '$telephone', '$email', '$address', '$postalCode', '$username', '$password')";
        sendQuery($query);
    }

    function sendQuery($query) {
        $servername = "localhost";
        $usrnm = "root";
        $pswrd = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $usrnm, $pswrd, $dbname);

        try 
            { return $conn->query($query); }
        catch(mysqli_sql_exception $exception) 
            { $_SESSION['db-error'] = $conn->error; echo("<script>showErrorMessage($conn->error)</script>"); return "";}
    }

    function displayUsers() {
        include_once('./CreateAndPopulateUsersTable.php');
        $query = "SELECT * FROM Users;";
        $resultSql = sendQuery($query);
        $resultHtml = 
        "<thead>
            <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Postal Code</th>
                <th>Username</th>
                <th>Password</th>
                <th>Balance</th>
            </tr>
        </thead>
        <tbody>";

        while ( $row = $resultSql->fetch_assoc() ) {
            $resultHtml .= "<tr>";

            $resultHtml .= "<td>" . $row['user_id'] . "</td>";
            $resultHtml .= "<td>" . $row['userName'] . "</td>";
            $resultHtml .= "<td>" . $row['telephoneNum'] . "</td>";
            $resultHtml .= "<td>" . $row['email'] . "</td>";
            $resultHtml .= "<td>" . $row['address'] . "</td>";
            $resultHtml .= "<td>" . $row['postalCode'] . "</td>";
            $resultHtml .= "<td>" . $row['loginId'] . "</td>";
            $resultHtml .= "<td>" . $row['password'] . "</td>";
            $resultHtml .= "<td>" . $row['balance'] . "</td>";

            $resultHtml .= "</tr>";
        }
        $resultHtml .= "</tbody>";
        return $resultHtml;
    }

    function displayItems() {
        include_once('./CreateAndPopulateUsersTable.php');
        $query = "SELECT * FROM Users;";
        $resultSql = sendQuery($query);
        $resultHtml =
        "<thead>
            <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Postal Code</th>
                <th>Username</th>
                <th>Password</th>
                <th>Balance</th>
            </tr>
        </thead>
        <tbody>";

        while ( $row = $resultSql->fetch_assoc() ) {
            $resultHtml .= "<tr>";

            $resultHtml .= "<td>" . $row['user_id'] . "</td>";
            $resultHtml .= "<td>" . $row['userName'] . "</td>";
            $resultHtml .= "<td>" . $row['telephoneNum'] . "</td>";
            $resultHtml .= "<td>" . $row['email'] . "</td>";
            $resultHtml .= "<td>" . $row['address'] . "</td>";
            $resultHtml .= "<td>" . $row['postalCode'] . "</td>";
            $resultHtml .= "<td>" . $row['loginId'] . "</td>";
            $resultHtml .= "<td>" . $row['password'] . "</td>";
            $resultHtml .= "<td>" . $row['balance'] . "</td>";

            $resultHtml .= "</tr>";
        }
        $resultHtml .= "</tbody>";
        return $resultHtml;
    }

?>