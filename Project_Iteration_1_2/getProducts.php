<?php
        

        function getItems($category) {

            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "mysql";
        
            $conn = new mysqli($servername, $username, $password, $dbname);
            $query = "Select item_id, productName, price, category, image_url from item where category = " . "'". $category . "'";


            try{
                $output = array();
                $result = $conn->query($query);

                while($row = $result->fetch_assoc()) {
                    array_push($output, json_encode($row));
                }

                return json_encode($output);

            } catch (mysqli_sql_exception $e) {
                echo $e;
            }
        }

        $category = $_REQUEST['category'];

        $result = getItems($category);
        // echo json_encode($result);
        echo $result;
?>