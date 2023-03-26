import React, { useState } from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import './signUp.css';

const SignUp = ({toggleLogin, showLogin}) => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [signUpRole, setSignUpRole] = useState('customer');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");

    

    const showAdminCodeInput = () => {
        return (
                <div>
                    <label htmlFor="adminCode">Enter Admin Access Code:</label>
                    <input type="password" id="adminCode" name="adminCode" placeholder="1234"/>
                </div>
        )
    }

    const submitSignUpForm = () => {
        console.log('hello')
    }


    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}
            <main className="reg-container">
                <h1 className="registration-h1">Registration</h1>
                <form className="register-form" action="../models/validateRegistration.php" method="post">
                    
                    <label htmlFor="name">Enter Your Full Name:</label>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/>

                    <label htmlFor="email">Enter Email:</label>
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>

                    <label htmlFor="reg-username">Enter Username:</label>
                    <input type="text" name="reg-username" value={userName} onChange={e => setUserName(e.target.value)}/>

                    <label htmlFor="telephone">Enter Telephone:</label>
                    <input type="text" name="telephone" value={phoneNum} onChange={e => setPhoneNum(e.target.value)}/>

                    <label htmlFor="reg-password">Enter Password:</label>
                    <input type="password" name="reg-password" onChange={e => setPass1(e.target.value)}/>

                    <label htmlFor="reg-password2">Re-Enter Password:</label>
                    <input type="password" name="reg-password2" onChange={e => setPass2(e.target.value)}/>

                    <label htmlFor="address">Enter Home Address:</label>
                    <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)}/>
                    
                    <label htmlFor="postal-code">Postal Code:</label>
                    <input type="text" name="postal-code" value={postalCode} onChange={e => setPostalCode(e.target.value)}/>

                    
                    <section className="userTypeSection">
                        <p>I am registering as a:</p>
                        <input type="radio" id="customer" name="userType" checked onChange={() => setSignUpRole('customer')}/>
                        <label htmlFor="customer">Customer</label>
                        <input type="radio" id="admin" name="userType" onChange={() => setSignUpRole('admin')}/>
                        <label htmlFor="admin">Admin</label>
                        <br/>
                        {signUpRole === 'admin' && showAdminCodeInput()}
                       
                    </section>
                    
                    <button type="button" className="reg-button" onClick={submitSignUpForm}>Submit</button>
                </form>
            </main>
        </>
    )
}

export default SignUp;