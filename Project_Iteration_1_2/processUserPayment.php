<?php
    include('./NavBar.php');
    $warehouse = $_POST['location'];
    $destination = $_POST['destination'];
    $date = $_POST['deliveryDate'];
    $deliveryTime = $_POST['deliveryTime'];
    $total = $_POST['total'];
    $user = $_SESSION['userId']; //Unique Primary User key

    echo "<p>".$total."</p>";
    echo "<p>add user order and trip to DB</p>";
?>