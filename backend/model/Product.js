const mongoose=require('mongoose')
const ProductSchema=new mongoose.Schema({
    pid:{
        type:String,
        required:true,  
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    description:{
        type:[String],
        trim:true,
        required:true
        
    },
    image:{
        fileName:String,
        filePath:String,
        contentType:String
    },
    category:{
        type:String,
        required:true
    },
    avgRating: {
        type: Number,
        default:0 
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})

const ProductModel=mongoose.model('Product',ProductSchema);

module.exports=ProductModel;