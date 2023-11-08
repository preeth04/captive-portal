function sendOTP() {
    const mobileNumber = document.getElementById('mobileNumber').value;
    console.log({mobileNumber})

    fetch('/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNumber: mobileNumber })
    })
    .then(response => response.status === 200 && response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
    })
    .catch(error => {
        console.error(error);
    });
}

// your function
var validate = function(event) {
    event.preventDefault();
    const mobileNumber = document.getElementById('mobileNumber').value;
    const otp = document.getElementById("otp").value;
    fetch('/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mobileNumber: mobileNumber, userOTP: Number(otp) })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
    })
    .catch(error => {
        console.error(error);
    });
    
};

var form = document.getElementById("otpForm");

// attach event listener
form.addEventListener("submit", validate, true);