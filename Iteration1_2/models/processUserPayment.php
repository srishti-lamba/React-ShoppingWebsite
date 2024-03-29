<?php
    ob_start();
    include('../views/NavBar.php');
    include('../config/CreateAndPopulateTruckTable.php');
    include('../config/CreateTripTable.php');
    include('../config/CreateOrderTable.php');

    //Set Session Variables to repopulate form on failure
    $_SESSION['order-location'] = $_POST['location'];
    $_SESSION['order-destination'] = $_POST['destination'];
    $_SESSION['order-date'] = $_POST['deliveryDate'];
    $_SESSION['order-time'] = $_POST['deliveryTime'];
    $_SESSION['order-cardNumber'] = $_POST['cardNumber'];    

    $warehouse = $_POST['location'];
    $destination = $_POST['destination'];
    $distance = $_POST['distanceVal'];
    $date = $_POST['deliveryDate'];
    $deliveryTime = $_POST['deliveryTime'];
    $total = $_POST['total'];
    $cardNumber = $_POST['cardNumber'];
    $user = $_SESSION['userId']; //Unique Primary User key
    unset($_SESSION['purchase-err']);

    $deliveryDate = strtotime($date); //date of delivery
    $currentDate = strtotime(date('Y-m-d')); //current date

    $earliestDeliveryTime = strtotime("09:00:00");
    $latestDeliveryTime = strtotime("18:00:00");

    if(!isset($_SESSION['loggedin'])) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        $_SESSION['purchase-err'] = "Must be logged in to make a purchase";
    }

    else if(strlen($destination) == 0) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        $_SESSION['purchase-err'] = "Destination cannot be empty!";
    }

    else if (preg_match('/[\'^£$%&*()}{#~?><>|=_+¬-]/', $destination)) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        $_SESSION['purchase-err'] = "Address cannot have special characters";
    }

    else if($deliveryDate < $currentDate) { // if delivery date is before current date send error message to user
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        $_SESSION['purchase-err'] = $date . " has already passed";
    }

    //if delivery time is outside of valid range then send error message back to user
    else if(strtotime($deliveryTime) < $earliestDeliveryTime || strtotime($deliveryTime) > $latestDeliveryTime) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        $_SESSION['purchase-err'] = "Deliver time must be between 9AM and 6PM!";
    }

    //check if user inputted valid credit card #
    else if(!preg_match('/\d{16}/', $cardNumber)) {
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        $_SESSION['purchase-err'] = "Debit/Credit number must be in XXXXXXXXXXXXXXXX format";
    } else {
        addTripAndOrderToDB($warehouse, $destination, $distance, $date, $deliveryTime, $total, $cardNumber, $user);
    }

    function randomSalt() {
        $salt = bin2hex(random_bytes(3));
        return $salt;
    }



    function addTripAndOrderToDB($warehouse, $destination, $distance, $date, $deliveryTime, $total, $cardNumber, $user) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "website";

        $conn = new mysqli($servername, $username, $password, $dbname);

        //truck that has the smallest total distance is given the next trip
        $getDistanceForTrucks = "SELECT trucks.truckId, sum(distance) as total_distance
                                FROM trucks
                                LEFT JOIN trips on trips.truckId = trucks.truckId
                                WHERE trucks.availabilityCode = 'Available' 
                                GROUP BY truckId
                                ORDER BY total_distance ASC;";

        try {
            $result = $conn->query($getDistanceForTrucks);

            if(mysqli_num_rows($result) == 0) {
                $truckId = 1;
            } else {
                $firstRow = $result->fetch_assoc();
                $truckId = $firstRow['truckId'];
            }

            $insertTripQuery = "INSERT INTO Trips (source, destination, distance, truckId) VALUES('$warehouse', '$destination', '$distance', $truckId);";
            $conn->query($insertTripQuery);

            $getTripIdQuery = "SELECT LAST_INSERT_ID() FROM trips;";

            $getTripIdQueryResult = $conn->query($getTripIdQuery);
            $tripId = $getTripIdQueryResult->fetch_assoc()['LAST_INSERT_ID()'];

            $cardNumber = (string)$cardNumber; //cast credit card number to string
            $salt = randomSalt();
            $encryptedCardNum = md5($cardNumber.$salt);

            $insertOrderQuery = "INSERT INTO Orders (deliveryDate, deliveryTime, totalPrice, paymentCode, salt, userId, tripId)
                                VALUES('$date', '$deliveryTime', $total, '$encryptedCardNum', '$salt', $user, $tripId);";

            $conn->query($insertOrderQuery);

            $getOrderIdQuery = "SELECT LAST_INSERT_ID() FROM orders;";

            $getOrderIdQueryResult = $conn->query($getOrderIdQuery);
            $orderId = $getOrderIdQueryResult->fetch_assoc()['LAST_INSERT_ID()'];

            $conn->close();

            header('Location: ' . substr($_SERVER['HTTP_REFERER'], 0, strrpos($_SERVER['HTTP_REFERER'], "/")) . '/home.php');

            $_SESSION['orderConfirmationMessage'] = "<h1 class=\"orderNotification\">Your purchase has been processed! Your order Id is $orderId, use this number to track your order!</h1>";

            echo "<script>localStorage.removeItem('shoppinglist');</script>";

        } catch(mysqli_sql_exception $e) 
            { echo("<script>console.log(`Error on processUserPayment.php: $conn->error`)</script>"); }
    }
    ob_end_flush();
?>