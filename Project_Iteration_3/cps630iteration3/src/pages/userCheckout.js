import React, { useEffect, useState } from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";

const UserCheckoutPage = ({toggleLogin, showLogin}) => {
    const [shoppingCart, setShoppingCart] = useState([])
    const [totalPrice, setTotalPrice] = useState([])

    useEffect(() => {
        let shoppingCart = localStorage.getItem("shoppingCart")
        let total = localStorage.getItem("shoppingCartTotal")
        setShoppingCart(JSON.parse(shoppingCart))
        setTotalPrice(Number(total))
    }, [])

    console.log(shoppingCart)
    console.log(totalPrice)

    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}

            <div>
                checkout page
            </div>
        </>
    )
}

export default UserCheckoutPage;