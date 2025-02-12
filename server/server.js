//import dependencies

const sequelize = require('./config/database');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const randomize = require('randomatic');
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



// REST APIs

// function to send otp to user email


// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


























