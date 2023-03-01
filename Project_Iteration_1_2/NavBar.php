<?php
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta char="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="NavBarStyle.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    </head>
    <script>
    $(document).ready(function() {
        $("#username").click(function(){
            $('#errMsg2').css({"display": 'none'});
        });
        $("#password").click(function(){
            $('#errMsg2').css({"display": 'none'});
        });
    });

    function openLogin() {
        $('#overlay').css({"display": 'block'});
        $('#loginWindow').css({"display": 'block'});
    }

    function toggleOffOverlay(){
        $('#overlay').css({"display": 'none'});
        $('#loginWindow').css({"display": 'none'});
    }

    function displayLoginError(){
        openLogin();
        $('#errMsg').css({"display": 'block'});
    }

    function submitLogin(){
        if($("#username").val() == "" || $("#password").val() == ""){
            $('#errMsg2').css({"display": 'block'});
        }
        else{
            $("#loginForm").submit();
        }
    }
    </script>
    <body>
        <header>
            <div class="logo">System Logo</div>
            <nav class="nav">
                <ul>
                    <li><a href="./home.php">Home</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Services</a></li>
                </ul>
            </nav>
            <ul class="right">
                <?php
                    if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true){
                        echo "<li><div class=\"cart\">Cart</div></li>";
                        echo "<li><p>Hello, ". $_SESSION['username'] ."</p></li>";
                        echo "<li><form action=\"./logout.php\">  <button type=\"submit\">Log Out</button> </form></li>";
                    }
                    else{
                        echo "<li><button type=\"button\">Sign Up</button></li>
                              <li><button type=\"button\" class=\"login\" onclick=\"openLogin()\">Login</button></li>";
                    }
                ?>
            </ul>
        </header>
        <div id="overlay" onclick="toggleOffOverlay()"></div>
        <div id="loginWindow">
            <form id="loginForm" action="./login.php" method="POST">
                <h1>Login</h1>
                <input type="text" name="username" id="username" placeholder="Username">
                <input type="password" name="password" id="password" placeholder="Password">
                <p id="errMsg">The Username/Password you entered was invalid!</p>
                <p id="errMsg2">Both Username and Password are required!</p>
                <button class="submit" type="button" name="login" value="Login" onclick="submitLogin()">Login</button>
            </form>
        </div>
    </body>
    <?php 
        if(isset($_SESSION['failedLogin']) && $_SESSION['failedLogin'] == true){
            echo '<script type="text/javascript">displayLoginError();</script>';
            $_SESSION['failedLogin'] = false;
        }
    ?>
</html>
