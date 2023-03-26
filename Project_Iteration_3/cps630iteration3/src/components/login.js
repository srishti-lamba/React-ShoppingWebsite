import React, {useState} from 'react';
import './login.css';
import axios from 'axios';
import { setUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginUser = (username, password) => {
        if(username.length === 0 && password.length === 0) {
            setErrorMsg("Username and password cannot be empty")
            return;
        } else if (username.length === 0) {
            setErrorMsg("username cannot be empty");
            return;
        } else if (password.length === 0) {
            setErrorMsg("password cannot be empty");
            return;
        } else {
            const url = "http://localhost/CPS630-Project-Iteration3-PHPScripts/login.php";

            let fdata = new FormData();
            fdata.append('username', username);
            fdata.append('password', password);

            axios.post(url, fdata)
            .then(response => {
                let data = response.data;
                let user = {
                    id: data.user_id,
                    userName: data.userName,
                    isAdmin: data.isAdmin
                }
                dispatch(setUser(user));
                navigate('/')
            })
            .catch(err => setErrorMsg("Wrong Username or Password"))
        }
    }
    return (
        <>
            <div className="loginWindow">
                <form className="loginForm" method="POST">
                    <h1>Login</h1>
                    {errorMsg !== "" ? <p className='errorMsg'>{errorMsg}</p> : <></>}
                    <input type="text" name="username" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
                    <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="submit" type="button" name="login" value="Login" onClick={() => loginUser(username, password)}>Login</button>
                </form>
            </div> 

        </>
    )
}

export default Login;