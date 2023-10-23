import React, { useState } from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import axios from "axios";
import './signUp.css';

const SignUp = ({toggleLogin, showLogin}) => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    const [signUpRole, setSignUpRole] = useState('customer');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [adminCode, setAdminCode] = useState("");

    const onFormSubmmission = () => {
        const url = "http://localhost/phpScripts/validateRegistration.php";
        let fdata = new FormData();
        fdata.append('name', name)
        fdata.append('email', email)
        fdata.append('reg-username', userName)
        fdata.append('telephone', phoneNum)
        fdata.append('reg-password', pass1)
        fdata.append('reg-password2', pass2)
        fdata.append('address', address)
        fdata.append('postal-code', postalCode)
        fdata.append('adminCode', adminCode)

        axios.post(url, fdata)
        .then((res) => {
            //if user successfully registers then redirect to homepage
            navigate("/")
        })
        .catch((err) => {
            setErrorMsg(err.response.statusText)
        })
    }

    
    const showAdminCodeInput = () => {
        if(signUpRole === 'admin') {
            return (
                <div>
                    <label htmlFor="adminCode">Enter Admin Access Code:</label>
                    <input type="password" name="adminCode" placeholder="1234" value={adminCode} onChange={(e) => setAdminCode(e.target.value)}/>
                </div>
            )
        } else {
            return <></>
        }
        
    }

    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}

            <h3 className="advertisement">SIGN UP TODAY AND GET 10% OFF YOUR FIRST ORDER</h3>

            <main className="reg-container">
                {errorMsg.length > 0  && <p style={{color:'red', textAlign: 'center'}}>{errorMsg}</p> }
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
                        <input type="radio" id="customer" name="userType" checked={signUpRole === 'customer'} onChange={() => setSignUpRole('customer')}/>
                        <label htmlFor="customer">Customer</label>
                        <input type="radio" id="admin" name="userType" checked={signUpRole === 'admin'} onChange={() => setSignUpRole('admin')}/>
                        <label htmlFor="admin">Admin</label>
                        <br/>
                        {(signUpRole === 'admin') ? showAdminCodeInput() : <></>}
                       
                    </section>
                    
                    <button type="button" className="reg-button" onClick={onFormSubmmission}>Submit</button>
                </form>
            </main>
        </>
    )
}

export default SignUp;