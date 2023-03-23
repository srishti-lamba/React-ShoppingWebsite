import React from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { Link } from "react-router-dom";
import './services.css';
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const Services = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    {user !== null && toggleLogin(false)}
    
    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}
            <div className="services-main-image">
                <article className="main-title">
                    <h1>TYPES OF SERVICES</h1>
                </article>
                <main className="flex">
                    <div className="services-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/3081/3081415.png" />
                        <h2 className="center">Secure<br/>Online Shopping</h2>
                        <p className="description center">Shop from the comfort of your own home! We provide convenient online shopping 
                            services using our customer-friendly service web application. Customers can register for an account, sign-in, 
                            select items, and drag them to their shopping cart. Check out our new collection from the furniture department!</p>
                        <p className="redirect center"><Link to='/'>Shop Now</Link></p>
                    </div>
                    <div className="services-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/2203/2203145.png"/>
                        <h2 className="center">Fast and<br/>Convenient Delivery</h2>
                        <p className="description center">We offer eco-friendly and fast delivery services within 1-3 days. Customers can 
                            select a branch location, date and time for delivery, and a destination for delivery. All you need to 
                            do is review and confirm your purchase. Before you know it, your order will be ready on the front of your doorstep.</p>
                        <p className="redirect center"><Link to='/'>Go to Cart</Link></p>
                        {/* need to update link one processorder page is made */}
                    </div>
                    <div className="services-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/9078/9078956.png"/>
                        <h2 className="center">Professional Assembly</h2>
                        <p className="description center">Looking for a professional to assemble your new furniture? We offer professional 
                            services for purchases bought from our furniture department. After purchasing your item, feel free to contact 
                            one of our customer service representatives to book an appointment.</p>
                        <p className="redirect center"><Link to="/aboutus">Meet Our Team</Link></p>
                    </div>
                    <div className="services-card">
                        <img src="https://cdn-icons-png.flaticon.com/512/8776/8776368.png"/>
                        <h2 className="center">Returns &<br/>Exchanges</h2>
                        <p className="description center">Not loving your purchase? We offer returns and exchanges for most purchases within 
                            30-days. If you purchase the extended warranty, you have 90-days. Returns and exchanges can be mailed or dropped 
                            off at one of our convenient warehouse locations in your neighborhood.
                        </p>
                        <p className="redirect center"><Link to="/aboutus">Contact Us</Link></p>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Services;