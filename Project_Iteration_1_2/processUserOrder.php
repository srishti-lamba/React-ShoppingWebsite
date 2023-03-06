<?php
    include('NavBar.php');
    include('fetchLocations.php');
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
        <script>
             window.addEventListener('load', function () {
                displayShoppinglistFromLocalStorage()
            })

            function displayShoppinglistFromLocalStorage() {
                if(localStorage.getItem('shoppinglist') !== null) {
                    let tableBody = document.getElementById("tableBody");
                    let shoppinglist = JSON.parse(localStorage.getItem('shoppinglist'));
                    let total = 0;

                    for(let i=0; i<shoppinglist.items.length; i++) {
                        let item = shoppinglist.items[i]
                        let newRow = document.createElement("tr")

                        let itemNameCell = document.createElement("td");
                        itemNameCell.innerHTML = item.productName;

                        let priceCell = document.createElement("td");
                        priceCell.innerHTML = item.price;

                        let quantityCell = document.createElement("td")
                        quantityCell.innerHTML = item.quantity;

                        newRow.appendChild(itemNameCell)
                        newRow.appendChild(priceCell)
                        newRow.appendChild(quantityCell);

                        tableBody.appendChild(newRow)

                        total += item.quantity * item.price;
                    }

                    document.getElementById("total").innerHTML = total;
                    document.getElementById("totalForForm").setAttribute("value", total);
                    console.log(document.getElementById('totalForForm'));
                }        
            }
        </script>
    </head>

    <body>
        <div class="formContainer">
            <form method="post" action="./processUserPayment.php">
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
                

                <div class="userInputContainer">
                    <label for="selectLocation" >Select Branch Location</label>
                    <?php
                        echo "<select id=\"selectLocation\" class=\"locationSelector\" name=\"location\">";
                        $result = fetchLocations();
                        while($row = $result->fetch_assoc()) {
                            echo "<option value=\"" . $row['locationAddress'] . "\">" . $row['locationAddress'] . "</option>";
                            echo "hello";
                        }
                        echo "</select>"
                    ?>

                    <div>
                        <label for="deliveryDate">Delivery Date</label>
                        <input id="deliveryDate" name="deliveryDate" type="date"/>

                        <label for="deliveryTime">Delivery Time</label>
                        <input id="deliveryTime" name="deliveryTime" type="time" min="09:00" max="18:00"/>
                    </div>

                    <input name='total' value="0" style="display:none" id="totalForForm"/>

                    
                </div>
                <div class="submitContainer">
                    <input type="submit" value="Make Payment & Place Order" />
                </div>
            </form>
        </div>

    </body>

</html>