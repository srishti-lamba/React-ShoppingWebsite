<?php
    ob_start();
    header('Access-Control-Allow-Origin: *');
    // include('../views/NavBar.php');
    // include('../config/CreateAndPopulateTruckTable.php');
    // include('../config/CreateTripTable.php');
    // include('../config/CreateOrderTable.php');

    $warehouse = $_POST['location'];
    $destination = $_POST['destination'];
    $distance = $_POST['distanceVal'];
    $date = $_POST['deliveryDate'];
    $deliveryTime = $_POST['deliveryTime'];
    $total = $_POST['total'];
    $cardNumber = $_POST['cardNumber'];
    $user = $_POST['userId'];
    //$user = $_SESSION['userId']; //Unique Primary User key

    $deliveryDate = strtotime($date); //date of delivery
    $currentDate = strtotime(date('Y-m-d')); //current date

    $earliestDeliveryTime = strtotime("09:00:00");
    $latestDeliveryTime = strtotime("18:00:00");

    if(strlen($destination) == 0) {
        header('HTTP/1.1 400 Destination cannot be empty!');
    }

    else if (preg_match('/[\'^£$%&*()}{#~?><>|=_+¬-]/', $destination)) {
        header('HTTP/1.1 400 Address cannot have special characters!');
    }

    else if($deliveryDate < $currentDate) { // if delivery date is before current date send error message to user
        header("HTTP/1.1 400 $date has already passed");
        //$_SESSION['purchase-err'] = $date . " has already passed";
    }

    //if delivery time is outside of valid range then send error message back to user
    else if(strtotime($deliveryTime) < $earliestDeliveryTime || strtotime($deliveryTime) > $latestDeliveryTime) {
        header("HTTP/1.1 400 Delivery time must be between 9AM and 6PM!");
        //$_SESSION['purchase-err'] = "Deliver time must be between 9AM and 6PM!";
    }

    //check if user inputted valid credit card #
    else if(!preg_match('/\d{16}/', $cardNumber)) {
        header('HTTP/1.1 400 Debit/Credit number must be in XXXXXXXXXXXXXXXX format');
        //$_SESSION['purchase-err'] = "Debit/Credit number must be in XXXXXXXXXXXXXXXX format";
    } else {
        $orderId = addTripAndOrderToDB($warehouse, $destination, $distance, $date, $deliveryTime, $total, $cardNumber, $user);
        echo $orderId;
        header("HTTP/1.1 201 $orderId");
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

            $salt = randomSalt();
            $encryptedCardNumber = md5($cardNumber.$salt);

            $insertOrderQuery = "INSERT INTO Orders (deliveryDate, deliveryTime, totalPrice, paymentCode, userId, tripId, salt)
                                VALUES('$date', '$deliveryTime', $total, '$encryptedCardNumber', $user, $tripId, '$salt');";

            $conn->query($insertOrderQuery);

            $getOrderIdQuery = "SELECT LAST_INSERT_ID() FROM orders;";

            $getOrderIdQueryResult = $conn->query($getOrderIdQuery);
            $orderId = $getOrderIdQueryResult->fetch_assoc()['LAST_INSERT_ID()'];

            $conn->close();

            return $orderId;

        } catch(mysqli_sql_exception $e) 
            { echo("<script>console.log(`Error on processUserPayment.php: $conn->error`)</script>"); }
    }
    ob_end_flush();
?>