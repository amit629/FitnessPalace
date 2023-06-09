const mongoose = require('mongoose');

const orderProSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },quantity:{
        type:Number
    },author:{
        type:mongoose.Schema.Types.ObjectId
    },            
    deliveryState:{
        type:String,
        trim:true
    }
    
},{timestamps:true});


const orderPro = mongoose.model('OrderProduct', orderProSchema);

module.exports = orderPro;