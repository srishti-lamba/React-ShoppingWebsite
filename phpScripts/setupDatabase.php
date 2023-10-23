<?php
    header('Access-Control-Allow-Origin: *');

    include_once('./CreateAndPopulateUsersTable.php');
    include_once('./CreateAndPopulateItemsTable.php');
    include_once('./CreateOrderTable.php');
    include_once('./CreateAndPopulateLocationsTable.php');
    include_once('./CreateAndPopulateTruckTable.php');
    include_once('./createAndPopulateCoupons.php');
    include_once('./CreateTripTable.php');
    include_once('./CreateAndPopulateReviewsTable.php');
?>