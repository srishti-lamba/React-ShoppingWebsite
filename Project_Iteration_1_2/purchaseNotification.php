<?php
    include("NavBar.php");
    $orderId = $_SESSION['orderId'];
?>

<!DOCTYPE html>
<html>
    <header>
        <script>
            localStorage.removeItem('shoppinglist');
        </script>
    </header>
    <body>
        <?php
            echo "<h1>Your purchase has been processed! Your order Id is $orderId, use this number to track your order!</h1>";
        ?>
    </body>
</html>