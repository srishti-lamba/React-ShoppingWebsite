<?php
    include('./NavBar.php');
    $warehouse = $_POST['location'];
    $destination = $_POST['destination'];
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
        $_SESSION['purchase-err'] = "Debit/Credit number was invalid";
    }




    echo "<p>add user order and trip to DB</p>";
?>