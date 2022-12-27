const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {type: String, required: true},

    products: [
        {
            productId: {type: String},
            title:{type:String},
            img:{type:String},
            quantity: {type: Number, default: 1},
            color:{type:String, required:true},
            size:{type:String, required:true},
            price:{type:Number}
        }
    ],

    quantity: {type: Number, required: true, default: 0},
    total: {type: Number, required: true, default: 0},

}, {timestamps: true});

module.exports = mongoose.model("Cart", CartSchema);