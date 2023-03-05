<?php
    include('NavBar.php');
    if(!isset($_SESSION['loggedin'])) {
        echo "<h2>You need to be logged in to purchase items</h2>";
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="./home.css">
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
                }        
            }
        </script>
    </head>

    <body>
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

        <p>allow user to select location, input address, and button to make pmt</p>
    </body>

</html>