const mongoose=require('mongoose')
const videoSchema=new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    filePath:{
        type:String
    },
    contentType:{
        type:String
    }
})


const Workout=new mongoose.Schema({
    wid:{
        type:String,
        required:true,  
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:[String],
        trim:true,
        required:true 
    },
    video:{
        type:[videoSchema],
        default:undefined
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    difficulty:{
        type:String,
        required:true,
        trim:true
    },
    force:{
        type:String,
        required:true,
        trim:true
    },
    grips:{
        type:String,
        default:'Neutral',
        trim:true
    },
    primary:{
        type:String,
        required:true,
        trim:true
    },
    secondary:{
        type:[String],
        default:[]
    }

    
})

const WorkoutModel=mongoose.model('Workout',Workout);

module.exports=WorkoutModel;