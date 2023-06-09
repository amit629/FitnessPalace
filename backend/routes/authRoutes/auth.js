const express=require('express')
let Router=express.Router();
let jsonWebToken=require('jsonwebtoken')
const userModal=require('../../model/User')
const crypto=require('crypto');
const {v4:uuid}=require('uuid')
const { accessSecret } = require('../../tokens');
const bcrypt=require('bcrypt')
const {upload}=require('../../multer');
const AddressModal = require('../../model/Addresses');
const {verifyAuth,isSuperAdmin}=require('../../adminMiddleWares/middle')


Router.get('/getUser',verifyAuth,async(req,res)=>{
    let user=req.user.userExist
    let useData=await userModal.findOne({uid:user.uid});
    const userData={
        name:useData.name,
        email:useData.email,
        image:useData.image,
        uid:useData.uid,
        address:useData.address,
        mobile:useData.mobile,
        about:useData.about,
        address:useData.address
    }
    console.log(req.user);
    return res.json({
        userData:userData
    })
})
Router.put('/User',verifyAuth,async(req,res)=>{
    let user=req.user.userExist
    let UserData=req.body;
    console.log(UserData)
  
    const userData={
        name:UserData.name,
        email:UserData.email,
        mobile:UserData.mobile,
        about:UserData.about
    }
    //   let ProductModel=await userModal.updateOne({uid:UserData.uid},{$set:userData});
    let productData=await userModal.findOne({uid:UserData.uid});
    productData.name=UserData.name;
    productData.email=UserData.email;
    productData.about=UserData.about;
    productData.mobile=UserData.mobile;
    let resp=await productData.save()
    console.log(req.user);
    return res.json({
        userData:resp
    })
})
Router.put('/setProfileImage',verifyAuth,upload.single('file'),async(req,res)=>{
    console.log(req.body);
    let productData=await userModal.findOne({uid:req.body.uid});
    productData.image=req.file.filename;
    const resp=await productData.save();
    res.status(200).json({
        res:resp
    })
})
Router.post('/register',async (req,res)=>{
    let {name,email,pass,userRole}=req.body.userData;
    err=[];
    const prevExist= await userModal.findOne({email:email});
    var query;
    if(prevExist==null)
    {
        let hashedPass=await bcrypt.hash(pass,10);
        console.log(hashedPass)
        // query=await userModal.create({uid:uuid(),name:name,email:email,password:pass});
        const pro=new userModal();
        pro.uid=uuid();
        pro.name=name;
        pro.email=email;
        pro.password=hashedPass;
        if(userRole!=undefined)
        {
            pro.role=userRole
        }
        console.log(req.body)
        query=await pro.save();
    }
    else{
        err.push('user exist');
    }
    res.status(200).json({
        res:query,
        errors:err
    })
    
})
Router.post('/login',async (req,res)=>{
    
    const {email,pass,remember}=req.body.userData;
    // console.log(email,pass);
    accessToken="";
    refreshToken="";
    let err=[]; 
    let userExist=await userModal.findOne({email:email});
    // console.log(userExist)
    if(!userExist)
    {
        err.push('NU58')
    }
    else{
        let unHashPass=await bcrypt.compare(pass,userExist.password);
        if(!unHashPass)
        {
            err.push('NP58')
        }
        else{
            if(remember)
            {
                accessToken=jsonWebToken.sign({userExist},accessSecret,{expiresIn:'7d'})
            }
            else{
                accessToken=jsonWebToken.sign({userExist},accessSecret,{expiresIn:'1m'})
            }
        }
    }
    res.json({
        result:accessToken,
        username:userExist.name,
        role:userExist.role,
        error:err
    })
})
Router.get('/getAddress',verifyAuth,async (req,res)=>{
    // let address=req.user.userExist.address;
    // let resp=await userModal.findOne({_id:req.user.userExist._id});
    // let address=resp.address
    // console.log(resp)
    // let data=await 
    // let data=[];
    // address.forEach(async(ele)=>{
    //     console.log(ele)
    //     let AddressData=await AddressModal.findById(ele._id);
    //     console.log(AddressData)
    //     if(AddressData)
    //     {
    //         data=[
    //             ...data,
    //             AddressData
    //         ]
    //     }
    // })
    // console.log(data)
    let product = await userModal.findById(req.user.userExist._id).populate('address');
    return res.json({
        address:product

    })
})
Router.post('/addAddress',verifyAuth,async(req,res)=>{
    // console.log(req.user)
    let {custName,HouseNo,locality,Pincode,District,State,Mobile}=req.body
    let obj={
        aid:uuid(),
        custName:custName,
        HouseNo:HouseNo,
        locality:locality,
        Pincode:Pincode,
        District:District,
        State:State,
        Mobile:Mobile

    }
    let userDet=await userModal.findOne({uid:req.user.userExist.uid})
    let aSchema=new AddressModal(obj);
    // console.log(aSchema)
    // aSchema.CustName=
    
    console.log(userDet)
    userDet.address.push(aSchema)

    let data=await aSchema.save();
    await userDet.save();
    res.json({
        address:data
    })
})
Router.put('/editAddress/:id',verifyAuth,async(req,res)=>{
    // console.log(req.user)
    let {custName,HouseNo,locality,Pincode,District,State,Mobile}=req.body
    let obj={
        custName:custName,
        HouseNo:HouseNo,
        locality:locality,
        Pincode:Pincode,
        District:District,
        State:State,
        Mobile:Mobile
    }
    let add=await AddressModal.updateOne({aid:req.params.id},{$set:obj});
    let data=await AddressModal.findOne({aid:req.params.id});
    res.json({
        address:data
    })
})
Router.get('/helloBabe',verifyAuth,(req,res)=>{
    res.json({
        user:req.user
    })
})

Router.get('/products',(req,res)=>{

})

Router.get('/error',(req,res)=>{
    res.status(403).json({
        err:'error'
    })
})
module.exports=Router