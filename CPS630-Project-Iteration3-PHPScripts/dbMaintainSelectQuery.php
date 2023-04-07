<?php
    header('Access-Control-Allow-Origin: *');

    $query = $_POST['query'];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cps630";

    $conn = new mysqli($servername, $username, $password, $dbname);

    try {
        $resultSql = $conn->query($query);
		$colNum = $resultSql->field_count;

        // Header
		$header = [];
        while ($col = mysqli_fetch_field($resultSql) ) 
			{ array_push($header, $col->name); }
		
        // Body
		$body = [];
        // For each row
        while ( $data = $resultSql->fetch_array() ) {
            // For each column
			$row = [];
            for ($i = 0; $i < $colNum; $i++) 
				{ array_push($row, $data[$i]); }
			array_push($body, $row);
        }
	
		echo  json_encode([$header, $body]);
        
    }  catch (mysqli_sql_exception $exception) {
         
            echo $conn->error; 
    }

    $conn->close();
?>