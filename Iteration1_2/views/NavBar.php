<?php
    session_start();
    //include('../config/CreateAndPopulateTruckTable.php');
    //include('../config/CreateAndPopulateLocationsTable.php');
?>
<!DOCTYPE html>
<html>
    <head>
        <meta char="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="../css/NavBarStyle.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
        <script src="../controllers/NavBar.js"></script>
    </head>
    <body>
        <header>
            <div class="logo"><img src="https://t3.ftcdn.net/jpg/03/59/58/18/360_F_359581872_hMDiF4RkLXiJ7fTKq0VGvhdLdepLncMK.jpg"  style="mix-blend-mode: multiply; margin: -50px; height: 150px"/></div> 

            <!-- Navigation -->
            <nav class="nav navbar">
                <ul>
                    <li><a href="../views/home.php"><i class="fa-solid fa-house"></i> HOME</a></li>
                    <li><a href="../views/aboutus.php"><i class="fa-solid fa-people-group"></i> ABOUT US</a></li>
                    <li><a href="../views/contactus.php"><i class="fa-solid fa-headset"></i> CONTACT US</a></li>
                    <li><a href="../views/services.php"><i class="fa-solid fa-hand-holding-heart"></i> TYPES OF SERVICES</a></li>
                    <li><a href="../views/reviews.php"><i class="fa-solid fa-star"></i> REVIEWS</a></li>
                    <?php
                        if(isset($_SESSION['loggedin'])) {
                            echo "<li class=\"searchLbl\" onclick='openSearch()'><i class=\"fa-solid fa-magnifying-glass\"></i> SEARCH</li>";
                        }
                    ?>

                    <!-- Database Maintain Dropdown -->
                    <?php
                        if(isset($_SESSION['loggedin']) && $_SESSION['isAdmin'] == 1) {
                            echo "<li class=\"dbMaintain\">"; 
                                echo "<div class=\"dbMaintain-btn\" onclick=\"toggleDropdown()\"><i class=\"fa-solid fa-screwdriver-wrench\"></i> DB MAINTAIN</div>";
                                echo "<div class=\"dbMaintain-options\">";
                                    echo "<a href=\"./dbInsert.php\"><i class=\"fa-solid fa-plus\"></i> Insert</a>";
                                    echo "<a href=\"./dbDelete.php\"><i class=\"fa-solid fa-minus\"></i> Delete</a>";
                                    echo "<a href=\"./dbSelect.php\"><i class=\"fa-solid fa-hand-pointer\"></i> Select</a>";
                                    echo "<a href=\"./dbUpdate.php\"><i class=\"fa-solid fa-pen\"></i> Update</a>";
                                echo "</div>";
                            echo "</li>";
                        }
                    ?>
                    
                </ul>
            </nav>

            <!-- Log in -->
            <ul class="right">
                <?php
                    if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true){
                        //echo "<li><div class='cart'><i class='fa-solid fa-cart-shopping'></i> Cart</div></li>";
                        echo "<li><p>Hello, ". $_SESSION['username'] ."! </p></li>";
                        echo "<li><form action='../models/logout.php'>  <button type=\"submit\">Log Out</button> </form></li>";
                    }
                    else{
                        echo "<li><button type='button' class='sign-up'>Sign Up</button></li>
                              <li><button type='button' class='login' onclick='openLogin()'>Login</button></li>";
                    }
                ?>
                </ul>
        </header>

        <!-- Screen Dim -->
        <div id="overlay" onclick="toggleOffOverlay()"></div>

        <!-- Login -->
        <div id="loginWindow">
            <form id="loginForm" action="../models/login.php" method="POST">
                <h1>Login</h1>
                <input type="text" name="username" id="username" placeholder="Username">
                <input type="password" name="password" id="password" placeholder="Password">
                <p id="errMsg">The Username/Password you entered was invalid!</p>
                <p id="errMsg2">Both Username and Password are required!</p>
                <button class="submit" type="button" name="login" value="Login" onclick="submitLogin()">Login</button>
            </form>
        </div>

        <!-- Search -->
        <div id="searchWindow">
            <form id="searchForm" action="../models/search.php" method="POST">
                <h1>Search</h1>
                <p>Search user orders</p>
                <label for="userid">User ID:</label>
                <input type="text" name="userid" id="userid" value="<?php 
                            if(isset($_SESSION['search-userid'])){
                                echo $_SESSION['search-userid'];}?>"><br>
                <label for="orderid">Order ID:</label>
                <input type="text" name="orderid" id="orderid" value="<?php 
                            if(isset($_SESSION['search-orderid'])){
                                echo $_SESSION['search-orderid'];}?>">
                <p id="errMsg">No such order has been placed.</p>
                <button class="searchBtn" type="button" name="search" value="Search" onclick="submitSearch()">Search</button>
            </form>
            <div id="searchTable"></div>
        </div>

    </body>
    <?php 
        if(isset($_SESSION['failedLogin']) && $_SESSION['failedLogin'] == true){
            echo '<script type="text/javascript">displayLoginError();</script>';
            $_SESSION['failedLogin'] = false;
        }

        if(isset($_SESSION['search-mode']) && $_SESSION['search-mode'] == true){
            echo '<script type="text/javascript">displaySearch("' . $_SESSION['search-result'] . '");</script>';
            $_SESSION['search-mode'] = false;
        }
    ?>
</html>
