//3. auth route
const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER
router.post("/register", async (req, res) => {

    if (req == null) {
        return res.status(400).json('There was a problem...Please refresh page.');
    } else if (req.body.username === "") {
        return res.status(400).json('Please enter a username.');
    } else if (req.body.email === "") {
        return res.status(400).json('Please enter a valid email.');
    } else if (req.body.password === "") {
        return res.status(400).json('Please enter a password.');
    } else {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        });
        
        try {
            const savedUser =  await newUser.save();
            res.status(201).json(savedUser);
        } catch(err) {
            res.status(500).json(err);
        }
    }
});

//LOGIN
router.post("/login", async (req, res) => {
  
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json("Invalid username!");
        }
        
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_SEC
        );
        const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        const typedPassword = req.body.password;
        
        if (typedPassword !== userPassword) {
            return res.status(401).json("Password is incorrect!");
        }
        
        const accessToken = jwt.sign({
            id:user._id, isAdmin: user.isAdmin,
        }, 
            process.env.JWT_SEC,
            {expiresIn: "3d"}
        );
        
        const {password, ...others} = user._doc;
        res.status(200).json({...others, accessToken});

    } catch(err){
        res.status(500).json("Please try again");
    }
});

module.exports = router;