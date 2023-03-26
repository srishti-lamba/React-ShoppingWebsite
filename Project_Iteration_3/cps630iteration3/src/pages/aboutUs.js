import React from "react";
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import './aboutUs.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
const center = {
    lat: 43.690060,
    lng: -79.294570
};

const AboutUs = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    {user !== null && toggleLogin(false)}
    
    return (
        <>
            <NavBar toggleLogin={toggleLogin}/>
            {showLogin ? <Login setShowLogin={toggleLogin}/> : <></>}
            {showLogin ? <div onClick={() => toggleLogin(false)} className='overlay'></div> : <></>}
            <div className="main-image">
                <article className="main-title">
                    <h1>MEET THE TEAM</h1>
                </article>
                <main className="flex">
                    <div className="card">
                        <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" className="img"></img>
                        <h2 className="center">Raymond Floro</h2>
                        <p className="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
                    </div>
                    <div className="card">
                        <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" className="img"></img>
                        <h2 className="center">Roberto Mariani</h2>
                        <p className="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
                    </div>
                    <div className="card">
                        <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" className="img"></img>
                        <h2 className="center">Srishti Lamba</h2>
                        <p className="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
                    </div>
                    <div className="card">
                        <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" className="img"></img>
                        <h2 className="center">Vanessa Landayan</h2>
                        <p className="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
                    </div>
                </main>
            </div>
            <article className="main-title">
                <h1>VISIT A LOCATION</h1>
            </article>
            <div id="map" style={{width:'100%', height: "500px"}}>
                <LoadScript googleMapsApiKey="AIzaSyDqs21kU6-FIEIWa7bnDbepY2k0G6e7uvg">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                    >
                        <Marker position={{ lat: 43.690, lng:-79.294 }} />
                        <Marker position={{ lat: 43.714, lng: -79.512  }} />
                        <Marker position={{ lat: 43.653, lng: -79.391 }} />
                        <Marker position={{ lat: 43.623, lng: -79.567 }} />
                        <Marker position={{ lat: 43.632, lng: -79.676 }} />
                        <></>
                    </GoogleMap>
                </LoadScript>
            </div>

            </>
    )
}

export default AboutUs;