<?php
    $table = $_REQUEST['table'];

    header('Access-Control-Allow-Origin: *');

    if($table == 'branchLocations') {
        $result = json_encode(array('location_id', 'locationAddress', 'latitude', 'longitude'));
        echo $result;
        header('HTTP/1.1 200 OK');
    } else if ($table == 'items') {
        $result =json_encode(array('item_id', 'productName', 'price', 'category', 'made_in', 'department_code', 'image_url'));
        echo $result;
        header('HTTP/1.1 200 OK');
    } else if ($table == 'trips') {
        $result =json_encode(array('tripId', 'source', 'destination', 'distance', 'truckId'));
        echo $result;
        header('HTTP/1.1 200 OK');
    } else if ($table == 'orders') {
        $result =json_encode(array('orderId', 'dateIssued', 'deliveryDate', 'deliveryTime', 'totalPrice', 'paymentCode', 'userId', 'tripId', 'receiptId', 'orderStatus'));
        echo $result;
        header('HTTP/1.1 200 OK');
    } else if ($table == 'trucks') {
        $result =json_encode(array('truckId', 'availabilityCode'));
        echo $result;
        header('HTTP/1.1 200 OK');
    } else if($table == 'users') {
        $result =json_encode(array('user_id', 'userName', 'telephoneNum', 'email', 'address', 'postalCode', 'loginId', 'password', 'balance', 'isAdmin'));
        echo $result;
        header('HTTP/1.1 200 OK');
    } else if($table == 'coupons') {
        $result =json_encode(array('couponCode', 'discount'));
        echo $result;
        header('HTTP/1.1 200 OK');
    }
?>