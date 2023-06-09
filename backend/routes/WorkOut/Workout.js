let express=require('express');
const { verifyAuth, isSuperAdmin } = require('../../adminMiddleWares/middle');
const WorkoutModel = require('../../model/Workout');
const {v4:uuid}=require('uuid')
const path=require('path')     
let Router=express.Router();

Router.get('/workout',async(req,res)=>{
    let data=await WorkoutModel.find({});
    res.json({
        data:data
    })
})              
Router.get('/workout/:category',async(req,res)=>{
    // console.log(req.params.category);
    let category=req.params.category
    let errors=undefined;
    let workData=await WorkoutModel.find({primary:category});
    if(workData.length==0)
    {
        workData=await WorkoutModel.find({secondary:category})
    }
      
    res.status(201).json({
        data:workData,
        err:errors
    })
})
Router.get('/video/:filename',async(req,res)=>{
    let {filename}=req.params;
    // console.log(req.params)
    var options = {
        root: path.join(__dirname, '../../video'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    // let file=fs.readFileSync(`../../uploads/${name}`,
    // {encoding:'Base64', flag:'r'});
    res.sendFile(filename,options,(err)=>{
        console.log(err);
    })
})
module.exports=Router;

