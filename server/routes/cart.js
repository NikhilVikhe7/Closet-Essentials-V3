const {verifyTokenAndAdmin, verifyTokenAndAuthorization,verifyToken} = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require('express').Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})


// //Update Cart
router.put("/:id", verifyToken, async (req, res) => {

    try {
        // console.log(req.body, "reqbody");
        // console.log(req.params.id, "req id");
        // const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
        //     $push : {products : req.body}
        // }, {new: true})
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

//
// //Delete

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
})

// //Get
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        // console.log("in cart get")
        const cart = await Cart.findOne({userId: req.params.userId})
        // const cart =
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
})
// //Get all

router.get("/", verifyTokenAndAdmin,async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (err) {
        res.status(500).json(err);
    }
})




module.exports = router;