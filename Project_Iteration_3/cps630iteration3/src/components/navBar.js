import React, {useEffect, useState} from 'react';
import './navBar.css';
import { selectUser, setUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetUser } from '../features/userSlice';
import { resetOrderId } from '../features/orderIdSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = ({toggleLogin}) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [display, toggleDisplay] = useState("none");
    const [broswer, setBrowser] = useState(null)

    const detectBrowser = () => {
        let res = navigator.userAgent;
        let browsers = ["Edg", "Firefox", "Trident", "Chrome", "Safari"];	

        for (let i = 0; i < browsers.length; i++) {
            if (res.indexOf(browsers[i]) !== -1) {
                if (browsers[i] == "Trident" || browsers[i] == "MSIE" || browsers[i] == "IE") {
                    return "Internet Explorer"
                    break;
                } else if (browsers[i] == "Edg") {
                    return "Microsoft Edge";
                    break;
                } else if (browsers[i] == "Chrome") {
                    return "Google Chrome";
                    break;
                } else if (browsers[i] == "Firefox") {
                    return "Firefox";
                    break;
                } else if (browsers[i] == "Safari") {
                    return "Safari";
                    break;
                } else {
                    return "unknown";
                    break;
                }
            }
        }
    }

    useEffect(() => {
        let browser = detectBrowser();
        setBrowser(browser)
        //Set user
        let currUser = JSON.parse(localStorage.getItem("CURRENT_USER"))
        if (currUser) dispatch(setUser(currUser))
    }, [])

    const loginBtnOnClick = () => {
        if(user === null) {
            toggleLogin(true)
        } else {
            dispatch(resetUser())
            dispatch(resetOrderId())
            //Store user
            localStorage.removeItem("CURRENT_USER")
            navigate('/')
        }
    }

    const showDropdown = () => {
        toggleDisplay("block");
    };
    const hideDropdown = () => {
        toggleDisplay("none");
    };

    return(
        <>  
            
            <header>
            <div className="logo">
                <img src="https://t3.ftcdn.net/jpg/03/59/58/18/360_F_359581872_hMDiF4RkLXiJ7fTKq0VGvhdLdepLncMK.jpg"  
                style={{mixBlendMode:'multiply', margin: "-50px", height: "150px"}} />
            </div> 

            <nav className="nav navbar">
                <ul>
                    <div style={{fontWeight: '600'}}>Browser: {broswer}</div>
                    <Link to="/">
                        <li>HOME</li>
                    </Link>
                    <Link to='/aboutus'>
                        <li>ABOUT US</li>
                    </Link>
                    <Link to='/contactus'>
                        <li>CONTACT US</li>
                    </Link>
                    <Link to='/services'>
                        <li>SERVICES</li>
                    </Link>
                    <Link to='/reviews'>
                        <li>REVIEWS</li>
                    </Link>
                    {user !== null ? <li className="searchLbl" onClick={() => console.log('hello')}>SEARCH</li> : <></>}
                    {(user !== null && user.user.isAdmin === "1") ? 
                        <li className='dbMaintain' onMouseLeave={hideDropdown}>
                            <div className="dbMaintain-btn" onMouseEnter={showDropdown}>DB MAINTAIN</div>
                            <div className="dbMaintain-options" style={{display: display}}>
                                <Link to='/insert'>Insert</Link>
                                <Link to='/delete'>Delete</Link>
                                <Link to='/select'>Select</Link>
                                <Link to='/update'>Update</Link>
                            </div>
                        </li> 
                        : <></>
                    }
                </ul>
            </nav>

            <ul className="right">
                {user === null ? <li><button onClick={() => navigate('/signup')} className='sign-up'>Sign-Up</button></li> : <li>Hello, {user.user.userName}</li>}
                

                <li>
                    <button className='login' onClick={loginBtnOnClick} >{user === null ? "Login" : "Logout"}</button>
                </li>
            </ul>
            </header>

        </>
    )
}

export default NavBar;