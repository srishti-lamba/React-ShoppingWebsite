import React from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const Insert = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    {user !== null && toggleLogin(false)}
    
    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}
            <div>Insert</div>
        </>
    )
}

export default Insert;