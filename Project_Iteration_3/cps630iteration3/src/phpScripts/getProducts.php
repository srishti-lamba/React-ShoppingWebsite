<?php
        
        header('Access-Control-Allow-Origin: *');
        function getItems($category) {

            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "cps630";
        
            $conn = new mysqli($servername, $username, $password, $dbname);
            $query = "SELECT item_id, productName, price, category, image_url FROM Items WHERE category LIKE " . "'". $category . "'";


            try{
                $output = array();
                $result = $conn->query($query);

                while($row = $result->fetch_assoc()) {
                    array_push($output, json_encode($row));
                }

                return json_encode($output);
            } 
            catch (mysqli_sql_exception $e)
                { echo("<script>console.log(`Error on getProducts.php: $conn->error`)</script>"); }
        }

        $category = $_REQUEST['category'];

        $result = getItems($category);
        // echo json_encode($result);
        echo $result;
?>