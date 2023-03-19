<?php
    session_start();
    //Set Session Variables to repopulate form on failure
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['email'] = $_POST['email'];
    $_SESSION['reg-username'] = $_POST['reg-username'];
    $_SESSION['telephone'] = $_POST['telephone'];
    $_SESSION['address'] = $_POST['address'];
    $_SESSION['postal-code'] = $_POST['postal-code'];
    unset($_SESSION['reg-error']);

    function test_input($data, $varName){
        if(empty($data)){
            $_SESSION["reg-error"] = $varName. " cannot be empty!";
            header('Location: ' . $_SERVER['HTTP_REFERER']);
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
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            return true;
        }
        return false;
    }

    function validatePostalCode($data){
        $pattern = '/^[a-zA-Z]\d[a-zA-Z]\d[a-zA-Z]\d$/';
        if(!preg_match($pattern, $data)){
            $_SESSION["reg-error"] = "Invalid Postal Code! Format: XXXXXX";
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            return true;
        }
        return false;
    }

    function validateTelephone($data){
        if(!preg_match('/[123456789-]/', $data)){
            $_SESSION["reg-error"] = "Invalid Telphone Number!";
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            return true;
        }
        return false;
    }

    function checkDuplicate($data, $columnName, $varName){
        include_once('./config/CreateAndPopulateUsersTable.php');

        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "cps630";

        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT * FROM users WHERE ($columnName = '$data')";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $_SESSION["reg-error"] = $varName . " is already taken!";
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            return true;
        }
        return false;
    }

    function appendUserToDataBase($name, $email, $username2, $telephone, $password1, $address, $postalCode){
        include_once('./config/CreateAndPopulateUsersTable.php');

        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "cps630";

        $conn = new mysqli($servername, $username, $password, $dbname);
        $query = "INSERT INTO Users (userName, telephoneNum, Email, `Address`, PostalCode, loginId, `Password`) VALUES('$name', '$telephone', '$email', '$address', '$postalCode', '$username2', '$password1')";
        $conn->query($query);
        
        session_unset();
        $_SESSION['register-success'] = "true";
        //Redirct to home page
        header("Location: ./home.php");
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

        if(isset($_SESSION['reg-error'])){exit();}
        if($password1 != $password2){$_SESSION['reg-error'] = "Password do not match!"; exit();}

        if(test_special_char($name, "Name") ||
           test_special_char($email, "Email") || 
           test_special_char($address, "Address") ||
           test_special_char($postalCode, "Postal Code")
          ){
            $_SESSION["reg-error"] = $GLOBALS['var'];
            exit();
        }

        if(validatePostalCode($postalCode)){exit();}
        if(validateTelephone($telephone)){exit();}
        if(checkDuplicate($email, 'Email', 'Email')){exit();}
        if(checkDuplicate($telephone, 'telephoneNum', 'Telephone Number')){exit();}
        if(checkDuplicate($username, 'loginId', 'Username')){exit();}


        //If all above failed, append user to database
        appendUserToDataBase($name, $email, $username, $telephone, $password1, $address, $postalCode);
    }

    validateForm();
    header('Location: ' . $_SERVER['HTTP_REFERER']);
?>