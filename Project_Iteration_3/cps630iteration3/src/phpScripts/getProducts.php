<?php
        
        header('Access-Control-Allow-Origin: *');
        function getItems() {

            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "cps630";
        
            $conn = new mysqli($servername, $username, $password, $dbname);
            $query = "SELECT item_id, productName, price, category, image_url FROM Items";

            try{
                $output = array();
                $result = $conn->query($query);

                while($row = $result->fetch_assoc()) {
                    $rowArr = array();
                    foreach($row as $key => $value) // each key in each row
                        { $rowArr[$key] = $value; }

                    array_push($output, $rowArr);
                }

                return $output;
            } 
            catch (mysqli_sql_exception $e)
                { echo("<script>console.log(`Error on getProducts.php: $conn->error`)</script>"); }
        }

        $result = getItems();
        echo json_encode($result);
?>