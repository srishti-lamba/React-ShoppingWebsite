<!DOCTYPE html>
<html>
    <head>
        <title>Register</title>
        <meta char="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/register.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
        <script src="../controllers/register.js"></script>
    </head>
    <body>
        <?php
            require("./NavBar.php");
        ?>
        <main class="reg-container">
            <h1 class="registration-h1">Registration</h1>
            <form class="register-form" action="../models/validateRegistration.php" method="post">
                <p class="register-err">Error Message</p>
                <p class="register-success">Registered successfully!</p>


                <label for="name">Enter Your Full Name:</label>
                <input type="text" id="name" name="name" value="<?php 
                    if(isset($_SESSION['name'])){
                        echo $_SESSION['name'];}?>" onclick="hideRegisterSuccess()">

                <label for="email">Enter Email:</label>
                <input type="email" id="email" name="email" value="<?php 
                    if(isset($_SESSION['email'])){
                        echo $_SESSION['email'];}?>" onclick="hideRegisterSuccess()">

                <label for="reg-username">Enter Username:</label>
                <input type="text" id="reg-username" name="reg-username" value="<?php 
                    if(isset($_SESSION['reg-username'])){
                        echo $_SESSION['reg-username'];}?>" onclick="hideRegisterSuccess()">

                <label for="telephone">Enter Telephone:</label>
                <input type="text" id="telephone" name="telephone" value="<?php 
                    if(isset($_SESSION['telephone'])){
                        echo $_SESSION['telephone'];}?>" onclick="hideRegisterSuccess()">

                <label for="reg-password">Enter Password:</label>
                <input type="password" id="reg-password" name="reg-password" onclick="hideRegisterSuccess()">

                <label for="reg-password2">Re-Enter Password:</label>
                <input type="password" id="reg-password2" name="reg-password2" onclick="hideRegisterSuccess()">

                <label for="address">Enter Home Address:</label>
                <input type="text" id="address" name="address" value="<?php 
                    if(isset($_SESSION['address'])){
                        echo $_SESSION['address'];}?>" onclick="hideRegisterSuccess()">
                
                <label for="postal-code">Postal Code:</label>
                <input type="text" id="postal-code" name="postal-code" value="<?php 
                    if(isset($_SESSION['postal-code'])){
                        echo $_SESSION['postal-code'];}?>" onclick="hideRegisterSuccess()">

                
                <section class="userTypeSection">
                    <p>I am registering as a:</p>
                    <input type="radio" id="customer" name="userType" checked>
                    <label for="customer">Customer</label>
                    <input type="radio" id="admin" name="userType">
                    <label for="admin">Admin</label>
                    <br>
                    <div id="adminCodeDiv">
                        <label for="adminCode">Enter Admin Access Code:</label>
                        <input type="password" id="adminCode" name="adminCode" placeholder="1234">
                    </div>
                </section>
                
                <button type="button" class="reg-button" onclick="validateForm()">Submit</button>
            </form>
        </main>
        <?php
            if(isset($_SESSION['reg-error'])){
                $msg = $_SESSION['reg-error'];
                echo "<script>displayErrorMessage('" . $msg . "')</script>";
            }
            if(isset($_SESSION['register-success'])){
                echo "<script>displayRegisterSuccess()</script>";
                session_unset();
            }
        ?>
    </body>
</html>