<?php
    include('NavBar.php');
    include('fetchLocations.php');
    include('./config/CreateAndPopulateTruckTable.php');
    include('./config/CreateAndPopulateLocationsTable.php');
    //include('./config/CreateTripTable.php');
    //include('./config/CreateOrderTable.php');
    // if(!isset($_SESSION['loggedin'])) {
    //     echo "<h2>You need to be logged in to purchase items</h2>";
    // }

    unset($_SESSION['orderConfirmationMessage']);
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./css/processUserOrder.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    </head>
    <body>
        <form method="post" action="./processUserPayment.php">
            <div class="formContainer">
                <main>
                    <section class="selectBranchContainer">
                        <p class="errorMessage">ErrorMessage</p>
                        <label class="selectBranchHeader" for="selectLocation" >1. Select Branch Location</label>
                            <?php
                                echo "<select id=\"selectLocation\" class=\"locationSelector\" name=\"location\">";
                                $result = fetchLocations();
                                while($row = $result->fetch_assoc()) {
                                    $locOption = "<option value=\"" . $row['locationAddress'] . "\"";
                                    if ((isset($_SESSION['order-location'])) && ($row['locationAddress'] == $_SESSION['order-location']))
                                        { $locOption = $locOption . " selected";}
                                    $locOption = $locOption . ">" . $row['locationAddress'] . "</option>";
                                    echo $locOption;
                                }
                                echo "</select>";                                
                            ?>
                        <input id="destination" name="destination" type="text" value="<?php 
                            if(isset($_SESSION['order-destination'])){
                                echo $_SESSION['order-destination'];}?>">
                        <div id="mapErrMsg"><p>Error: there is currently no known route for this address!</p></div>

                        <div id="distanceMsg"><p>Estimated Distance: </p><p id="distanceVal">23</p></div>
                        <input id="distanceValForForm" name="distanceVal" style="display: none;" value="0" type="text" />
                        <div>
                            <label for="deliveryDate">Delivery Date</label>
                            <input id="deliveryDate" name="deliveryDate" type="date" value="<?php 
                            if(isset($_SESSION['order-date'])){
                                echo $_SESSION['order-date'];}?>"/>

                            <label for="deliveryTime">Delivery Time</label>
                            <input id="deliveryTime" name="deliveryTime" type="time" min="09:00" max="18:00" value="<?php 
                            if(isset($_SESSION['order-time'])){
                                echo $_SESSION['order-time'];}?>"/>
                        </div>

                        <!-- <input name='total' value="0" style="display:none" id="totalForForm"/> -->
                        <div id="googleMap"></div>
                    </section>
                    <section class="paymentContainer">
                        <h1>2. Payment</h2>
                        <p>Payment Options</p>
                        <select class="selectPaymentOption">
                            <option value="debit">Debit</option>
                            <option value="credit">Credit</option>
                        </select>
                        <label for="ccn">Card Number:</label>
                        <input id="cardNumber" name="cardNumber" id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxxxxxxxxxxxxxx" value="<?php 
                            if(isset($_SESSION['order-cardNumber'])){
                                echo $_SESSION['order-cardNumber'];}?>">
                    </section>
                </main>
                <aside>
                    <h1>Order Summary</h1>
                    <div class="aside-flex">
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
                                    <td id="total">0.00</td>
                            </tr>
                        </tfoot>
                        </table>
                        <input name='total' value="0" style="display:none" id="totalForForm"/>
                        <div class="submitContainer">
                            <input type="button" id="submitBtn" value="Make Payment & Place Order" />
                        </div>
                    </div>
                </aside>
            </div>
        </form>
    </body>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCUm2IsAwT5P2q3Xu1-2EDJyTpR2t3HPC0&libraries=places"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="./processUserOrder.js"></script>
    <?php
        if(isset($_SESSION['purchase-err'])) {
            echo "<script>displayErrorMessage('" .$_SESSION['purchase-err'] . "')</script>";
        }
    ?>
</html>