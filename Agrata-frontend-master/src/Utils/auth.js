import Cookies from "js-cookie"

class Auth {
    constructor() {
        if (!Cookies.get("agrata-token")) this.authenticated = false;
        else {
            const data = {
                "token": Cookies.get("agrata-token")
            }
            fetch("https://agrata-backend-test.herokuapp.com/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then(response=>response.json()).then(response=>{
                this.authenticated = response.auth;
            }).catch(error=>{
                console.log(error);
                this.authenticated = false;
            })
        }
    }

    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        Cookies.remove('agrata-token');
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();
