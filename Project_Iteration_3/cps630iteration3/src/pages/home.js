import React, {useState, useEffect } from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { selectOrderId } from "../features/orderIdSlice";
import { resetOrderId } from "../features/orderIdSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ProductCard from "../components/productCard";
import { useNavigate } from "react-router-dom";
import './home.css';

const Home = ({showLogin, toggleLogin}) => {
    const dispatch = useDispatch();
    const [productCategory, setProductCategory] = useState('living room');
    const [categoryDisplay, setCategoryDisplay] = useState('Living Room');
    const [shoppingCart, setShoppingCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const user = useSelector(selectUser);
    const orderId = useSelector(selectOrderId);
    const navigate = useNavigate();
    {user !== null && toggleLogin(false)}

    const setDisplayAndCategory = (display, category) => {
        setProductCategory(category)
        setCategoryDisplay(display)
    }

    const dragOver = (e) => {
        e.preventDefault()
    }

    const drop = (e) => {
        e.preventDefault()
        let itemAlreadyInShoppingCart = false
        let newItem = {
        item_id: e.dataTransfer.getData("id"),
        productName: e.dataTransfer.getData("productName"),
        quantity: Number(e.dataTransfer.getData("quantity")),
        price: Number(e.dataTransfer.getData("price"))
        }
                
        for(let i=0; i<shoppingCart.length; i++) {
            let item = shoppingCart[i]
            if(item.item_id === newItem.item_id) {
                itemAlreadyInShoppingCart = true
                newItem.quantity = item.quantity + 1
                break;
            }
        }
        if(itemAlreadyInShoppingCart) {
            let newShoppingCart = shoppingCart.map(item => item.item_id !== newItem.item_id ? item : newItem)
            setShoppingCart(newShoppingCart)
        } else {
            setShoppingCart([...shoppingCart, newItem])

        }

    }

    useEffect(() => {
        let newTotal = 0;
        for(let i=0; i<shoppingCart.length; i++) {
            let item = shoppingCart[i]
            newTotal += item.price*item.quantity;
        }

        if(shoppingCart.length > 0 && errorMsg.length > 0) {
            setErrorMsg("")
        }

        setTotal(newTotal.toFixed(2))

        if(shoppingCart.length > 0) {
            localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
            localStorage.setItem("shoppingCartTotal", newTotal)
        }
    }, [shoppingCart])



    useEffect(() => {
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/getProducts.php";
        axios.get(`${url}?category=${productCategory}`)
        .then(response => {
            setProducts(response.data)
        }).catch(err => console.log(err))
    }, [productCategory])

    useEffect(() => {
        if(localStorage.getItem('shoppingCart') && localStorage.getItem('shoppingCartTotal')) {
            let shoppingCart = localStorage.getItem("shoppingCart")
            let total = localStorage.getItem("shoppingCartTotal")
            setShoppingCart(JSON.parse(shoppingCart))
            setTotal(Number(total))
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log('hello')
            dispatch(resetOrderId());
        }, 30000)

        return () => clearTimeout(timer);
    }, [])



    const checkOutOrder = () => {
        if(shoppingCart.length === 0) {
            setErrorMsg("Your shopping cart is empty")
        } else {
            navigate("/checkout")
        }
    }

    const resetShoppingCart = () => {
        setShoppingCart([])
        localStorage.removeItem("shoppingCart")
        localStorage.removeItem("shoppingCartTotal")
    }
    
    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}
            
            <div className="banner">
                <article className="company-info">
                    <h1>SMART CUSTOMER SERVICES</h1>
                    <p>- Furniture Department -</p>
                </article>
            </div>

            {orderId !== null && <p className="orderNotification">Your order id is {orderId.orderId}, use this number to track your order!</p>}

            <div className="product-container">
            <h1 className="center">FURNITURE</h1>
            <main className="wrapper">
                <aside className="categories">
                    <h2 className="center shop-by-room">SHOP BY ROOM</h2>
                    <div className="categories-flex">
                        <span id="living-room" onClick={() => setDisplayAndCategory('Living Room', 'living room')}>Living Room</span>
                        <span id="bedroom" onClick={() => setDisplayAndCategory('Bedroom', 'bedroom')}>Bedroom</span>
                        <span id="dining room" onClick={() => setDisplayAndCategory('Dining Room', 'dining room')}>Dining Room</span>
                        <span id="kids-room" onClick={() => setDisplayAndCategory('Kids Room', 'kids room')}>Kid's Room</span>
                        <span id="home office" onClick={() => setDisplayAndCategory('Home Office', 'home office')}>Home Office</span>
                    </div>
                </aside>

                <div className="products">
                    <h2 className="center" id="productH2">{categoryDisplay}</h2>
                    <div className="products-flex">
                        {products.map(product => {
                            const obj = product
                            return( 
                            <ProductCard 
                                key={obj['item_id']}
                                product_id={Number(obj['item_id'])}
                                productName={obj['productName']}
                                price={obj['price']}
                                category={obj['category']}
                                image_url={obj['image_url']}
                            />)
                        })}


                    </div>
                    <form type="post" action="./processUserOrder.php" >
                        <div className="shopping-cart" onDragOver={(e) => dragOver(e)} onDrop={e => drop(e)}>
                            <h2 className="center" id="shoppingCartH2">SHOPPING CART</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    {shoppingCart.map(item => {
                                        return (
                                            <tr key={item.item_id}>
                                                <td>{item.productName}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2">Total</td>
                                        <td id="total" name="total">{total}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        {errorMsg.length > 0 ? <p className="" style={{color: 'red', textAlign:'center'}}>{errorMsg}</p> : <></>}
                        <div className="checkOutBtnContainer"> 
                            <input className="checkOutBtn" type="button"  value="Checkout" onClick={checkOutOrder} />
                            <input type="button" className="clearShoppingCartBtn" value="Clear Shopping Cart" onClick={resetShoppingCart} />
                        </div>
                    </form>
                </div>
            </main>
        </div>
        </>
    )
}

export default Home;