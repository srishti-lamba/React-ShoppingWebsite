import React from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import './contactUs.css';
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const ContactUs = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    {user !== null && toggleLogin(false)}
    
    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}

            <div className="contactus-main-image">
            <article className="main-title">
                <h1>CONTACT US</h1>
            </article>
            <main className="flex">
                <div className="contactus-card">
                    <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/>
                    <h2 className="center">Raymond Floro</h2>
                    <p className="contact center">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Contact ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯<br/><br/>
                    <p className="email">raymond@smartcustomerservices.ca</p><br/>
                    1-800-555-1111
                    </p>
                </div>
                <div className="contactus-card">
                    <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" />
                    <h2 className="center">Roberto Mariani</h2>
                    <p className="contact center">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Contact ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯<br/><br/>
                    <p className="email">roberto@smartcustomerservices.ca</p><br/>
                    1-800-555-2222</p>
                </div>
                <div className="contactus-card">
                    <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/>
                    <h2 className="center">Srishti Lamba</h2>
                    <p className="contact center">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Contact ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯<br/><br/>
                    <p className="email">srishti@smartcustomerservices.ca</p><br/>
                    1-800-555-3333</p>
                </div>
                <div className="contactus-card">
                    <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"/>
                    <h2 className="center">Vanessa Landayan</h2>
                    <p className="contact center">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Contact ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯<br/><br/>
                    <p className="email">vanessa@smartcustomerservices.ca</p><br/>
                    1-800-555-4444</p>
                </div>
            </main>
            </div>
        </>
    )
}

export default ContactUs;