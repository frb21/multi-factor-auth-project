const express = require('express');
const User = require('../models/UserSchema');
const router = express.Router();

// ADD NEW USER
router.route('/add').post( async (req, res) => {
  try{
    const { email, password } = req.body;
    const newUser = await User.create({email, password});

    res.status(200).json({ message: "User created successfully", user: newUser });  
  } catch(error){
      res.status(400).json({message: "Error creating user", error});
  }
});


module.exports = router;























