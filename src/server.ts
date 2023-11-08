import path from "path"
import express from "express";
import bodyParser from "body-parser";
const __dirname = path.resolve();
const app = express();
const port = 3000;

app.get('/', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
// const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
// const client = new twilio(accountSid, authToken);

let otpMap = {};

app.post('/send-otp', (req, res) => {
    const { mobileNumber } = req.body;
    const otp = generateOTP();
    otpMap[mobileNumber] = otp;

    console.log(otpMap)
    // client.messages
    //     .create({
    //         body: `Your OTP is: ${otp}`,
    //         from: 'YOUR_TWILIO_PHONE_NUMBER',
    //         to: mobileNumber
    //     })
    //     .then(message => {
    //         console.log('OTP sent:', message.sid);
    //         res.status(200).json({ message: 'OTP sent successfully.' });
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         res.status(500).json({ message: 'Failed to send OTP.' });
    //     });
});

app.post('/verify-otp', (req, res) => {
    const { mobileNumber, userOTP } = req.body;
    const serverOTP = otpMap[mobileNumber];
    console.log(otpMap[mobileNumber])


    if (serverOTP && serverOTP === userOTP) {
        res.status(200).json({ message: 'OTP verified successfully.' });
    } else {
        res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
});

function generateOTP() {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000);
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
