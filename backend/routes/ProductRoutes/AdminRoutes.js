const express=require('express')
const Router=express.Router();
let ProductModel=require('../../model/Product')
const path=require('path')
const {upload}=require('../../multer');
const {v4:uuid}=require('uuid')
// const passport=require('passport');
const jsonWebToken=require('jsonwebtoken')
const fs=require('fs');
const { error } = require('console');

let verifyAuth=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    let token=authHeader && authHeader.split(' ')[1];
    console.log(token)
    if(token==null){
       return  res.redirect('/error')
    }
    jsonWebToken.verify(token,accessSecret,(err,user)=>{
        if(err)
        {
            return res.json({
                err:'EXP'
            })
        }
        req.user=user
        // if(user.)
        if(user.role=='buyer')
        {
            return res.status(401).json({
                err:'NS'
            })
        }
        next()
    })
}


// Router.get('/admin',verifyAuth,async(req,res)=>{
//     // console.log(Math.round(Math.random() * 1E9));
//     if(!req.user || req.user.role!='seller')
//     {
//         return res.redirect('/')        
//     }
    
//     res.render('adminHome',{partialToLoad:'home'})
// })
// Router.get('/admin/AddProducts',verifyAuth,async(req,res)=>{
//     // console.log(Math.round(Math.random() * 1E9));
//     if(!req.user || req.user.role!='seller')
//     {
//         return res.redirect('/')        
//     }
//     res.render('adminHome',{partialToLoad:'addPro'})
// })
Router.post('/admin/addProducts',verifyAuth,upload.single('file'),async (req,res)=>{

    // console.log(req.user)
    // const date=new Date();
    // console.log(date.getHours())
    let data=req.file;
    const {name,price,description,category}=req.body;
    // console.log(data,req.body.desc);
    let desc=description.split("||")
    // const obj={
    //     pid:uidd(),
    //     name:req.body.name,
    //     price:req.body.price,
    //     description:req.body.description,
    //     image:{
    //         fileName:req.file.filename,
    //         filePath:req.file.path,
    //         contentType:req.file.mimetype
    //     },
    //     category:req.body.category
    // }
    let {filename,mimetype,path}=req.file;
    let product=new ProductModel();
    product.pid=uuid();
    product.name=name;
    product.price=price;
    product.description=desc;
    product.image.fileName=filename;
    product.image.filePath=path;
    product.image.contentType=mimetype;
    product.category=category;
    product.author=req.user.userExist._id
    
    // console.log(req.user.userExist._id);
    const databaseRes=await product.save();
    console.log(databaseRes);
    // console.log(respone);
    // console.log(req.body)
    res.json({
        data:databaseRes
    })
    // res.redirect('/admin/AddProducts')
})
Router.get('/admin/myProducts',verifyAuth,async(req,res)=>{
    // console.log(req.user);
    const userData=await ProductModel.find({author:req.user.userExist._id})
    // console.log(userData)
    // res.render('adminHome',{partialToLoad:'adminPro',productData:userData})
    // console.log(userData)
    res.json({
        productData:userData
    })
})
Router.get('/productImages/:name',async(req,res)=>{
    let {name}=req.params;
    // console.log(req.params)
    var options = {
        root: path.join(__dirname, '../../uploads'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    // let file=fs.readFileSync(`../../uploads/${name}`,
    // {encoding:'Base64', flag:'r'});
    res.sendFile(name,options,(err)=>{
        console.log(err);
    })
})
Router.get('/admin/myProduct/:id/edit',verifyAuth,async(req,res)=>{
    // if(!req.user || req.user.role!='seller')
    // {
    //     return res.redirect('/')        
    // }
    let err=[];
    const {id}=req.params;
    console.log(id)
    let data=await ProductModel.findOne({pid:id});
    if(!data)
    {
        return res.json({
            err:['NFDB']
        })
    }
    console.log(data);
    data.description=data.description.join("||")
    console.log(data)
    // res.render('adminHome',{partialToLoad:'editPro',productData:data})
    
    res.json({
        productData:data,
        err:err
    })

})  
Router.put('/admin/MyProducts/:id/edit',verifyAuth,upload.single('file'),async(req,res)=>{
    // if(!req.user || req.user.role!='seller')
    // {
    //     return res.redirect('/')        
    // }
    // console.log("hmm")
    const {id}=req.params;
    const oldImage=await ProductModel.findOne({pid:id});
    // console.log(oldImage)
    let err=[]
    let data=req.body;
    console.log(req.file,req.body)
    let obj={
        name:data.name,
        price:data.price,
        description:data.description.split('||'),
        category:data.category
    }
    let image;
    let imagePath="";
    if(req.file!=undefined)
    {
        imagePath=oldImage.image.filePath;
        image={
            fileName:req.file.filename,
            filePath:req.file.path,
            contentType:req.file.mimetype
        }
        obj.image=image
    }
    console.log(imagePath)
    if(imagePath.length!=0)
    {
        try{
            fs.unlinkSync(imagePath)
        }
        catch(e)
        {
            return res.status(400).json({
                err:['CD23']
            })
        }
    }
    
    let resp=await ProductModel.updateOne({pid:id},{$set:obj});
    // let resp=[]
    // console.log(resp)
    res.status(201).json({
        err:err,
        data:resp
    })
    
})

Router.delete('/admin/MyProducts/:id/delete',verifyAuth,async(req,res)=>{
   
    console.log('hey babe');
    let err=[];
    const {id}=req.params;
    const data=await ProductModel.findOne({pid:id});
    if(!data)
    {
        return res.json({
            err:['NFDB']
        })
    }
    let imagePath=data.image.filePath;
    // console.log(imagePath   )
    try{
        fs.unlinkSync(imagePath)
    }
    catch(e)
    {
        // return res.json({
        //     err:['CD23']
        // })
        err.push(['CD23'])
    }
    const del=await ProductModel.deleteOne({pid:id});
   
    // console.log(del.acknowledged)
    if(del.acknowledged==false)
    {
        err.push('DPB')
    }   
    let st=err.length!=0?400:200;
    res.status(st).json({
        err:err
    })

})
module.exports=Router