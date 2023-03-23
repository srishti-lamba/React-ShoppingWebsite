import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import ProductCard from "../components/productCard";
import './home.css';

const Home = ({showLogin, toggleLogin}) => {
    const [productCategory, setProductCategory] = useState('living room')
    const [categoryDisplay, setCategoryDisplay] = useState('Living Room')
    const [products, setProducts] = useState([])
    const user = useSelector(selectUser);
    {user !== null && toggleLogin(false)}

    const setDisplayAndCategory = (display, category) => {
        setProductCategory(category)
        setCategoryDisplay(display)
    }

    useEffect(() => {
        const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/getProducts.php";
        axios.get(`${url}?category=${productCategory}`)
        .then(response => {
            setProducts(response.data)
        }).catch(err => console.log(err))
    }, [productCategory])
    
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
                            const obj = JSON.parse(product)
                            return( 
                            <ProductCard 
                                key={obj['item_id']}
                                productName={obj['productName']}
                                price={obj['price']}
                                category={obj['category']}
                                image_url={obj['image_url']}
                                draggable
                            />)
                        })}


                    </div>
                    <form type="post" action="./processUserOrder.php" >
                        <div className="shopping-cart" onDragOver="dragOver(event)" onDrop="drop(event)">
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
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2">Total</td>
                                        <td id="total" name="total">0.00</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="checkOutBtnContainer"> 
                            <input className="checkOutBtn" type="button" onClick="submitForm()" value="Checkout" />
                            <input type="button" className="clearShoppingCartBtn" value="Clear Shopping Cart" onClick="clearShoppingCart()" />
                        </div>
                    </form>
                </div>
            </main>
        </div>
        </>
    )
}

export default Home;