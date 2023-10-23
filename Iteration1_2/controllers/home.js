$(document).ready(
    //load living room items on page load
    updateProductDisplay('Living Room'),

)

//load any existing items on shopping list from local storage when html loads
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
            newRow.setAttribute("name", item.productName)
            newRow.setAttribute("quantity", item.quantity)

            let itemNameCell = document.createElement("td");
            itemNameCell.innerHTML = item.productName;

            let priceCell = document.createElement("td");
            priceCell.innerHTML = item.price;

            let quantityCell = document.createElement("td")
            quantityCell.innerHTML = item.quantity;

            newRow.appendChild(itemNameCell)
            newRow.appendChild(quantityCell);
            newRow.appendChild(priceCell)

            tableBody.appendChild(newRow)

            total += item.quantity * item.price;
        }

        document.getElementById("total").innerHTML = Number(total.toFixed(2));
    }        
}


function changeProductH2Header(string){
    $("#productH2").text(string);
}

function updateProductDisplay(category){
    //ajax to get items
    if (category === "Kid's Room") category = category.replace("'", "");

    $(".products-flex").empty()
    $.get(`../models/getProducts.php?category=${category}`, function(data, status) {
        if(status ==='success') {
            data = JSON.parse(data);

            for(let i=0; i<data.length; i++) {
                let item = JSON.parse(data[i]);
                $(".products-flex").append(
                `<div class="card" draggable="true" ondragstart="dragStart(event)" id="${item['item_id']}" data-price='${item['price']}' data-name="${item['productName']}">
                    <img src="${item['image_url']}">
                    <p class="price">${item['price']}</p>
                    <p>${category}</p>
                    <p>${item['productName']}</p>
                </div>`)

            }
            
        }
    })
    changeProductH2Header(category);
}

function dragStart(e) {
    //check if user is dragging the card
    if(e.target.className === "card") {
        e.dataTransfer.setData('id', e.target.id);
        e.dataTransfer.setData('product-name', e.target.dataset.name);
        e.dataTransfer.setData('price', e.target.dataset.price);
    }
    
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {

    if(localStorage.getItem('shoppinglist') === null) {
        let shoppinglist = {items:[]}
        localStorage.setItem('shoppinglist', JSON.stringify(shoppinglist))
    }

    e.preventDefault();
    let productAlreadyInTableBody = false;
    let id = e.dataTransfer.getData('id');
    let productName = e.dataTransfer.getData('product-name');
    let price = e.dataTransfer.getData('price');

    if(id.length === 0 || productName.length === 0 || price.length === 0) return;

    let tableBody = document.querySelector(".shopping-cart > table tbody")
    let tableBodyRows = document.querySelectorAll(".shopping-cart > table tbody > tr")

    //check if product dropped on shopping cart has already been added to shopping cart
    for(i=0; i<tableBodyRows.length; i++){
        if (tableBodyRows[i].getAttribute("name") === productName) {
                productAlreadyInTableBody = true;
                let row = tableBodyRows[i];
                row.setAttribute("quantity", Number(row.getAttribute("quantity")) + 1) 
                row.innerHTML = `<tr><td>${productName}</td><td>${row.getAttribute("quantity")}</td><td>${price}</td>`

                //update quantity key in localstorage
                let shoppinglist = JSON.parse(localStorage.getItem('shoppinglist'));
                for(let i=0; i<shoppinglist.items.length; i++) {
                    let item = shoppinglist.items[i];
                    if(item.productName === productName) {
                        shoppinglist.items[i].quantity += 1;
                        localStorage.setItem('shoppinglist', JSON.stringify(shoppinglist))
                    }
                }
        }
    }

    //if product not added to shopping cart then append new row to table
    if(!productAlreadyInTableBody) {
        let tableRow = document.createElement("tr")
        tableRow.setAttribute("name", productName)
        tableRow.setAttribute("quantity", 1);
        let productCell = document.createElement("td")
        let priceCell = document.createElement("td")
        let quantityCell = document.createElement("td")

        productCell.innerHTML = productName;
        priceCell.innerHTML = price;
        quantityCell.innerHTML = 1;

        tableRow.appendChild(productCell);
        tableRow.appendChild(quantityCell);
        tableRow.appendChild(priceCell);
        tableBody.appendChild(tableRow)

        //add new item to local storage
        let shoppinglist = JSON.parse(localStorage.getItem("shoppinglist"));
        let newItem = {price, productName, quantity:1};
        shoppinglist.items.push(newItem);
        localStorage.setItem('shoppinglist', JSON.stringify(shoppinglist))

        
    }

    let newTotal = Number(document.getElementById("total").innerHTML) + Number(price)
    newTotal = newTotal.toFixed(2);
    let totalCell = document.getElementById("total")
    totalCell.innerHTML = newTotal;

}

function clearShoppingCart() {
    $("tbody").empty();
    $("#total").html("0.00");
    localStorage.removeItem('shoppinglist')
}

function submitForm() {
    if(localStorage.getItem('shoppinglist') === null) {
        $(".shoppingCartErr").css("display", "block");
    } else {
        $('form').submit();
    }
}