import loadScript from "./loadscript";
async function displayRazorpay(people, event, setOpenModal, reload) {
    const amount = event.amount;
    const __DEV__ = document.domain === 'localhost' || document.domain === '127.0.0.1';

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }
    const bodyData = {
        "amount": parseInt(amount),
    }
    var data = await fetch('https://agrata-backend-test.herokuapp.com/razorpay', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    data = await data.json();
    const options = {
        key: __DEV__ ? 'rzp_test_2KjLf4j3ubJnlh' : 'rzp_test_2KjLf4j3ubJnlh',//replace with prod key,
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        name: 'Register',
        description: 'You rich give money!',
        image: '../images/logo.png',
        handler: async function (response) {
            const emails = people.map(person => person.email);
            const names = people.map(person => person.name);
            const eventName = event.event;
            setOpenModal(false)
            const bodyData = JSON.stringify({
                "eventName": eventName,
                "playerNames": names,
                "playerEmails": emails
            })
            try{
                await fetch('https://agrata-backend-test.herokuapp.com/eventreg', {
                    method: 'POST',
                    body: bodyData,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                reload()
            } catch(err){
                console.log(err)
            }
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}

export default displayRazorpay;