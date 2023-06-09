const mongoose=require('mongoose')

let userSchema=new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        default:'buyer'
    },
    mobile:{
        type:Number,
        default:0
    },
    about:{
        type:String,
        trim:true
    },
    image:{
        type:String,
        default:'dummy.jpg'
    },
    address:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Address'
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ]
})

let userModal=mongoose.model('User',userSchema);

module.exports=userModal;