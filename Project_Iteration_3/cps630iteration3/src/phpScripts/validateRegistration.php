<?php
    header('Access-Control-Allow-Origin: *');

    function test_input($data, $varName){
        if(empty($data)){
            //$_SESSION["reg-error"] = $varName. " cannot be empty!";
            //header("HTTP/1.1 400 Bad Request $varName cannot be empty");
            //http_response_code(400);
            header("HTTP/1.1 400 $varName cannot be empty", 400);
            exit();
        }
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    function test_special_char($data, $varName){
        if (preg_match('/[\'^£$%&*()}{#~?><>,|=_+¬-]/', $data)){
            $GLOBALS['var'] = $varName . " cannot contain special characters!";
            header("HTTP/1.1 400 $varName cannot contain special characters!");
            return true;
        }
        return false;
    }

    function validatePostalCode($data){
        $pattern = '/^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/';
        if(!preg_match($pattern, $data)){
            //$_SESSION["reg-error"] = "Invalid Postal Code! Format: XXXXXX";
            header("HTTP/1.1 400 Invalid Postal Code! Format: XXXXXX");
            return true;
        }
        return false;
    }

    function validateTelephone($data){
        if(!preg_match('/[123456789-]/', $data)){
            //$_SESSION["reg-error"] = "Invalid Telphone Number!";
            header('HTTP/1.1 400 Invalid Telephone Number!');
            return true;
        }
        return false;
    }

    function checkDuplicate($data, $columnName, $varName){
        //include_once('../config/CreateAndPopulateUsersTable.php');

        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "cps630";

        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT * FROM users WHERE ($columnName = '$data')";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            //$_SESSION["reg-error"] = $varName . " is already taken!";
            header("HTTP/1.1 400 $varName is already taken!");
            return true;
        }
        return false;
    }

    function verifyAdminCode($adminCode){
        if(!($adminCode == 1234)){
            //$_SESSION["reg-error"] = "Invalid Admin Code!";
            header('HTTP/1.1 400 Invalid Admin Code!');
            exit();
        }
        return 1;
    }

    function checkLengthOfUserName($username) {
        if(strlen($username) > 10) {
            //$_SESSION['reg-error'] = "Username can only have at most 10 characters";
            header('HTTP/1.1 400 Username can only have at most 10 characters');
            return true;
        }

        return false;
    }

    function checkLengthOfPassword($pass) {
        if(strlen($pass) > 20){
            //$_SESSION['reg-error'] = "Password can only have at most 20 characters";
            header('HTTP/1.1 400 Password can only have at most 20 characters');
            return true;
        }

        return false;
    }

    
    function appendUserToDataBase($name, $email, $username2, $telephone, $password1, $address, $postalCode, $isAdmin){
        //include_once('../config/CreateAndPopulateUsersTable.php');

        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "cps630";

        $conn = new mysqli($servername, $username, $password, $dbname);
        $query = "INSERT INTO Users (userName, telephoneNum, Email, `Address`, PostalCode, loginId, `Password`, isAdmin) VALUES('$name', '$telephone', '$email', '$address', '$postalCode', '$username2', '$password1', '$isAdmin')";
        
        try 
            { $conn->query($query); }
        catch (mysqli_sql_exception $exception)
            { echo("<script>console.log(`Error on validateRegistration.php: $conn->error`)</script>"); }
        
        header('HTTP/1.1 201 Created');
        exit();
    }

    function validateForm(){
        $name = test_input($_POST['name'], "Name");
        $email = test_input($_POST['email'], "Email");
        $username = test_input($_POST['reg-username'], "Username");
        $telephone = test_input($_POST['telephone'], "Telephone");
        $password1 = test_input($_POST['reg-password'], "Passwords");
        $password2 = test_input($_POST['reg-password2'], "Passwords");
        $address = test_input($_POST['address'], "Address");
        $postalCode = test_input($_POST['postal-code'], "Postal Code");
        $isAdmin = 0;
        if(!($_POST['adminCode']=="")){
            $isAdmin = verifyAdminCode($_POST['adminCode']);
        }

        if(isset($_SESSION['reg-error'])){exit();}
        if($password1 != $password2){header("HTTP/1.1 400 passwords do not match"); exit();}

        if(test_special_char($name, "Name") ||
           test_special_char($email, "Email") || 
           test_special_char($address, "Address") ||
           test_special_char($postalCode, "Postal Code")
          ){
            //$_SESSION["reg-error"] = $GLOBALS['var'];
            exit();
        }

        if(validatePostalCode($postalCode)){exit();}
        if(validateTelephone($telephone)){exit();}
        if(checkDuplicate($email, 'Email', 'Email')){exit();}
        if(checkDuplicate($telephone, 'telephoneNum', 'Telephone Number')){exit();}
        if(checkDuplicate($username, 'loginId', 'Username')){exit();}
        if(checkLengthOfUserName($username)) {exit();}
        if(checkLengthOfPassword($password1)) {exit();}


        //If all above failed, append user to database
        appendUserToDataBase($name, $email, $username, $telephone, $password1, $address, $postalCode, $isAdmin);
    }

    validateForm();
    header('HTTP/1.1 201 Created');
?>