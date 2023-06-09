const express=require('express')
const ProductModel=require('../../model/Product')
const path=require('path')
const Router=express.Router();
let {verifyAuth} =require('../../adminMiddleWares/middle');
const { stripe_publishable_key, stripe_secret_key, mailPass } = require('../../tokens');
const orderModal = require('../../model/Order');
let {v4:uuid}=require('uuid');
const userModal = require('../../model/User');
const orderPro = require('../../model/OrderProduct');
let mailer=require('nodemailer')
let fs=require('fs');

let stripe=require('stripe')(stripe_secret_key)

Router.get('/products/getData',async (req,res)=>{

    const {_filt}=req.query;
    let err=[];
    let data="";
    try{
        if(_filt==undefined)
        {
            data=await ProductModel.find({})
        }
        else{
            data=await ProductModel.find({category:_filt})
        }
    }
    catch(e)
    {
        err.push(e);
    }
    // const data=await ProductModel.find({}).limit(20);
    res.status(201).json({
        productData:data,
        error:err
    })
 
})
Router.get('/products/getData/:id',async(req,res)=>{
    const {id}=req.params;
    let err=[];
    try{
        var data=await ProductModel.findById(id).populate('author');
        var morePro=await ProductModel.find({category:data.category,_id:{"$ne":id}}).limit(4);
    }
    catch(e)
    {
        err.push(e);
    }
    // console.log(morePro)
    res.json({
        productData:data,
        moredata:morePro,
        error:err
    })
})
Router.get('/config',verifyAuth,(req,res)=>{
    res.send({
        publishableKey:stripe_publishable_key,
    });
})
Router.post("/create-payment-intent",verifyAuth, async (req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    try{
            let user=req.user;
            let { items,total,address } = req.body;
            console.log(req.body)

            const paymentIntent = await stripe.paymentIntents.create({  
                amount: total,
                currency: "inr",
                automatic_payment_methods: {
                    enabled: true,
                }
            });
        
            res.json({
                clientSecret: paymentIntent.client_secret,
                data:paymentIntent,
                orderData:{
                    item:items,
                    billingAddress:address.billingAddress,
                    shippingAddress:address.shippingAddress ,
                    total:total
                }
            });
    }catch(e){
        res.status(400).json({
            error:{
                message:e.message,
            }
        })
    }
  })
  let createEle=(orderData)=>{
        return new Promise((resolve,reject)=>{
            let useHtml='';
            let attachments=[];
                orderData.forEach((eleData)=>{
                    let eleId=eleData.productId.image.fileName.split('.')[0];
                    let attCon={
                        filename:eleId,
                        path: path.join(__dirname,`../../uploads/${eleData.productId.image.fileName}`),
                        cid: eleId  
                    }
                    attachments.push(attCon);
                    useHtml+=`
                            <div class="row p-2 bg-white border rounded" >
                            <div class="col-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="cid:${eleId}" style="height:200px,width:200px"/></div>
                            <div class="col-6 mt-1">
                                <h5>${eleData.productId.name}</h5>                     
                                <span>quantity: ${eleData.quantity}</span>
                            </div>
                            <div class="align-items-center align-content-center col-3 border-left mt-1">
                                <div class="d-flex flex-row align-items-center">
                                    <span>Price : Rs ${eleData.productId.price}</span>
                                </div> 
                            </div>
                        </div>
                    `
            })       
            resolve({
                htmlData:useHtml,
                attachments:attachments
            })   
        })
  }
  let sendMail=async(name,email,oid)=>{
        let userOrder=await orderModal.findOne({oid:oid}).populate({
            path:'orderData',
            populate:{path:'productId'}
        })
        // console.log(userOrder)
        let {htmlData,attachments}=await createEle(userOrder.orderData);
        let smtpProtocol =mailer.createTransport({
            service: "Gmail",
            auth: {
                user: "fitnesspalace4@gmail.com",
                pass: mailPass
            }
        });
        const fileData = fs.readFileSync(`${path.join(__dirname,'file.html')}`,                                                      
            { encoding: 'utf8', flag: 'r' });
        var mailoption = {
            from: "fitnesspalace4@gmail.com",
            to: email,
            subject: "Order placed",
            attachments: attachments,
            html:`
                    ${fileData}
                                    ${htmlData}
                                </div>                                                                                                                               
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `    
        }
        
        smtpProtocol.sendMail(mailoption, function(err, response){
            if(err) {
                console.log(err); 
                throw new Error(err);
            }
            smtpProtocol.close();
            return {
                status:response.accepted,
                resp:response.response
            }
        });  
  }
  Router.post("/createOrder",verifyAuth,async(req,res)=>{
    try{
        let user=req.user;
        let {paymentMethod,status,aboutOrder,clientSecret}=req.body;
        // console.log(paymentMethod,status,aboutOrder,clientSecret)
                                                                            
        let newOrder=new orderModal();
       
        newOrder.oid=uuid();
        aboutOrder.item.forEach(async(ele)=>{
            let pros=new orderPro();                                  
            pros.productId=ele.item._id;
            pros.quantity=ele.quantity;
            if(status!='failed')
            {
                pros.author=ele.item.author._id;
                pros.deliveryState='order placed';
            } 
            await pros.save();                              
            newOrder.orderData.push(pros._id);
        })                        
        newOrder.OrderValue=aboutOrder.total;
        newOrder.shippingAddress=aboutOrder.shippingAddress;
        newOrder.billingAddress=aboutOrder.billingAddress;
        if(newOrder.paymentMode!='cod')
        {
            newOrder.paymentStatus=status;
        }
        newOrder.paymentMode=paymentMethod;
                       
        // console.log('hit')                                                             
        let userId=await userModal.findById(user.userExist._id);
        userId.orders.push(newOrder._id);

        let dataere=await newOrder.save();
        let dataret=await userId.save();    
        
        let email=req.user.userExist.email;
        let name=req.user.userExist.name;
        // console.log()
        let mailerResp=sendMail(name,email,newOrder.oid);
        // console.log(mailerResp.status,mailerResp.resp);
        return res.status(200).json({
            oid:newOrder.oid
        })
    }catch(e){
        console.log(e)
        return res.status(404).json({
            err:'database me dikkat ho gayi'
        })
    }


  })
  Router.get('/orders/:oid',async(req,res)=>{
        try{
            let {oid}=req.params;
            // console.log(oid)
            let userOrder=await orderModal.findOne({oid:oid}).populate({
                path:'orderData',
                populate:{path:'productId'}
            })
            // console.log(userOrder)
            return res.status(200).json({
                data:userOrder
            })
        }catch(e){
            console.log(e)
            return res.status(404).json({
                err:'database me dikkat ho gayi'
            })
        }                               
  })
Router.get('/orders',verifyAuth,async (req,res)=>{
    let user=req.user;
    let userOrder=await userModal.findById(user.userExist._id).populate({
        path:'orders',
        populate:{path:'orderData',populate:{path:'productId'}}
    })
   
    res.status(200).json({
        data:userOrder.orders
    })
})
Router.get('/order/:orderNo',verifyAuth,async(req,res)=>{
    
    try{
        let {orderNo}=req.params;
        let {pid}=req.query;    

        console.log(pid,orderNo)
        let userOrder=await orderModal.findOne({oid:orderNo}).populate({
            path:'orderData',
            populate:{path:'productId'}
        })
        console.log(userOrder)
        // console.log(userOrder)
        let prData=userOrder.orderData.filter((ele)=>{
            return ele._id==pid;
        })
        return res.status(200).json({
            orderData:userOrder,
            productData:prData
        })
    }catch(e){
        console.log(e)
        return res.status(404).json({
            err:'database me dikkat ho gayi'
        })
    }  

})
Router.post('/testMailer',async (req,res)=>{
    console.log(req.body)
    try{
          
    }catch(e)
    {
        return res.json({
            err:'error aa gaya',
            actualError:e
        })
    }
    
})
module.exports=Router