import React from 'react'
import Navbar from '../Navbar/Navbar'
import LoadScreen from '../LoadingScreen/LoadingScreen'
import regEvents from '../../Utils/RegEvents'
import dataService from "../../Utils/dataService"
import { useState, useEffect } from 'react'

const Dashboard = () => {
    const [loadStatus, setLoadStatus] = useState(true)
    const [events, setEvents] = useState(null)
    const [registered, setRegistered] = useState(null);
    const [myEvents, setMyEvents] = useState(null);
    useEffect(() => {
        dataService.getEvents().then(data => {
            setEvents(data);
        })
        regEvents.getEvents().then((data) => {
            const mydata = data.map(event => event.eventName);
            setRegistered(mydata);
        })
    }, [])
    useEffect(() => {
        if(events && registered) {
            const data = events.filter(event => registered.includes(event.event));
            setMyEvents(data);
        }
    },[events, registered])
    useEffect(()=>{
        if(myEvents) {
            console.log(myEvents)
            setLoadStatus(false);
        }
    },[myEvents])
    return (
        <div>{loadStatus ? <LoadScreen /> :
            <div>
                <Navbar active="dash"></Navbar>
                <h1>Your Events</h1>
                <div className = "row">     
                    {
                        myEvents ? myEvents.map(event => <Event event={event} key={event.event}/>) : <h1>No events</h1>
                    }
                </div>           
            </div>
        }
        </div>
    );
}
const Event = ({ event }) => {
    return (<div className="col-md-5 col-sm-10 col-xs-12 event-wrapper">
            <img className="event-poster" src={event.poster} alt={event.event} />
            <h1 className="event-title">{event.event}</h1>
            <p className="description">{event.description}</p>
            <a className="read-more" href={event.more_link}> Read more</a>
        </div>
    )
}
export default Dashboard;