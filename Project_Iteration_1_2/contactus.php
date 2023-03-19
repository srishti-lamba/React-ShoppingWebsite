<!DOCTYPE html>
<html>
    <head>
        <title>Contact Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./css/aboutus.css">
    </head>
    <body>
        <?php 
            require("./NavBar.php");
            unset($_SESSION['orderConfirmationMessage']); 
        ?>
        <div class="main-image">
            <article class="main-title">
                <h1>CONTACT US</h1>
            </article>
        <main class="flex">
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png">
                <h2 class="center">Raymond Floro</h2>
                <p class="contact center">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Contact ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯<br><br>
                <a href="">raymond@smartcustomerservices.ca</a><br>
                1-800-555-1111
                </p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png">
                <h2 class="center">Roberto Mariani</h2>
                <p class="contact center">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Contact ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯<br><br>
                <a href="">roberto@smartcustomerservices.ca</a><br>
                1-800-555-2222</p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png">
                <h2 class="center">Srishti Lamba</h2>
                <p class="contact center">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Contact ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯<br><br>
                <a href="">srishti@smartcustomerservices.ca</a><br>
                1-800-555-3333</p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png">
                <h2 class="center">Vanessa Landayan</h2>
                <p class="contact center">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Contact ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯<br><br>
                <a href="">vanessa@smartcustomerservices.ca</a><br>
                1-800-555-4444</p>
            </div>
        </main>
        </div>
    </body>
</html>