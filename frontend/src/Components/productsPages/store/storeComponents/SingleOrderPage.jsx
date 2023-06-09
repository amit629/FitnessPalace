import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom';

export default function SingleOrderPage() {
    let [orderData,setOrderData]=useState();
    let [productData,setProductData]=useState();
    let [deliveryDate,setDeliveryDate]=useState();
    const [searchParams, setSearchParams] = useSearchParams();  
    let oid=useLoaderData();
    let getData=async()=>{
        let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}order/${oid}?pid=${searchParams.get('pid')}`,{
            headers:{
                Authorization:`token ${JSON.parse(localStorage.getItem('login')).accessToken}`
            }
        });
        console.log(resp);  
        setOrderData(()=>{
            return resp.data.orderData  
        })
        setProductData(()=>{
            return resp.data.productData[0]
        })

        let date=resp.data.orderData.createdAt.split('T')[0].split('-');
        date[2]=parseInt(date[2])+3
        date[2]=date[2].toString()
        date=date.join('-')         
        console.log(date)
        setDeliveryDate(()=>{
            return date
        })
        
    }
    useEffect(()=>{
        getData()
    },[])   
    if(!orderData || !productData)
    {
        return <><h1 style={{position:'relative',top:'13vh',padding:"20px 150px"}}>Loading...</h1></>
    }
  return (
    <>
        <div className="container-fluid " style={{position:'relative',top:'13vh',padding:"20px 150px"}}>
            <div className="row ">
                <div className="col-8">
                    <div className="orderDet">
                        <div className="row" style={{border:'2px solid black',marginBottom:'20px'}}>
                            <div className="container-fluid fs-2 fw-bold p-4" style={{borderBottom:'2px solid grey'}}>
                                Order Details    
                            </div>
                               <div className="container-fluid " style={{padding:'25px'}}>
                                <div className="row">
                                    <div className="col-7">
                                        <div className="container-fluid">
                                            <span className='displayInline'>Order Number : </span><span className='displayInline'>&nbsp;{orderData.oid}</span>
                                        </div>
                                        <div className="container-fluid">
                                            <span className='displayInline'>Billing Name : </span><span className='displayInline'>&nbsp;{orderData.billingAddress.custName}</span>
                                        </div>
                                    </div>
                                    <div className="col-5"> 
                                        <div className="container-fluid">
                                            <span className='displayInline'>Date Ordered : </span><span className='displayInline'>&nbsp;{orderData.createdAt.split('T')[0]}</span>
                                        </div>
                                        <div className="container-fluid">
                                            <span className='displayInline'>Delivery Date : </span><span className='displayInline'>&nbsp;{deliveryDate}</span>
                                        </div>  
                                    </div>
                                </div>
                            </div>   
                        </div>    
                        <div className="row " style={{border:'2px solid black',marginBottom:'20px'}}>
                            <div className="container-fluid fs-2 fw-bold p-4" style={{borderBottom:'2px solid grey'}}>
                                Delivery Details
                            </div>
                                <div className="container-fluid " >
                                    <div className="row" >
                                        <div className="col-1">
                                                
                                        </div>
                                        <div className="col-5 p-4" >
                                            <div className="container-fluid fs-4 fw-bold p-2" >
                                                Delivery Address
                                            </div> 
                                            <div className='container-fluid'>
                                                <p class="text-black">
                                                    {orderData.billingAddress.custName} <br/> {orderData.billingAddress.HouseNo} , {orderData.billingAddress.locality} , {orderData.billingAddress.Pincode} , {orderData.billingAddress.District} , {orderData.billingAddress.State} , {orderData.billingAddress.Mobile}
                                                </p>
                                                    
                                            </div> 
                                            
                                        </div>
                                        <div className="col-5 p-4">
                                            <div className="container-fluid fs-4 fw-bold p-2" >
                                                Billng Address
                                            </div> 
                                            <div className='container-fluid'>
                                            <p class="text-black">
                                                {orderData.shippingAddress.custName} <br/> {orderData.shippingAddress.HouseNo} , {orderData.shippingAddress.locality} , {orderData.shippingAddress.Pincode} , {orderData.shippingAddress.District} , {orderData.shippingAddress.State} , {orderData.shippingAddress.Mobile}
                                                </p>     
                                            </div> 
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="container-fluid p-5" >
                                    <div className="row">
                                        <div className="container-fluid fs-4 fw-bold" >
                                            Delivery Status
                                        </div>           
                                    </div>
                                    <div className="container-fluid p-5">
                                        <div>
                                            <ul class="list-group list-group-horizontal" >
                                                <li class="list-group-item" style={{border:'none',marginLeft:'-30px',position:'relative',background:'transparent'}} align="center">Order Placed</li>
                                                <li class="list-group-item ps-2 pe-2" style={{border:'none',marginLeft:'32%',background:'transparent'}} align="center">Order Shipped</li>
                                                <li class="list-group-item ps-2 pe-2" style={{border:'none',marginLeft:'27%',background:'transparent'}} align="center">Order Delivered</li>
                                            </ul>  
                                        </div> 
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style={{width: "1%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                              
                                    </div>
                                </div>
                                <div className="container-fluid p-5 pt-0" >
                                    <div class="row p-2 border rounded" >
                                        <div class="col-md-3 mt-1 p-4 " style={{borderRadius:"10%"}}><img class="img-fluid img-responsive rounded product-image" src={`${process.env.REACT_APP_SERVER_URL}productImages/${productData.productId.image.fileName}`} style={{height:'120px',width:'120px'}}/></div>
                                        <div class="col-md-6 mt-1">
                                            <h5 style={{fontWeight:'bolder',fontSize:'1.5rem'}}>{productData.productId.name}</h5>                     
                                            <span>quantity: {productData.quantity}</span>
                                        </div>
                                        <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                            <div class="d-flex flex-column align-items-center">
                                                <span>Price : Rs {productData.productId.price}</span>

                                            </div> 
                                        </div>
                                    </div>  
                                </div>
                        </div>       
                                                                               
                    </div>        
                </div>
                <div className="col-4  " style={{padding:'40px'}}>
                        <div className="row" style={{border:'2px solid black'}}>
                            <div className="container-fluid fs-2 fw-bold p-4" style={{borderBottom:'2px solid grey'}}>
                                    Order Total     
                            </div>
                            <div className="container-fluid">
                                <div className="row p-3 pt-4 pb-4" >
                                    <div className="col-6" style={{float:'left'}}>
                                        Subtotal
                                    </div>
                                    <div className="col-6" style={{ textAlign:'right'}}> 
                                        Rs {orderData.OrderValue}
                                    </div>
                                </div>
                                <div className="row p-3 pt-4 pb-4" style={{borderBottom:'1px solid grey'}}>
                                    <div className="col-6" style={{float:'left'}}>
                                        Shipping
                                    </div>
                                    <div className="col-6" style={{ textAlign:'right'}}> 
                                        Free
                                    </div>
                                </div>
                                <div className="row p-3 pt-4 pb-4">
                                    <div className="col-6 fw-bold fs-3" style={{float:'left'}}>
                                        Total
                                    </div>
                                    <div className="col-6 fw-bold fs-3" style={{ textAlign:'right'}}> 
                                        Rs {orderData.OrderValue}
                                    </div>
                                </div>
                                
                            </div>   
                        </div>
                </div>
            </div> 
            
        </div>
    </>
  )
}
