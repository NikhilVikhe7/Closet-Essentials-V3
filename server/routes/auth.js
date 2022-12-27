const router = require('express').Router();
const User = require('../models/User')
const Cart = require("../models/Cart");
const dotenv = require('dotenv');
dotenv.config()
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTOKEY).toString()
    });

    try {
        const savedUser = await newUser.save()
        const cart = new Cart({
            "userId":savedUser._id,
            "products":[]
        })
        await cart.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }

})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (user) {
            const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOKEY);
            const newpassword = hashPassword.toString(CryptoJS.enc.Utf8);
            if (newpassword !== req.body.password) {
                res.status(401).json("Wrong Csredentials");
            } else {
                const {password, ...others} = user._doc;

                const accessToken = jwt.sign({
                        id: user.id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SEC,
                    {expiresIn:"3d"}
                );
                res.status(200).json({...others, accessToken});
            }
        } else {
            !user && res.status(401).json("Wrong Credentials")
        }


    } catch (err) {
        res.status(500).json(err);
    }

})

module.exports = router;