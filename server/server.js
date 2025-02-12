//import dependencies

const sequelize = require('./config/database');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const randomize = require('randomatic');
const userRouter = require('./routes/userRoutes');
const app = express();

const PORT = 3001;

const User = require('./models/UserSchema');

//middleware
app.use(cors());
app.use(express.json());

//verify mysql connection
(async () => {
    try{
        await sequelize.authenticate();
        console.log('Database connected successfully');
    } catch(error){
        console.error('Database connection error:', error);
    }
})();


app.use('/users', userRouter);

// send otp to user email
async function sendOtp(email, otp){
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fsbetonio@up.edu.ph',
                pass: 'vwsb sdyv tfsq ymuq',
            },
        });

        const mailOptions = {
            from: 'fsbetonio@up.edu.ph',
            to: email,
            subject: 'OTP Verification',
            //text: `Your OTP is: {otp}`,
            html: `<p>Your OTP code is <b>${otp}</b></p>`
        };

        const info =
            await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + info.response);
    }catch(error){
        console.error('Error sending email:', error);
    }
}
// login
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const user = await User.findOne({ where: {email, password} });
        console.log(user);
        if(!user){
            return res.status(404).json('User not found');
        }

        const generatedOtp = randomize('0', 6);
        user.otp = generatedOtp;
        await user.save();
        sendOtp(email, generatedOtp);

        return res.status(200).json('Successfully sent OTP to user email');
    } catch(error){
        console.error('Error during login:', error);
        return res.status(500).json('An error occured during login');
    };
});

// verify otp
app.post('/auth/verify-login', async (req, res) => {
    try{
        const { email, otp } = req.body;
        const user = await User.findOne({where: {otp}});

        if(!user){
            return res.status(404).json({success: false, message: "Invalid OTP."});
        }
         
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fsbetonio@up.edu.ph',
                pass: 'vwsb sdyv tfsq ymuq',
            },
        });

        const mailOptions = {
            from: 'fsbetonio@up.edu.ph',
            to: email,
            subject: 'Successful Verification',
            html: '<p>You successfully verified your account.</p>'
        };
        const info = 
            await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        user.otp = '';
        await user.save();

        return res.status(200).json({success: true, message: "Successfully authenticated user."});
    }
    catch(error){
        console.error('Error during login verification', error);
        return res.status(500).json({success: false, message: 'An error occurred during Verification'});
    }
});


// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


























