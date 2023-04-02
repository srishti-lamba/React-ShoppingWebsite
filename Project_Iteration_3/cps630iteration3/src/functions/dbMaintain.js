import axios from "axios";

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
                ["Salt", "salt"],
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
                ["Salt", "Salt"],
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

        case "coupons":
            resultArray = 
            [
                ["Coupons", "Coupons", "coupons", "createAndPopulateCoupons.php"],
                ["Coupon Code", "couponCode"],
                ["Discount", "discount"]
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

export function getDbRows(columnArray, setTableRows) {

    // Assure table exists
    let fileName = columnArray[0][3]
    const urlFile = `http://localhost/CPS630-Project-Iteration3-PHPScripts/${fileName}`;
    axios.post(urlFile)
    .then(()  => {
        
        // Get Rows
        let tableName = columnArray[0][1].toLowerCase()
        const urlRow = `http://localhost/CPS630-Project-Iteration3-PHPScripts/getTableRows.php?table=${tableName}`;
        axios.get(urlRow)
        .then(res  => {
            setTableRows(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export function setPageHeight() {
    function setMinHeight() {
        let navHeight = document.getElementsByTagName("header")[0].offsetHeight
        document.getElementById("main-image").style.minHeight = (document.documentElement.clientHeight - navHeight) + "px"
        document.getElementsByTagName("body")[0].style.height = (document.documentElement.clientHeight - 1) + "px"
    };

    window.addEventListener('resize', setMinHeight)
    if (document.readyState === 'complete') {
        setMinHeight()
    } else {
        window.addEventListener('load', setMinHeight)
        return () => window.removeEventListener('load', setMinHeight)
    }
}


export function setQuery(oldDisplayQuery, oldSqlQuery, setQueryDisplay, setQuerySQL) {
    let newDisplayQuery = oldDisplayQuery
    let newSqlQuery = oldSqlQuery

    // <
    newDisplayQuery = newDisplayQuery.replace("&lt;", "<");
    newSqlQuery = newSqlQuery.replace("&lt;", "<");

    // >
    newDisplayQuery = newDisplayQuery.replace("&gt;", ">");
    newSqlQuery = newSqlQuery.replace("&gt;", ">");

    setQueryDisplay(newDisplayQuery)
    setQuerySQL(newSqlQuery)
}

export function submitQuery (querySQL, setQuery, setQuerySQL, setQueryDisplay, getSqlDefault, setErrorMsg, setSuccessMsg, setTable, setColumnArray, setTableRows, resetPage) {
    if(querySQL === getSqlDefault()) {
        setErrorMsg("Fields cannot all be empty")
        return
    }
    const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/dbMaintainExecuteQuery.php"
    let fdata = new FormData()
    fdata.append('query', querySQL);
    axios.post(url, fdata)
    .then(res=> {
        setSuccessMsg(res.data);
        resetPage(setTable, setColumnArray, setTableRows, setQuery, setQueryDisplay, setQuerySQL)
    })
}

export function resetPage(setTable, setColumnArray, setTableRows, setQuery, setQueryDisplay, setQuerySQL) {
    
    ["inputValuesForm", "queryDiv", "tableView", "querySubmitForm"].map(
        (formName) => document.getElementById(formName).style.display = "none"
    )
    
    document.getElementById("tableName").value = "select"
    setTable(null)
    setColumnArray([])
    setTableRows([])
    setQuery("", "", setQueryDisplay, setQuerySQL)
}

export function updateQueryDiv(queryDisplay, getDisplayDefault) {
    if (queryDisplay.length > 0) {
        document.getElementById("queryDisplay").innerHTML = queryDisplay
        if (queryDisplay !== getDisplayDefault()) {
            document.getElementById("querySubmitForm").style.display = "block"
        }
    }
}

export function showPage(columnArray, getDisplayDefault, getSqlDefault, setQueryDisplay, setQuerySQL) {
    if (columnArray.length > 0) {
        ["inputValuesForm", "queryDiv", "tableView", "inputColumns"].map(
            (formName) => {
                let elem = document.getElementById(formName)
                if (elem !== null) elem.style.display = "block"
            }
        )
        setQuery(getDisplayDefault(), getSqlDefault(), setQueryDisplay, setQuerySQL)
    }
}

export function showSuccessMsg(successMsg) {
    if (successMsg.length > 0) {
        document.querySelector("#main-title + .box").style.display = "block"
        document.getElementById("successMsg").style.display = "block"
    }
}

export function showErrorMsg(errorMsg) {
    if (errorMsg.length > 0) {
        document.querySelector("#main-title + .box").style.display = "block"
        document.getElementById("errorMsg").style.display = "block"
    }
}

export function resetResults(successMsg, errorMsg, setSuccessMsg, setErrorMsg) {
    if (successMsg.length > 0 || errorMsg.length > 0) {
        setSuccessMsg("")
        setErrorMsg("")
    }

    ["#main-title + .box", "#successMsg", "#errorMsg"].map(
        (formName) => document.querySelector(formName).style.display = "none"
    )
}