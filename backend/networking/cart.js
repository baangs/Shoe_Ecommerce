//3. cart route
const router = require('express').Router();
const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

//CREATE CART
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch(err) {
        res.status(500).json(err);
    }
});

//UPDATE CART/NEEDS REFACTOR
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
        {
            $set: req.body
        }, 
            { new: true }
        );
        res.status(200).json(updatedCart);

    } catch(err) {
        res.status(500).json(err);
    }
});

//DELETE CART/NEEDS REFACTOR
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been cleared.");
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const Cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(Cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL CARTS
router.get("/", verifyTokenAndAdmin, async (req,res) => {

    try {
        const allCarts = await Cart.find();
        res.status(200).json(allCarts);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;