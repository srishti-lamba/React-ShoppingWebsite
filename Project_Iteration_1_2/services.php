<!DOCTYPE html>
<html>
    <head>
        <title>About Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./css/services.css">
    </head>
    <body>
        <?php 
            require("./NavBar.php");
            unset($_SESSION['orderConfirmationMessage']);
        ?>
        <div class="main-image">
            <article class="main-title">
                <h1>TYPES OF SERVICES</h1>
            </article>
        <main class="flex">
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/3081/3081415.png">
                <h2 class="center">Secure<br>Online Shopping</h2>
                <p class="description center">Shop from the comfort of your own home! We provide convenient online shopping 
                    services using our customer-friendly service web application. Customers can register for an account, sign-in, 
                    select items, and drag them to their shopping cart. Check out our new collection from the furniture department!</p>
                <p class="redirect center"><a href="./home.php">Shop Now</a></p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/2203/2203145.png">
                <h2 class="center">Fast and<br>Convenient Delivery</h2>
                <p class="description center">We offer eco-friendly and fast delivery services within 1-3 days. Customers can 
                    select a branch location, date and time for delivery, and a destination for delivery. All you need to 
                    do is review and confirm your purchase. Before you know it, your order will be ready on the front of your doorstep.</p>
                <p class="redirect center"><a href="./processUserOrder.php">Go to Cart</a></p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/9078/9078956.png">
                <h2 class="center">Professional Assembly</h2>
                <p class="description center">Looking for a professional to assemble your new furniture? We offer professional 
                    services for purchases bought from our furniture department. After purchasing your item, feel free to contact 
                    one of our customer service representatives to book an appointment.</p>
                <p class="redirect center"><a href="./aboutus.php">Meet Our Team</a></p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/8776/8776368.png">
                <h2 class="center">Returns &<br>Exchanges</h2>
                <p class="description center">Not loving your purchase? We offer returns and exchanges for most purchases within 
                    30-days. If you purchase the extended warranty, you have 90-days. Returns and exchanges can be mailed or dropped 
                    off at one of our convenient warehouse locations in your neighborhood.
                </p>
                <p class="redirect center"><a href="./aboutus.php">Contact Us</a></p>
            </div>
        </main>
        </div>
    </body>
</html>