const mongoose=require('mongoose')

let AddressSchema=new mongoose.Schema({
    aid:{
        type:String,
        required:true
    },
    custName:{
        type:String,
        required:true,
        trim:true
    },
    HouseNo:{
        type:String,
        required:true,
        trim:true
    },
    locality:{
        type:String,
        trim:true,
        required:true
    },
    Pincode:{
        type:Number,
        required:true,
        trim:true
    },
    District:{
        type:String,
        required:true,
        trim:true
    },
    State:{
        type:String,
        required:true,
        required:true
    },
    Mobile:{
        type:Number,
        required:true,
        trim:true
    }
})

let Address=mongoose.model('Address',AddressSchema);

module.exports=Address;