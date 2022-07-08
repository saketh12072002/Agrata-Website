import "./Login.css";
import logo from '../../images/logo.png';
import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import Cookies  from "js-cookie";
import auth from "../../Utils/auth.js";
import Navbar from '../Navbar/Navbar.jsx';
const Login = () => {
    const [errorMessage,setErrorMessage] = useState();
    let history = useHistory();
    const login = ()=>{
        let email = document.getElementById("log-email").value;
        let password = document.getElementById("log-pass").value;
        const data = {
            username:email, 
            password:password
        };
        fetch("https://agrata-backend-test.herokuapp.com/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            }).then(response=>response.json()).then(response=>{
                if(response.login){
                    setErrorMessage("");
                    Cookies.set("agrata-token",response.token);
                    auth.login(()=>{history.push("/dashboard")});
                }else{
                    setErrorMessage("Invalid credentials");
                }
            }).catch(error=>{});
    }
    const register = ()=>{
        history.push('/register');
    }
    return (<div>
        <Navbar active="login"></Navbar>
        <form id="form">
            <h3 id="head">Login for Agrata </h3>
            {/* <div><img className="rounded img-fluid" id="image" src={logo} alt="Agrata Logo" /></div> */}
            <div className="form-group padd-input"><input type="email" className="form-control bg-login" id="log-email" placeholder="Email" /></div>
            <div className="form-group padd-input"><input type="password" className="form-control bg-login" id="log-pass" placeholder="Password" /></div>
            <span id="pass-error">{errorMessage}</span>
            <div className = "padd-button">
            <button className="btn btn-light " id="buttonas" type="button" onClick={login}>Login</button>
            <button onClick={register}>Didn't register yet?</button></div>
        </form>
        
    </div>)
}

export default Login;