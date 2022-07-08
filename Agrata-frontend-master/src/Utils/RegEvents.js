import Cookies from "js-cookie"
class MyEvents {
    async getEvents() {
        const token = Cookies.get("agrata-token")
        if (token) {
            try {

                const res = await fetch("https://agrata-backend-test.herokuapp.com/myevents", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({token: token})
                })
                const data = await res.json()
                if (data.success) {

                    return data.data;
                }
            } catch (error) {
                return []
            }
        } else {

            return [];
        }
    }
}
export default new MyEvents()