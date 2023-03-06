<?php
    include('./NavBar.php');
    $location = $_POST['location'];
    $date = $_POST['deliveryDate'];
    $deliveryTime = $_POST['deliveryTime'];
    $total = $_POST['total'];


    echo "<p>Set up map with markers for location and user address and add user order and trip to DB</p>"
?>