import React, {useState} from 'react';
import NavBar from "../components/navBar";
import Login from "../components/login";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import './aboutUs.css';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';

const AboutUs = ({showLogin, toggleLogin}) => {
    const user = useSelector(selectUser);
    {user !== null && toggleLogin(false)}

    const [info1, setInfo1] = useState(null);
    const [info2, setInfo2] = useState(null);
    const [info3, setInfo3] = useState(null);
    const [info4, setInfo4] = useState(null);
    const [info5, setInfo5] = useState(null);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDqs21kU6-FIEIWa7bnDbepY2k0G6e7uvg",
        libraries: ['places'],
    })

    const containerStyle = {
        width: '100%',
        height: '100%'
    };
      
    const center = {
        lat: 43.690060,
        lng: -79.294570
    };
    if(!isLoaded){
        return (
            <></>
        )
    }
    
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
                    <div className="aboutUsCard">
                        <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" className="img"></img>
                        <h2 className="center">Raymond Floro</h2>
                        <p className="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
                    </div>
                    <div className="aboutUsCard">
                        <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" className="img"></img>
                        <h2 className="center">Roberto Mariani</h2>
                        <p className="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
                    </div>
                    <div className="aboutUsCard">
                        <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" className="img"></img>
                        <h2 className="center">Srishti Lamba</h2>
                        <p className="bio center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cupiditate quisquam dicta nisi vero sunt, vitae id commodi asperiores dolore nihil cumque animi. Quam, similique necessitatibus? Excepturi aperiam sequi architecto?</p>
                    </div>
                    <div className="aboutUsCard">
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
                <GoogleMap center={center} mapContainerStyle={containerStyle} zoom={10}>
                    {}
                    <Marker position={{ lat: 43.690, lng:-79.294 }} onClick = {() => {setInfo1(true)}}/>
                        {info1 ? (<InfoWindow position={{lat: 43.727, lng:-79.294}} onCloseClick ={() => {setInfo1(null)}}>
                            <div><h4>2872 Danforth Avenue</h4><p>Toronto, ON, M4C 1M1, Canada</p></div>
                        </InfoWindow>) :null}

                    <Marker position={{ lat: 43.714, lng: -79.512 }} onClick = {() => {setInfo2(true)}}/>
                        {info2 ? (<InfoWindow position={{lat: 43.751, lng:-79.512}} onCloseClick ={() => {setInfo2(null)}}>
                            <div><h4>10 Suntract Road</h4><p>Toronto, ON, M9N 3N9</p></div>
                        </InfoWindow>) :null}
                            
                    <Marker position={{ lat: 43.653, lng: -79.391 }} onClick = {() => {setInfo3(true)}}/>
                        {info3 ? (<InfoWindow position={{lat: 43.69, lng:-79.391}} onCloseClick ={() => {setInfo3(null)}}>
                            <div><h4>20 McLevin Avenue</h4><p>Scarborough, ON, M1B 2V5</p></div>
                        </InfoWindow>) :null}

                    <Marker position={{ lat: 43.623, lng: -79.567 }} onClick = {() => {setInfo4(true)}}/>
                        {info4 ? (<InfoWindow position={{lat: 43.66, lng:-79.567}} onCloseClick ={() => {setInfo4(null)}}>
                            <div><h4>2070 Dundas Street East</h4><p>Mississauga, ON, L4X 1L9</p></div>
                        </InfoWindow>) :null}

                    <Marker position={{ lat: 43.632, lng: -79.676 }} onClick = {() => {setInfo5(true)}}/>
                        {info5 ? (<InfoWindow position={{lat: 43.669, lng:-79.676}} onCloseClick ={() => {setInfo5(null)}}>
                            <div><h4>201 Britannia Road East</h4><p>Mississauga, ON, L4Z 3X8</p></div>
                        </InfoWindow>) :null}     
                    <></>
                </GoogleMap>
            </div>
            </>
    )
}

export default AboutUs;