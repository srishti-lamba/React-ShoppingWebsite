<?php
        
        header('Access-Control-Allow-Origin: *');
        function getItems($category) {

            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "website";
        
            $conn = new mysqli($servername, $username, $password, $dbname);

            $query = "";
            if ($category == "")
                {$query = "SELECT item_id, productName, price, category, image_url FROM Items";}
            else
                {$query = "SELECT item_id, productName, price, category, image_url FROM Items WHERE category LIKE " . "'". $category . "'";}

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

        $category = "";
        if (isset($_REQUEST['category'])) 
            {$category = $_REQUEST['category'];}

        $result = getItems($category);
        echo json_encode($result);
?>