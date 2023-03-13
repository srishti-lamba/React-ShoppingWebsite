<!DOCTYPE html>
<html>
    <head>
        <title>About Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./services.css">
    </head>
    <body>
        <?php 
            require("./NavBar.php") 
        ?>
        <h1 class="center">Types of Services</h1>
        <main class="flex">
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/3081/3081648.png">
                <h2 class="center">Secure<br>Online Shopping</h2>
                <p class="description center">We provide convenient online shopping services using our 
                customer-friendly service web application. Customers can register for an account, sign-in, 
                select items, and drag them to their shopping cart.</p>
                <p class="redirect center"><a href="./home.php">Shop Now</a></p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/2203/2203124.png">
                <h2 class="center">Fast and<br>Convenient Delivery</h2>
                <p class="description center">We offer eco-friendly and fast delivery services within 1-3 days. Customers can 
                    select a branch location, date and time for delivery, and a destination for delivery. Before you 
                    know it, your order will be ready on the front of your doorstep.</p>
                <p class="redirect center"><a href="./processUserOrder.php">Go to Cart</a></p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/5361/5361366.png">
                <h2 class="center">Professional Assembly</h2>
                <p class="description center">Looking for a professional to assemble your new furniture? We offer professional 
                    services for purchases bought from our furniture department. After purchasing your item, feel free to contact 
                    one of our customer service representatives to book an appointment.</p>
                <p class="redirect center"><a href="./aboutus.php">Contact Us</a></p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/9431/9431220.png">
                <h2 class="center">Returns &<br>Exchanges</h2>
                <p class="description center">Not loving your purchase? We offer returns and exchanges for most purchases within 
                    30-days. If you purchase the extended warranty, you have 90-days. Returns and exchanges can be mailed or dropped 
                    off at one of our convenient warehouse locations in your neighborhood.
                </p>
                <p class="redirect center"><a href="./aboutus.php">Contact Us</a></p>
            </div>
        </main>
    </body>
</html>