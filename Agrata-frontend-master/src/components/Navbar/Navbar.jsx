import "./Navbar.css"
import { useHistory } from "react-router-dom";
import auth from "../../Utils/auth";
import logo from "../../images/logo-2.png";

const Navbar = ({active}) => {
    let history = useHistory();
    const authState = auth.isAuthenticated();
    const goToLogin =()=>{
        history.push("/login");
    }
    const goToEvents =()=>{
        history.push("/events");
    }
    const goToHome =()=>{
        history.push("/");
    }
    const goToSpons=()=>{
        history.push("/sponsors");
    }
    const goToDashboard =()=>{
        history.push("/dashboard");
    }
    const Logout = () => {
        auth.logout(()=>{
            history.push("/login")
        });
    }
    return (
    <nav className="navbar navbar-dark navbar-expand-md" id="app-navbar">
        <div className="container-fluid">
            <i className=" navbar-brand icon ion-ios-infinite" id="brand-logo"><div className="logo-bg"><img className = "iitm-logo" src = {logo} alt = "ima"/></div></i>
            <button data-toggle="collapse" data-target="#navcol-1" className="navbar-toggler"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><button className={`nav-link ${active==='home'?"active":" "}`} onClick={goToHome} id="home-button">Home</button></li>
                    <li className="nav-item"><button className={`nav-link ${active==='events'?"active":" "}`} onClick={goToEvents} id="events-button">Events</button></li>
                    <li className="nav-item"><button className={`nav-link ${active==='spons'?"active":" "}`} onClick={goToSpons} id="spons-button">Sponsors</button></li>
                    <li className="nav-item"><button className={`nav-link ${active==='dash'?"active":" "}`} onClick={goToDashboard} id="dash-button">Dashboard</button></li>
                </ul>

                <ul className = "navbar-nav ml-auto">    
                    {authState?
                        <li className="nav-item">
                            <button className="nav-link" onClick={Logout} id="login-button">Logout</button>
                        </li>:<li className="nav-item">
                            <button className={`nav-link ${active==='login'?"active":" "}`} onClick={goToLogin} id="login-button">Login | Register</button>
                        </li>
                    }
                </ul>
            </div>
        </div>
    </nav>);
}

export default Navbar;
