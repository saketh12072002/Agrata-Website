class DataService {
    
    getEvents(){
        return new Promise ((resolve,reject)=>{
            fetch("https://agrata-backend-test.herokuapp.com/events", {
                method: "GET",
                }).then(res => res.json())
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    getSponsors(){
        return new Promise ((resolve,reject)=>{
            fetch("https://agrata-backend-test.herokuapp.com/sponsors", {
                method: "GET",
                }).then(res => res.json())
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    getGallery(){
        return new Promise ((resolve,reject)=>{
            fetch("https://agrata-backend-test.herokuapp.com/gallery", {
                method: "GET",
                }).then(res => res.json())
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}


export default new DataService();
