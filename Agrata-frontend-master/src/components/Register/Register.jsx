import "./Register.css";
import logo from '../../images/logo.png';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import Cookies  from "js-cookie";
import auth from "../../Utils/auth.js";
import Navbar from "../Navbar/Navbar";
const Register = () => {
    const [errorMessage,setErrorMessage] = useState();
    let history = useHistory();
    const register = async (e)=>{
        e.preventDefault();
        let email = document.getElementById("reg-email").value;
        let password = document.getElementById("reg-pass").value;
        let confirmPassword = document.getElementById("reg-conf-pass").value;
        let name = document.getElementById("reg-name").value;
        let phone = document.getElementById("reg-contact").value;
        let insti = document.getElementById("reg-insti").value;
        let roll = document.getElementById("reg-roll").value;
        if(password === confirmPassword){
            let data = {
                username: email,
                password: password,
                name: name,
                phone: phone,
                institution: insti,
                roll: roll
            };
            fetch("https://agrata-backend-test.herokuapp.com/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            }).then(response=>response.json()).then(response=>{
                if(response.registration){
                    setErrorMessage("");
                    Cookies.set("agrata-token",response.token);
                    auth.login(()=>{history.push("/dashboard")});
                }else{
                    setErrorMessage("This email is already registered");
                }
            })
        }else{
            setErrorMessage("Password and confirm password does not match");
        }
    }
    const login = ()=>{
        history.push('/login');
    }
    return (<div>
        <Navbar active="login"></Navbar>
        <form id="form" onSubmit={async(event)=>{await register(event)}}>
            <h3 id="head">Register for Agrata</h3>
            {/* <div><img className="rounded img-fluid" id="image" src={logo} alt="Agrata Logo" /></div> */}
            <div className="form-group padd-input"><input required type="text" className="form-control bg-register" id="reg-name" placeholder="Full Name" /></div>
            <div className="form-group padd-input"><input required type="text" className="form-control bg-register" id="reg-insti" placeholder="Institution Name" /></div>
            <div className="form-group padd-input"><input required type="text" className="form-control bg-register" id="reg-roll" placeholder="Roll Number" /></div>
            <div className="form-group padd-input"><input required type="text" className="form-control bg-register" id="reg-contact" placeholder="Contact Number" /></div>
            <div className="form-group padd-input"><input required type="email" className="form-control bg-register" id="reg-email" placeholder="Email" /></div>
            <span id="pass-error">{errorMessage}</span>
            <div className="form-group padd-input"><input required type="password" className="form-control bg-register" id="reg-pass" placeholder="Password" /></div>
            <div className="form-group padd-input"><input required type="password" className="form-control bg-register" id="reg-conf-pass" placeholder="Confirm password" /></div>
            <div className = "padd-button">
            <button className="btn btn-light" id="buttonas" type="submit">Register</button>
            <button onClick={login}>Already have an account?</button> </div>
        </form>
        
    </div>)
}

export default Register;