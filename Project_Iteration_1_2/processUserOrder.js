window.addEventListener('load', function () {
    displayShoppinglistFromLocalStorage()
})

$("#submitBtn").click(function() {
    $("form").submit();
});

function displayErrorMessage(msg) {
    $(".errorMessage").text(msg)
    $(".errorMessage").css("display", "block")
}

function hideErrorMessage() {
    $(".errorMessage").css("display", "none")
}

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

            newRow.appendChild(itemNameCell);
            newRow.appendChild(quantityCell);
            newRow.appendChild(priceCell);

            tableBody.appendChild(newRow)

            total += item.quantity * item.price;
        }

        document.getElementById("total").innerHTML = Number(total.toFixed(2));
        document.getElementById("totalForForm").setAttribute("value", Number(total.toFixed(2)));
    }        
}


//Google Map Api
//Auto Complete Address Input
const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
};

var input1 = document.getElementById("destination");
var autoComplete = new google.maps.places.Autocomplete(input1, options);

//Set Default position and zoom of map
var mylatlng = { lat: 43.6536640, lng: -79.37483};
var mapOptions = {
    center: mylatlng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};


var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
directionsDisplay.setMap(map);

function displayDirections(){
    if (directionsDisplay != null) {
        directionsDisplay.set('directions', null);
    }

    const request = {
        origin: document.getElementById("selectLocation").value,
        destination: document.getElementById("destination").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            $("#mapErrMsg").css("display", "none");
            $("#distanceMsg").css("display", "flex");
            $("#distanceVal").text(result.routes[0].legs[0].distance.text);
            //let distanceValForForm = document.getElementById("distanceValForForm");
            //distanceValForForm.setAttribute("value", "hello");
            $("#distanceValForForm").val(result.routes[0].legs[0].distance.text);
        }
        else {
            $("#mapErrMsg").css("display", "block");
            $("#distanceMsg").css("display", "none");
            $("#distanceVal").text("");
        }
    });
}

//On change of destination or warehouse update map
$("#selectLocation").change(function() {
    displayDirections();
});

$("#destination").focusout(function() {
    displayDirections();
});

$("#destination").keyup(function() {
    displayDirections();
});
