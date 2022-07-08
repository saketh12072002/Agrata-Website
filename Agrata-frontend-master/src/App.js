import Login from './components/Login/Login'
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Events from './components/Events/Events'
import Spons from './components/Spons/Spons'
import Home from "./components/Home/Home";
import './App.css';
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./Utils/protectedRoute";
import auth from './Utils/auth';
import { useEffect, useState } from 'react';
import LoadScreen from './components/LoadingScreen/LoadingScreen';
function App() {
  const [authState, setAuthState] = useState(auth.isAuthenticated());
  useEffect(() => {
    const interval = setInterval(() => {
      setAuthState(auth.isAuthenticated())
      if (auth.isAuthenticated() !== undefined) clearInterval(interval)
    }, 1000);
  }, []);
  return (
    <div>
      {authState === undefined ?
        <LoadScreen></LoadScreen> :
        <div>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" exact component={Register}></Route>
          <Route path="/events" exact component={Events}></Route>
          <Route path="/sponsors" exact component={Spons}></Route>
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        </div>
      }
    </div>
  );
}

export default App;
