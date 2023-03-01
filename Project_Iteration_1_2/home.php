<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./home.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    </head>
    <script>
        function changeProductH2Header(string){
            $("#productH2").text(string);
        }

        function displayLivingRoom(){
            //ajax to get items
            changeProductH2Header("LIVING ROOM");
        }

        function displayBedroom(){
            //ajax to get items
            changeProductH2Header("BEDROOM");
        }

        function displayDiningRoom(){
            //ajax to get items
            changeProductH2Header("DINING ROOM");
        }

        function displayKidsRoom(){
            //ajax to get items
            changeProductH2Header("KID'S ROOM");
        }

        function displayHomeOffice(){
            //ajax to get items
            changeProductH2Header("HOME OFFICE");
        }
    </script>
    <body>
        <?php 
            require("./NavBar.php");
        ?>
        <p>temp login (xammp apache and mysql needed):</p>
        <p>User: admin<br>pass: password</p>
        <div class="product-container">
            <h1 class="center">FURNITURE</h1>
            <main class="wrapper">
                <aside class="categories">
                    <h2 class="center shop-by-room">SHOP BY ROOM</h2>
                    <div class="categories-flex">
                        <span id="living-room" onclick="displayLivingRoom()">Living Room</span>
                        <span id="bedroom" onclick="displayBedroom()">Bedroom</span>
                        <span id="dining room" onclick="displayDiningRoom()">Dining Room</span>
                        <span id="kids-room" onclick="displayKidsRoom()">Kid's Room</span>
                        <span id="home office" onclick="displayHomeOffice()">Home Office</span>
                    </div>
                </aside>
                <div class="products">
                    <h2 class="center" id="productH2">LIVING ROOM</h2>
                    <div class="products-flex">
                        <div class="card">
                            <img src="https://cdn.shopify.com/s/files/1/2660/5106/products/Hi_Res_JPEG-Ava_58D35050_Sofa_3Q_b3f9ae86-16d9-41b0-8502-cde2693f5df0_medium.progressive.jpg?v=1663774964">
                            <p class="price">$699.99</p>
                            <p>Living Room</p>
                            <p>Dummy Sofa Name</p>
                        </div>
                        <div class="card">
                            <img src="https://cdn.shopify.com/s/files/1/2660/5106/products/Hi_Res_JPEG-Ava_58D35050_Sofa_3Q_b3f9ae86-16d9-41b0-8502-cde2693f5df0_medium.progressive.jpg?v=1663774964">
                            <p class="price">$699.99</p>
                            <p>Living Room</p>
                            <p>Dummy Sofa Name</p>
                        </div>
                        <div class="card">
                            <img src="https://cdn.shopify.com/s/files/1/2660/5106/products/Hi_Res_JPEG-Ava_58D35050_Sofa_3Q_b3f9ae86-16d9-41b0-8502-cde2693f5df0_medium.progressive.jpg?v=1663774964">
                            <p class="price">$699.99</p>
                            <p>Living Room</p>
                            <p>Dummy Sofa Name</p>
                        </div>
                        <div class="card">
                            <img src="https://cdn.shopify.com/s/files/1/2660/5106/products/Hi_Res_JPEG-Ava_58D35050_Sofa_3Q_b3f9ae86-16d9-41b0-8502-cde2693f5df0_medium.progressive.jpg?v=1663774964">
                            <p class="price">$699.99</p>
                            <p>Living Room</p>
                            <p>Dummy Sofa Name</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </body>
</html>