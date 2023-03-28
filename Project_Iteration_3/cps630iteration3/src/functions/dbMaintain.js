export function getDbColumns(tableName) {

    var resultArray;

    switch (tableName) {
        case "users":
            resultArray = 
            [
                // Display Name | SQL Name | HTML Element Value Name | Create PHP File Name
                ["Users", "Users", "users", "CreateAndPopulateUsersTable.php"],
                ["User ID", "user_id"],
                ["Name", "userName"],
                ["Phone Number", "telephoneNum"],
                ["Email", "email"],
                ["Address", "address"],
                ["Postal Code", "postalCode"],
                ["Username", "loginId"],
                ["Password", "password"],
                ["Balance", "balance"],
                ["Admin", "isAdmin"]
            ];
            break;

        case "items":
            resultArray = 
            [
                ["Items", "Items", "items", "CreateAndPopulateItemsTable.php"],
                ["Item ID", "item_id"],
                ["Product Name", "productName"],
                ["Price", "price"],
                ["Category", "category"],
                ["Country Produced", "made_in"],
                ["Department Code", "department_code"],
                ["Image URL", "image_url"]
            ];
            break;

        case "orders":
            resultArray = 
            [
                ["Orders", "Orders", "orders", "CreateOrderTable.php"],
                ["Order ID", "orderId"],
                ["Date Issued", "dateIssued"],
                ["Delivery Date", "deliveryDate"],
                ["Delivery Time", "deliveryTime"],
                ["Price", "totalPrice"],
                ["Payment Code", "paymentCode"],
                ["User ID", "userId"],
                ["Trip ID", "tripId"],
                ["Receipt ID", "receiptId"],
                ["Order Status", "orderStatus"]
            ];
            break;

        case "locations":
            resultArray = 
            [
                ["Locations", "BranchLocations", "locations", "CreateAndPopulateLocationsTable.php"],
                ["Location ID", "location_id"],
                ["Address", "locationAddress"],
                ["Latitude", "latitude"],
                ["Longitude", "longitude"]
            ];
            break;

        case "trucks":
            resultArray = 
            [
                ["Trucks", "Trucks", "trucks", "CreateAndPopulateTruckTable.php"],
                ["Truck ID", "truckId"],
                ["Availability", "availabilityCode"]
            ];
            break;

        case "trips":
            resultArray = 
            [
                ["Trips", "Trips", "trips", "CreateTripTable.php"],
                ["Trip ID", "tripId"],
                ["Departure", "source"],
                ["Destination", "destination"],
                ["Distance", "distance"],
                ["Truck ID", "truckId"]
            ];
            break;

        case "reviews":
            resultArray = 
            [
                ["Reviews", "Reviews", "reviews", "CreateAndPopulateReviewsTable.php"],
                ["Review ID", "reviewId"],
                ["User ID", "userID"],
                ["Item ID", "itemID"],
                ["Date", "dateTime"],
                ["Rating", "rating"],
                ["Title", "title"],
                ["Content", "content"]
            ];
            break;
        default:
            resultArray = [];
    }
    return resultArray;
}