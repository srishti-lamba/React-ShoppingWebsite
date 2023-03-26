import React, {useState} from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/aboutUs';
import ContactUs from './pages/contactUs';
import Services from './pages/services';
import Reviews from './pages/reviews';
import UserCheckoutPage from './pages/userCheckout';
import SignUp from './pages/signUp';
import Insert from './pages/dbInsert';

function App() {
  const [showLogin, setShowLogin] = useState(false);


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home toggleLogin={setShowLogin} showLogin={showLogin}/>} />
        <Route path='/aboutus' element={<AboutUs toggleLogin={setShowLogin} showLogin={showLogin}/>} />
        <Route path='/contactus' element={<ContactUs toggleLogin={setShowLogin} showLogin={showLogin}/>} />
        <Route path='/services' element={<Services toggleLogin={setShowLogin} showLogin={showLogin} />}/>
        <Route path='/reviews' element={<Reviews toggleLogin={setShowLogin} showLogin={showLogin}/>} />
        <Route path='/checkout' element={<UserCheckoutPage toggleLogin={setShowLogin} showLogin={showLogin}/>} />
        <Route path='/signup' element={<SignUp toggleLogin={setShowLogin} showLogin={showLogin}/>} />
        <Route path='/insert' element={<Insert toggleLogin={setShowLogin} showLogin={showLogin}/>} />
      </Routes>
    </div>
  );
}

export default App;
