//import dependencies

const sequelize = require('./config/database');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const randomize = require('randomatic');
const userRouter = require('./routes/userRoutes');
const app = express();

const PORT = 3001;

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
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: '',
                pass: 
            }
        })
    }
}











// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


























