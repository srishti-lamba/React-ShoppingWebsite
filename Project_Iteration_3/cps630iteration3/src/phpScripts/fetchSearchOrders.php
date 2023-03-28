<?php
    header('Access-Control-Allow-Origin: *');

    function buildQuery(){
        $userId = $_POST['searchIdInput'];
        $orderId = $_POST['searchOrderInput'];
        $query = "";
        //Query if both userID and orderId 
        if(($userId != "") and ($orderId != "") ){
            $query = "SELECT * FROM `orders` WHERE (userID = $userId AND orderID = $orderId);";
            return $query;
        }
        //Query if only orderId
        if($userId != ""){
            $query = "SELECT * FROM `orders` WHERE (userID = $userId);";
        }
        //Query if only userId
        if($orderId != ""){
            $query = "SELECT * FROM `orders` WHERE (orderID = $orderId);";
        }
        return $query;
    }

    function runQuery($query){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "cps630";
        $conn = new mysqli($servername, $username, $password, $dbname);

        $result;

        try { 
            $result = $conn->query($query);
            $output = array();
            while($row = $result->fetch_assoc()){
                array_push($output, json_encode($row));
            }

            return $output;
        }
        catch (mysqli_sql_exception $exception)
            { 
                echo("<script>console.log(`Error on login.php: $conn->error`)</script>"); 
                exit();
            }
    }

    $query = buildQuery();
    $result = runQuery($query);
    echo json_encode($result);
    header('HTTP/1.1 200 OK');
?>