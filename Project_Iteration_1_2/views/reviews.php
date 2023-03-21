<!DOCTYPE html>
<html>
    <head>
        <title>About Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/reviews.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <body>
        <?php 
            require("./NavBar.php");
            unset($_SESSION['orderConfirmationMessage']);
        ?>
        <div class="main-image">
            <article class="main-title">
                <h1>Reviews</h1>
            </article>
        <main class="flex">
            <div class="card">
                <div class="user-container">
                    <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/>
                    <div class="reviewInfo">
                        <p>Eric</p>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                    </div>
                </div>
                <p class="review">
                    I purchased furniture from Smart Customer Service and I have no complaints. The delivery was on time and the quality of the furniture is amazing.
                </p>
            </div>

            <div class="card">
                <div class="user-container">
                    <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/>
                    <div class="reviewInfo">
                        <p>John</p>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                    </div>
                </div>
                <p class="review">
                    I purchased a sofa last month and I couldn't be happier with my purchase. The whole process was seamless. Delivery was fast and on time and the quality 
                    was amazing. Whenever I need furniture I will make sure to purchase from Smart Customer Service.
                </p>
            </div>

            <div class="card">
                <div class="user-container">
                    <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/>
                    <div class="reviewInfo">
                        <p>William</p>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                    </div>
                </div>
                <p class="review">
                    I made a purchase a few months ago and can not complain. The online store is very well desgined and easy to use and makes online shopping easy!.
                </p>
            </div>

            <div class="card">
                <div class="user-container">
                    <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/>
                    <div class="reviewInfo">
                        <p>Michael</p>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                    </div>
                </div>
                <p class="review center">
                    I had a good experience when making a purchase. The online store is easy to use and the whole process went seamlessly. Delivery was fast and on time too. 
                    Overall, I had a positive experience. 
                </p>
            </div>
            
        </main>
        </div>
    </body>
</html>