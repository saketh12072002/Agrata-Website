import "./Events.css"
import { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import LoadScreen from "../LoadingScreen/LoadingScreen.jsx";
import dataService from "../../Utils/dataService"
import auth from "../../Utils/auth";
import displayRazorpay from "../../Utils/displayRazorpay";
import regEvents from '../../Utils/RegEvents';

const Events = () => {
    const [loadStatus, setLoadStatus] = useState(true);
    const [events, setEvents] = useState(null)
    const [openModal, setOpenModal] = useState(null);
    const [registered, setRegistered] = useState(null);
    const [temp, setTemp] = useState(0);
    useEffect(() => {
        dataService.getEvents().then(data => {
            setEvents(data);
        })
        regEvents.getEvents().then((data) => {
            const myEvents = data.map(event => event.eventName);
            setRegistered(myEvents);
        })
    }, [temp])

    useEffect(() => {
        if(events && registered) {
            setLoadStatus(false);
        }
    },[events, registered])
    return (
        <div>{loadStatus ? <LoadScreen /> :
            <div>
                <Navbar active="events"></Navbar>
                <div className="row">
                    {
                        events.map(event => {
                            return (
                                <Event key={event.event} event={event} setOpenModal={setOpenModal} registered={registered} />
                            )
                        })
                    }
                </div>
                {openModal && <Modal event={openModal} reloader={()=>setTemp(1-temp)} setOpenModal={setOpenModal}></Modal>}
            </div>
        }

        </div>
    )
}

const Event = ({ event, setOpenModal, registered }) => {
    const openForm = () => {
        setOpenModal(event);
    }
    return (
        <div className="col-md-5 col-sm-10 col-xs-12 event-wrapper">
            <img className="event-poster" src={event.poster} alt={event.event} />
            <h1 className="event-title">{event.event}</h1>
            {auth.isAuthenticated() && !registered.includes(event.event) && <button className="btn btn-primary" onClick={openForm}>Register</button>}
            {auth.isAuthenticated() && registered.includes(event.event) && <button className="btn btn-secondary" disabled >Registered</button>}
        </div>
    )
}
const Modal = ({ event, setOpenModal, reloader }) => {
    const dummy = new Array(parseInt(event.members)).fill(0);
    const submitHandler = async (e) => {
        e.preventDefault();
        const people = [];
        for (let i = 0; i < dummy.length; i++) {
            const person = {
                email:e.target[`P${i}E`].value,
                name:e.target[`P${i}N`].value,
            }
            people.push(person);
        }
        await displayRazorpay(people, event, setOpenModal,reloader);
    }
    return (
        <div className="modal-bg">
            <div className="modal-fg">
                <div className="cross" onClick={() => { setOpenModal(null) }}>+</div>
                <h2>Fill Up Team Details</h2>
                <form onSubmit={submitHandler}>
                    {dummy.map((member, index) => {
                        return (
                            <div className="playerdet" key={index}>
                                <input type="email" required placeholder={"Player " + (index + 1) + " email"} name={"P"+index+"E"}></input>
                             <input  type="text" required placeholder={"Player " + (index + 1) + " name"} name={"P"+index+"N"}></input>
                            </div>
                        )
                    })}
                    <div className="regbutton"><button type="submit" className="btn btn-danger">Register Now</button></div>
                </form>
            </div>
        </div>
    )
}
export default Events
