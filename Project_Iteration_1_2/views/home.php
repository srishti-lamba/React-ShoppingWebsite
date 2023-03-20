<?php 
    require("./NavBar.php");
    //require("../config/CreateAndPopulateItemsTable.php");

    
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="../css/home.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
        <script src="../controllers/home.js"></script>
    </head>
    <body>
        <div class="banner">
            <article class="company-info">
                <h1>SMART CUSTOMER SERVICES</h1>
                <p>- Furniture Department -</p>
            </article>
        </div>
        <?php
            if(isset($_SESSION['orderConfirmationMessage'])){
                echo "<script>localStorage.removeItem('shoppinglist');</script>";
                echo $_SESSION['orderConfirmationMessage'];
            }
        ?>
        <div class="product-container">
            <h1 class="center">FURNITURE</h1>
            <main class="wrapper">
                <aside class="categories">
                    <h2 class="center shop-by-room">SHOP BY ROOM</h2>
                    <div class="categories-flex">
                        <span id="living-room" onclick="updateProductDisplay('Living Room')">Living Room</span>
                        <span id="bedroom" onclick="updateProductDisplay('Bedroom')">Bedroom</span>
                        <span id="dining room" onclick="updateProductDisplay('Dining Room')">Dining Room</span>
                        <span id="kids-room" onclick="updateProductDisplay('Kid\'s Room')">Kid's Room</span>
                        <span id="home office" onclick="updateProductDisplay('Home Office')">Home Office</span>
                    </div>
                </aside>
                <div class="products">
                    <h2 class="center" id="productH2">LIVING ROOM</h2>
                    <div class="products-flex">
                    
                    </div>
                    <form type="post" action="./processUserOrder.php" >
                        <div class="shopping-cart" ondragover="dragOver(event)" ondrop="drop(event)">
                            <h2 class="center" id="shoppingCartH2">SHOPPING CART</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2">Total</td>
                                        <td id="total" name="total">0.00</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <p class="shoppingCartErr" style="color: red; display:none; text-align:center;">Your shopping cart is empty</p>
                        <div class="checkOutBtnContainer"> 
                            <input class="checkOutBtn" type="button" onclick="submitForm()" value="Checkout" />
                            <input type="button" class="clearShoppingCartBtn" value="Clear Shopping Cart" onclick="clearShoppingCart()" />
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </body>
</html>