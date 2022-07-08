import "./Spons.css"
import { useState,useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import LoadScreen from "../LoadingScreen/LoadingScreen.jsx";
import dataService from "../../Utils/dataService"
import sponsback from "../../images/sponsback.png"
import rightdesign from "../../images/Vector 2.png"
const Spons = () => {
    const [loadStatus , setLoadStatus] = useState(true);
    const [spons, setSpons] = useState([]);
    useEffect(()=>{
        dataService.getSponsors().then(data => {
            setSpons(data);
            setLoadStatus(false);
        })
    },[])

    return (
        <div>{loadStatus ? <LoadScreen/> : 
            <div className="sponsbg" style={{ backgroundImage: `url(${sponsback})`}}>
                <Navbar active="spons"></Navbar>
                <div className="oursponsors" style={{ backgroundImage: `url(${rightdesign})` }}><h3>OUR SPONSORS</h3></div>
                
                <div className="row mx-1 justify-content-around">
                    {
                        spons.map(spon => {
                            return (
                                <Spon key={spon.title} spon={spon} />
                            )
                        })
                    }
                </div>
            </div>
            }
            
        </div>
    )
}

const Spon = ({ spon }) => {
    return (
        <div className="col-10 col-sm-5 col-md-2 col-lg-2 spon-wrapper">
            <img className="spon-img" src={spon.img} alt={spon.title}/>
        </div>
    )
}

export default Spons
