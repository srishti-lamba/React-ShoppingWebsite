function initMap() {

    const danforth = { lat: 43.690, lng:-79.294 };
    const suntract = { lat: 43.714, lng: -79.512 };
    const mclevin = { lat: 43.653, lng: -79.391 };
    const dundas = {lat: 43.623, lng: -79.567};
    const britannia = {lat: 43.632, lng: -79.676};

    // --- Create Map
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: danforth,
    });

    // --- Marker for Danforth Location
    const marker1 = new google.maps.Marker({
        position: danforth,
        map: map,
    });

    const infoWindow1 = new google.maps.InfoWindow({
        content: "<h4>2872 Danforth Avenue</h4><p>Toronto, ON, M4C 1M1, Canada</p>"
    });
    marker1.addListener("click", function () {
        infoWindow1.open(map, marker1);
    });

    // --- Marker for Suntract Location
    const marker2 = new google.maps.Marker({
        position: suntract,
        map: map,
    });

    const infoWindow2 = new google.maps.InfoWindow({
        content: "<h4>10 Suntract Road</h4><p>Toronto, ON, M9N 3N9</p>"
    });
    marker2.addListener("click", function () {
        infoWindow2.open(map, marker2);
    });

    // --- Marker for McLevin Location
    const marker3 = new google.maps.Marker({
        position: mclevin,
        map: map,
    });

    const infoWindow3 = new google.maps.InfoWindow({
        content: "<h4>20 McLevin Avenue</h4><p>Scarborough, ON, M1B 2V5</p>"
    });
    marker3.addListener("click", function () {
        infoWindow3.open(map, marker3);
    });

    // --- Marker for Dundas Location
        const marker4 = new google.maps.Marker({
        position: dundas,
        map: map,
    });

    const infoWindow4 = new google.maps.InfoWindow({
        content: "<h4>2070 Dundas Street East</h4><p>Mississauga, ON, L4X 1L9</p>"
    });
    marker4.addListener("click", function () {
        infoWindow4.open(map, marker4);
    });

    // --- Marker for Britannia Location
        const marker5 = new google.maps.Marker({
        position: britannia,
        map: map,
    });

    const infoWindow5 = new google.maps.InfoWindow({
        content: "<h4>201 Britannia Road East</h4><p>Mississauga, ON, L4Z 3X8</p>"
    });
    marker4.addListener("click", function () {
        infoWindow5.open(map, marker5);
    });
}

window.initMap = initMap;