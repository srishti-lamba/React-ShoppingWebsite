<!DOCTYPE html>
<html>
    <head>
        <title>About Us</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/aboutus.css">
        <script src="../controllers/aboutus.js"></script>
    </head>
    <body>
        <?php 
            require("./NavBar.php");
            unset($_SESSION['orderConfirmationMessage']);
        ?>
        <div class="main-image">
            <article class="main-title">
                <h1>MEET THE TEAM</h1>
            </article>
        <main class="flex">
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png">
                <h2 class="center">Raymond Floro</h2>
                <p class="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png">
                <h2 class="center">Roberto Mariani</h2>
                <p class="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png">
                <h2 class="center">Srishti Lamba</h2>
                <p class="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
            </div>
            <div class="card">
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png">
                <h2 class="center">Vanessa Landayan</h2>
                <p class="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
            </div>
        </main>
        </div>

        <article class="main-title">
            <h1>VISIT A LOCATION</h1>
        </article>
        <div id="map" style="width: 100%; height: 500px;"></div>
        <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqs21kU6-FIEIWa7bnDbepY2k0G6e7uvg&callback=initMap"
        defer
        ></script>
    </body>
</html>