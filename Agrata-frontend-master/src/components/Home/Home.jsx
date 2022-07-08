import React from 'react'
import Navbar from '../Navbar/Navbar'
import "./Home.css"
import logo from "../../images/Home-logo.png";

const Home = () => {
    return (
        <div>
            <Navbar active="home"></Navbar>
            
            <div className='side-text left'>SOME TEXT</div>
            <div className='logo-container'><img id="home-logo" src={logo} alt="IITM Sports" /></div>
            <div className='side-text right'>SOME TEXT</div>
            <div className='contact-us'>CONTACT US</div>
            <div className='about-us'>ABOUT US</div>
        </div>
    )
}

export default Home;