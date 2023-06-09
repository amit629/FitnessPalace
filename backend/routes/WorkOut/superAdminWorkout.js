let express=require('express');
const { verifyAuth, isSuperAdmin } = require('../../adminMiddleWares/middle');
const { uploadVid } = require('../../multer');
const WorkoutModel = require('../../model/Workout');
const {v4:uuid}=require('uuid')     
let Router=express.Router();



Router.post('/addWorkouts',verifyAuth,isSuperAdmin,uploadVid.array('file',3),async(req,res)=>{
    console.log(req.files)
    console.log(req.body)
    let {name,description,difficulty,force,category,grips,primary,secondary}=req.body
    let fileData=[];
    req.files.forEach(ele=>{
        fileData.push({
            fileName:ele.filename,
            filePath:ele.path,
            contentType:ele.mimetype
        })
    })

    let workMod=new WorkoutModel();
    workMod.wid=uuid();
    workMod.name=name;
    description=description.split('||')
    workMod.description=description;
    workMod.difficulty=difficulty;
    workMod.force=force;
    workMod.category=category;
    workMod.grips=grips;
    workMod.primary=primary;            
    workMod.secondary=secondary.split(',');
    workMod.video=fileData
    let resp=await workMod.save();
    
    res.status(200).json({
        data:resp
    })
    
})
module.exports=Router