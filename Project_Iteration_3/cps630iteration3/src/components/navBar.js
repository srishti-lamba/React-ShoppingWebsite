import React from 'react';
import './navBar.css';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetUser } from '../features/userSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = ({toggleLogin}) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginBtnOnClick = () => {
        if(user === null) {
            toggleLogin(true)
        } else {
            dispatch(resetUser())
            navigate('/')
        }
    }

    return(
        <>  
            
            <header>
            <div className="logo">
                <img src="https://t3.ftcdn.net/jpg/03/59/58/18/360_F_359581872_hMDiF4RkLXiJ7fTKq0VGvhdLdepLncMK.jpg"  
                style={{mixBlendMode:'multiply', margin: "-50px", height: "150px"}} />
            </div> 

            <nav className="nav navbar">
                <ul>
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
                    {user !== null ? <li className="searchLbl" onClick={() => console.log('hello')}><i className="fa-solid fa-magnifying-glass"></i> SEARCH</li> : <></>}
                    {(user !== null && user.user.isAdmin === "1") ? <li className='dbMaintain'>DB MAINTAIN</li> : <></>}
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