<?php
    session_start();
    include_once('./config/CreateOrderTable.php');

    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    // Get data
    $userID = test_input($_POST["userid"]);
    $orderID = test_input($_POST["orderid"]);

    // Put in session
    $_SESSION['search-userid'] = $userID;
    $_SESSION['search-orderid'] = $orderID;

    // Database connection setup
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "";
    
    if (($userID == "") && ($orderID == "")) {
        $sql = "SELECT * FROM Orders";
    }
    else if (($userID <> "") && ($orderID == "")) {
        $sql = "SELECT * FROM Orders WHERE (userId = '$userID')";
    }
    else if (($userID == "") && ($orderID <> "")) {
        $sql = "SELECT * FROM Orders WHERE (orderId = '$orderID')";
    }
    else {
        $sql = "SELECT * FROM Orders WHERE (userId = '$userID' AND orderId = '$orderID')";
    }

    // Connecting
    $resultSql = "";
    try {
        $resultSql = $conn->query($sql);
        echo ("<script>console.log(\"Order search successful.\")</script>");
    }
    catch (mysqli_sql_exception $exception)
    { echo ("<script>console.log(\"Error on Order Search: " . $conn->error . "\")</script>"); }
    $conn->close();

    // Fill rows
    $resultHtml = "";

    while ( $row = $resultSql->fetch_assoc() ) {
        $resultHtml .= "<tr>";

        $resultHtml .= "<td>" . $row['userId'] . "</td>";
        $resultHtml .= "<td>" . $row['orderId'] . "</td>";
        $resultHtml .= "<td>" . $row['dateIssued'] . "</td>";
        $resultHtml .= "<td>$" . $row['totalPrice'] . "</td>";
        $resultHtml .= "<td>" . $row['orderStatus'] . "</td>";

        $resultHtml .= "</tr>";
    }

    $_SESSION['search-mode'] = true;
    $_SESSION['search-result'] = $resultHtml;

    header('Location: ' . $_SERVER['HTTP_REFERER']);
    return $resultHtml;
?>