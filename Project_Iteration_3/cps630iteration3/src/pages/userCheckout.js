import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import axios from "axios";
import './userCheckout.css';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { setOrderId } from "../features/orderIdSlice";
import { useNavigate } from "react-router-dom";
import { Autocomplete, useJsApiLoader, GoogleMap, DirectionsRenderer} from "@react-google-maps/api";



const UserCheckoutPage = ({toggleLogin, showLogin}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const state = useSelector(state => state)
    const [shoppingCart, setShoppingCart] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
    const [locations, setLocations] = useState([])
    const [deliveryDate, setDeliveryDate] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [distance, setDistance] = useState("");

    //Coupons Variables
    const [coupon, setCoupon] = useState("");
    const [discountedTotal, setDiscountedTotal] = useState(null);
    const [initalTotal, setInitialTotal] = useState(null);

    //Google Map Variables
    const [displayDirections, setDisplayDirections] = useState(null);
    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [mapErr, setMapErr] = useState(null);
    const google = window.google;

    useEffect(() => {
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/fetchLocations.php"
        axios.get(url)
        .then(res => {
            let locations = res.data
            setLocations(locations)
            setSource(JSON.parse(locations[0]).locationAddress)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        let shoppingCart = localStorage.getItem("shoppingCart")
        let total = localStorage.getItem("shoppingCartTotal")
        setShoppingCart(JSON.parse(shoppingCart))
        setTotalPrice(Number(total))
        setInitialTotal(Number(total))
    }, [])

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDqs21kU6-FIEIWa7bnDbepY2k0G6e7uvg",
        libraries: ['places'],
    })
    if(!isLoaded){
        return (<></>)
    }

    const submitOrder = () => {
        if(user === null) {
            setErrorMsg("Must be logged in to make a purchase");
        } else {
            const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/processUserPayment.php";
            let fdata = new FormData();
            fdata.append('location', source)
            fdata.append('destination', destination)
            fdata.append('distanceVal', distance)
            fdata.append('deliveryDate', deliveryDate)
            fdata.append('deliveryTime', deliveryTime)
            fdata.append('total', totalPrice)
            fdata.append('cardNumber', cardNumber)
            fdata.append('userId', user.user.id)

            axios.post(url, fdata)
            .then(res => {
                dispatch(setOrderId(res.data))
                localStorage.removeItem('shoppingCart');
                localStorage.removeItem('shoppingCartTotal')
                navigate('/')
            })
            .catch(err => {
                setErrorMsg(err.response.statusText);
                console.log(err)
            })
        }
        
    }

    const processCoupon = () => {
        setupCouponDatabase()
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/processCoupon.php";
        let fdata = new FormData();
        fdata.append('coupon', coupon);
        axios.post(url, fdata)
        .then(res => {
            let response = (JSON.parse(res.data[0]));
            let discount = response.discount;
            let newPrice = (initalTotal*((100-discount)/100));
            //Round to nearest 2 decimals
            let newTotal = (Math.round(newPrice * 100) / 100)
            setDiscountedTotal(newTotal);
            //Update total price
            setTotalPrice(newTotal);
        })
        .catch(err => {
            setDiscountedTotal(null);
            setTotalPrice(initalTotal);
        })
    }

    function setupCouponDatabase() {
        let url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/createAndPopulateCoupons.php"
        let fdata = new FormData()
        axios.post(url, fdata)
        .catch((err) => {
            console.log(err)
        })
    }

    async function calculateRoute() {
        if (source === '') {return}
        const directionsService = new google.maps.DirectionsService()
        try{
            const results = await directionsService.route({
            origin: source,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            })
            setDirectionsResponse(results)
            setDistance(results.routes[0].legs[0].distance.text)
            setMapErr(null);
            return;
        }
        catch{
            setDirectionsResponse(null);
            setDistance("");
            setMapErr(true);
        }
    }
    
    if(displayDirections == true){
        setDisplayDirections(null);
        calculateRoute();
    }

    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}

            <div>
                <div className="formContainer">
                    <main className="mainContainer">
                        {errorMsg.length > 0 && <p style={{color:'red', textAlign:'center'}}>{errorMsg}</p>}
                        <section className="selectBranchContainer">
                            <p className="errorMessage">ErrorMessage</p>
                            <label className="selectBranchHeader" htmlFor="selectLocation" >1. Select Branch Location</label>
                                <select className="locationSelector" value={source} onChange={e => {setSource(e.target.value); setDisplayDirections(true)}}>
                                    {locations.map((loc, i) => {
                                        return(
                                            <option key={i}>
                                                {JSON.parse(loc).locationAddress}
                                            </option>
                                        )
                                    })}
                                </select>
                                <Autocomplete>
                                    <input className="destination" placeholder="Enter a location" type="text" value={destination} onChange={(e) => {setDestination(e.target.value); setDisplayDirections(true);}}
                                    onKeyPress={(e) => {setDestination(e.target.value)}}/>
                                </Autocomplete>
                            {mapErr ? (<div className="mapErrMsg"><p>Error: there is currently no known route for this address!</p></div>) : null}

                            {distance ? (<div className="distanceMsg"><p>Estimated Distance: </p><p id="distanceVal">{distance}</p></div>) :null}
                            <input id="distanceValForForm" style={{display: 'none'}} value="0" type="text" onChange={(e) => console.log(e)} />
                            <div>
                                <label htmlFor="deliveryDate">Delivery Date</label>
                                <input id="deliveryDate" type="date" value={deliveryDate}
                                    onChange={(e) => setDeliveryDate(e.target.value)}    
                                />

                                <label htmlFor="deliveryTime">Delivery Time</label>
                                <input id="deliveryTime" type="time" min="09:00" max="18:00" value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}/>
                            </div>

                            <div className="googleMap">
                                <GoogleMap center={{lat: 43.690060, lng: -79.294570}} mapContainerStyle={{width: '100%',height: '100%'}} zoom={10}  onLoad={map => setMap(map)}>
                                {directionsResponse && (<DirectionsRenderer directions={directionsResponse} />)}
                                </GoogleMap>
                            </div>
                        </section>
                        <section className="paymentContainer">
                            <h1>2. Payment</h1>
                            <div>
                                <p>Payment Options</p>
                                <select className="selectPaymentOption">
                                    <option value="debit">Debit</option>
                                    <option value="credit">Credit</option>
                                </select>
                                <label htmlFor="ccn">Card Number:</label>
                                <input className="cardNumber" type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" autoComplete="cc-number" maxLength="19" placeholder="xxxxxxxxxxxxxxxx" 
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}         
                                />
                            </div>
                        </section>
                        <section className="couponSection">
                            <h1>3. Apply Discounts</h1>
                            <div>
                                <p>Add a promotion code</p>
                                <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)}></input>
                                <button onClick={processCoupon}>Apply</button>
                            </div>
                        </section>
                    </main>
                    <aside className="aside-container">
                        <h1 className="aside-h1">Order Summary</h1>
                        <div className="aside-flex">
                            <table className="shoppinglist">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {shoppingCart.map(item => {
                                        return(
                                            <tr key={item.item_id}>
                                                <td>{item.productName}</td>
                                                <td>{item.quantity}</td>
                                                <td>${String(item.price).includes(".") ? item.price : String(item.price).concat(".00")}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    {discountedTotal ? (
                                        <tr>
                                            <td colSpan="2" style={{'textDecoration':'line-through', color:'red'}}>Total</td>
                                            <td id="total" style={{'textDecoration':'line-through', color:'red'}}>${initalTotal}</td>
                                        </tr>) 
                                    :<tr>
                                        <td colSpan="2">Total</td>
                                        <td id="total">${totalPrice}</td>
                                    </tr>  
                                    }
                                    {discountedTotal ? (<tr><td colSpan="2" style={{color:'green'}}>Total</td><td id="total" style={{color:'green'}}>${discountedTotal}</td></tr>): null}
                                </tfoot>
                            </table>
                            <div className="submitContainer">
                                <input type="button" value="Make Payment & Place Order" onClick={submitOrder} />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}

export default UserCheckoutPage;