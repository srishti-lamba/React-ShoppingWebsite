<?php
    include('NavBar.php');
    include('fetchLocations.php');
    include('./CreateAndPopulateTruckTable.php');
    include('./CreateAndPopulateLocationsTable.php');
    if(!isset($_SESSION['loggedin'])) {
        echo "<h2>You need to be logged in to purchase items</h2>";
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./processUserOrder.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
    </head>

    <body>
        <form method="post" action="./processUserPayment.php">
            <div class="formContainer">
                <main>
                    <section class="selectBranchContainer">
                        <label class="selectBranchHeader" for="selectLocation" >1. Select Branch Location</label>
                            <?php
                                echo "<select id=\"selectLocation\" class=\"locationSelector\" name=\"location\">";
                                $result = fetchLocations();
                                while($row = $result->fetch_assoc()) {
                                    echo "<option value=\"" . $row['locationAddress'] . "\">" . $row['locationAddress'] . "</option>";
                                    echo "hello";
                                }
                                echo "</select>"
                            ?>
                        <input id="destination" name="destination" type="text">
                        <div id="mapErrMsg"><p>Error: there is currently no known route for this address!</p></div>

                        <div id="distanceMsg"><p>Estimated Distance: </p><p id="distanceVal">23</p></div>
                        <div>
                            <label for="deliveryDate">Delivery Date</label>
                            <input id="deliveryDate" name="deliveryDate" type="date"/>

                            <label for="deliveryTime">Delivery Time</label>
                            <input id="deliveryTime" name="deliveryTime" type="time" min="09:00" max="18:00"/>
                        </div>

                        <input name='total' value="0" style="display:none" id="totalForForm"/>
                        <div id="googleMap"></div>
                    </section>
                    <section class="paymentContainer">
                        <h1>2. Payment</h2>
                        <p>Payment Options</p>
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
</html>