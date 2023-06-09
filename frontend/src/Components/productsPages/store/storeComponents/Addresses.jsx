import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Accordion, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import {  UpdatePaymentMethod, UpdateProducts, UpdateTotal, updateBillingAdd, updateShippingAdd } from '../../../../reduxConf/slices/Order';   

function AddForm({setA,setAdd}){
    let [addData,setAddData]=useState({
        custName:'',
        HouseNo:'',
        locality:'',
        Pincode:'',
        District:'',
        State:'',
        Mobile:0
    })
    let handleOnChange=(e)=>{
        let name=e.target.name;
        let val=e.target.value;
        setAddData((prev)=>({
            ...prev,
            [name]:val
        }))
    }
    let handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(addData)
        let addAdd=await axios.post(`${process.env.REACT_APP_SERVER_URL}addAddress`,addData,{
            headers:{
                'Authorization':`token ${JSON.parse(localStorage.getItem('login')).accessToken}`
            }
        })
        setAdd((prev)=>{
         return [
            ...prev,
            addAdd.data.address
         ]   
        })
        console.log(addAdd.data.address)
        setA((prev)=>{
            return false;
        })
    }
    return(
        <>
            <form action="" onSubmit={handleSubmit} align="center">
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='name' name='custName' onChange={handleOnChange} required />
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='House No/Flat No' name='HouseNo' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='locality' name='locality' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='pincode' name='Pincode' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='District' name='District' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='State' name='State' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" minLength={10} maxLength={10} placeholder='Mobile no' name='Mobile' onChange={handleOnChange} required/>
                </div>
                <button className='btn btn-danger'>Add</button>
            </form>
        </>
    )
}
function EditForm({formData,setE,setAdd}){
    let [addData,setAddData]=useState({
        custName:formData.custName,
        HouseNo:formData.HouseNo,
        locality:formData.locality,
        Pincode:formData.Pincode,
        District:formData.District,
        State:formData.State,
        Mobile:formData.Mobile
    })
    let handleOnChange=(e)=>{
        let name=e.target.name;
        let val=e.target.value;
        setAddData((prev)=>({
            ...prev,
            [name]:val
        }))
    }
    let handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(addData)
        console.log(formData.aid);
        let addAdd=await axios.put(`${process.env.REACT_APP_SERVER_URL}editAddress/${formData.aid}`,addData,{
            headers:{
                'Authorization':`token ${JSON.parse(localStorage.getItem('login')).accessToken}`
            }
        })
        setAdd((prev)=>{
            // let fil=prev.filter((ele)=>{
            //     return ele._id!=formData._id;
            // })
            let ind=prev.map(e=>e._id).indexOf(formData._id);
            prev[ind]=addAdd.data.address;
         return [
            ...prev
         ]   
        })
        console.log(addAdd.data.address)
        setE((prev)=>{
            return false;
        })
    }
    return(
        <>
            <form action="" onSubmit={handleSubmit} align="center">
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='name' name='custName' onChange={handleOnChange} value={addData.custName} required />
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='House No/Flat No' name='HouseNo' onChange={handleOnChange} value={addData.HouseNo} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='locality' name='locality' onChange={handleOnChange} value={addData.locality} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='pincode' name='Pincode' onChange={handleOnChange} value={addData.Pincode} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='District' name='District' onChange={handleOnChange} value={addData.District} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='State' name='State' onChange={handleOnChange} value={addData.State} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" minLength={10} maxLength={10} placeholder='Mobile no' name='Mobile' value={addData.Mobile} onChange={handleOnChange} required/>
                </div>
                <button className='btn btn-danger'>Add</button>
            </form>
        </>
    )
}

export default function Addresses() {
    let addData=useLoaderData();
    let cartData=useSelector((state)=>state.UserCartData.value)
    let orderData=useSelector((state)=>state.orderData.value)
    let userData=useSelector((state)=>state.Auth.value)
    console.log(addData)
    let [add,setAdd]=useState(false);
    let [edit,setEdit]=useState(false);
    let [adresses,setAdresses]=useState(addData.addressData.address)
    let [formData,setFormData]=useState()
    let [billingAddress,setBillingAddress]=useState(orderData.address.billingAddress?orderData.address.billingAddress:{})
    let [shippingAddress,setshippingAddress]=useState(orderData.address.shippingAddress?orderData.address.shippingAddress:{})
    let [paymentMode,setPaymentMode]=useState(orderData.paymentMethod);
    let [total,setTotal]=useState(0)
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let setEditOn=(data)=>{
        setFormData((prev)=>{
            return data;
        })
        setEdit((prev)=>{
            return true;         
        });
    }
 

 

  
    useEffect(()=>{
        if(cartData.length==0)
        {
            navigate(-1);
        }
        
            
        setTotal(0);
        cartData.forEach(element => {
            setTotal((prev)=>{
                return prev+element.item.price*element.quantity
            })
        })
        
        console.log(orderData)
    },[])

    useEffect(()=>{
        dispatch(UpdateTotal(total));
    },[total])

    
    let onShippingChange=(ele)=>{
        setshippingAddress((prev)=>{
            return ele;
        })
        console.log(shippingAddress)
        dispatch(updateShippingAdd(ele));
        dispatch(UpdateProducts(cartData));
        
    }
    let onBillingChange=(ele)=>{
        setBillingAddress((prev)=>{
            return ele;
        })
        console.log(shippingAddress)
        dispatch(updateBillingAdd(ele));
        dispatch(UpdateProducts(cartData));
        
    }
    let onPaymentChange=(e)=>{
        setPaymentMode((prev)=>{
            return e.target.value  
        });
        dispatch(UpdatePaymentMethod(e.target.value))
    }
    let placeOrder=async()=>{
            console.log(orderData)
            if(paymentMode=='cod')
            {
                let data={
                    item:orderData.Products,
                    billingAddress:orderData.address.billingAddress,
                    shippingAddress:orderData.address.shippingAddress,
                    total:orderData.total,
                    paymentMethod:orderData.paymentMethod,
                    
                }
                let resp=await axios.post(`${process.env.REACT_APP_SERVER_URL}createOrder`,{
                    status:'incomplete', 
                    aboutOrder:data                                                                  
                  },{
                    headers:{
                      'Authorization':`token ${userData.accessToken}`
                    }
                  }).catch((e)=>{
                    console.log(e)
                  })
                //   console.log(resp)
                  setTimeout(()=>{
                        navigate(`/app/order/completion?${resp.status==200?`status=succeeded&orderId=${resp.data.oid}`:'status=failed'}`) 
                },2000) 
                  
            }
            else if(paymentMode=='online'){
                navigate('/app/cart/checkOut')
            }
        
    }

  return (
    <>
    <div className='container-fluid m-0 p-5' style={{position:'relative',top:"10vh",height:'90vh',overflow:'hidden'}}>
      <div className="row">
            <div className="col-4">
            {
                add?(
                    <AddForm setA={setAdd} setAdd={setAdresses}/>
                ):(
                    edit?(
                        <>
                            <EditForm formData={formData} setE={setEdit} setAdd={setAdresses}/>
                        </>
                    ):(
                        <>
                            <button className='btn text-danger fs-4' onClick={()=>{setAdd(()=>{return true})}} style={{width:"5vw"}}>Add &nbsp;<i class="fa-solid fa-pen-to-square"></i></button>
                            <Accordion defaultActiveKey="0" style={{marginTop:'20px'}}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Select Billing Address</Accordion.Header>
                                        <Accordion.Body style={{height: "60vh",overflowY:"scroll",paddingBottom:'40px'}} >
                                            {
                                                adresses.map((ele)=>{
                                                    return(
                                                        <>
                                                        
                                                            <div class="bg-white card addresses-item mb-4 border border-primary shadow" onClick={()=>{onBillingChange(ele)}}>
                                                                <div class="gold-members p-4">
                                                                    <div class="media">
                                                                        <div class="mr-3"><i class="icofont-ui-home icofont-3x"></i></div>
                                                                        <div class="media-body">
                                                                            <h6 class="mb-1 text-secondary">Home</h6>
                                                                            <p class="text-black">{ele.custName} , {ele.HouseNo} , {ele.locality} , {ele.Pincode} , {ele.District} , {ele.State} , {ele.Mobile}</p>
                                                                            <p class="mb-0 text-black font-weight-bold" style={{display:'inline-block',width:'100px'}}><span class="text-primary mr-3" data-toggle="modal" data-target="#add-address-modal" onClick={()=>{setEditOn(ele)}}><i class="icofont-ui-edit"></i> EDIT</span> <span class="text-danger" data-toggle="modal" data-target="#delete-address-modal" href="#"><i class="icofont-ui-delete"></i> DELETE</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                
                                                        </>
                                                    )
                                                })
                                            }
                                        </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>select Shipping Address</Accordion.Header>
                                        <Accordion.Body style={{height: "60vh",overflowY:"scroll",paddingBottom:'40px'}} >
                                            {
                                                adresses.map((ele)=>{
                                                    return(
                                                        <>
                                                        
                                                            <div class="bg-white card addresses-item mb-4 border border-primary shadow" onClick={()=>{onShippingChange(ele)}}>
                                                                <div class="gold-members p-4">
                                                                    <div class="media">
                                                                        <div class="mr-3"><i class="icofont-ui-home icofont-3x"></i></div>
                                                                        <div class="media-body">
                                                                            <h6 class="mb-1 text-secondary">Home</h6>
                                                                            <p class="text-black">{ele.custName} , {ele.HouseNo} , {ele.locality} , {ele.Pincode} , {ele.District} , {ele.State} , {ele.Mobile}</p>
                                                                            <p class="mb-0 text-black font-weight-bold" style={{display:'inline-block',width:'100px'}}><span class="text-primary mr-3" data-toggle="modal" data-target="#add-address-modal" onClick={()=>{setEditOn(ele)}}><i class="icofont-ui-edit"></i> EDIT</span> <span class="text-danger" data-toggle="modal" data-target="#delete-address-modal" href="#"><i class="icofont-ui-delete"></i> DELETE</span></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                
                                                        </>
                                                    )
                                                })
                                            }
                                        </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>  
                        </>
                    
                    )
                )
            }
            </div>
            <div className="col-8" style={{height:'40vh'}}>
                    {
                        (orderData.address.shippingAddress || orderData.address.billingAddress)?(
                            <>
                                <Card className=''>
                                    <Card.Header>
                                        <h1>Total Items : {orderData.Products.length}</h1>
                                    </Card.Header>
                                    <Card.Body>
                                        {!orderData.address.shippingAddress?(
                                            <>
                                                <h2>select Shipping Address</h2>
                                            </>
                                        ):(
                                            <>
                                                    <h3>Shipping Address</h3>
                                                    <div class="bg-white card addresses-item mb-4 border border-primary shadow" >
                                                        <div class="gold-members p-4">
                                                            <div class="media">
                                                                <div class="mr-3"><i class="icofont-ui-home icofont-3x"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="mb-1 text-secondary">Home</h6>
                                                                    <p class="text-black">{shippingAddress.custName} , {shippingAddress.HouseNo} , {shippingAddress.locality} , {shippingAddress.Pincode} , {shippingAddress.District} , {shippingAddress.State} , {shippingAddress.Mobile}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </>
                                            )
                                        }
                                    </Card.Body>
                                </Card> 
                                <Card className=''>
                                    <Card.Body>
                                        {!orderData.address.billingAddress?(
                                            <>
                                                <h2>select billing address</h2>
                                            </>
                                        ):(   
                                            <>
                                                    <h3>Billing Address</h3>
                                                    <div class="bg-white card addresses-item mb-4 border border-primary shadow" >
                                                        <div class="gold-members p-4">
                                                            <div class="media">
                                                                <div class="mr-3"><i class="icofont-ui-home icofont-3x"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="mb-1 text-secondary">Home</h6>
                                                                    <p class="text-black">{billingAddress.custName} , {billingAddress.HouseNo} , {billingAddress.locality} , {billingAddress.Pincode} , {billingAddress.District} , {billingAddress.State} , {billingAddress.Mobile}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </>
                                            )       
                                        }
                                    </Card.Body>
                                </Card>   
                                <Container fluid='lg' style={{height:'40%'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title><h1>Total Price:{total}</h1></Card.Title>
                                            <Card.Text>
                                                <select name="" id="" onChange={onPaymentChange} value={paymentMode}>
                                                    <option value="">selec payment mode</option>
                                                    <option value="cod">Cash On Delivery</option>
                                                    <option value="online">Online</option>
                                                </select>

                                            </Card.Text>
                                        </Card.Body>
                                        {
                                            (orderData.address.shippingAddress && orderData.address.billingAddress && paymentMode.length!=0)&&<Card.Footer><Button onClick={placeOrder}>{paymentMode!='online'?"Place Order":"Proceed to payment"}</Button></Card.Footer>
                                        }       
                                    </Card>
                                </Container>
                                   
                            </>
                        ):(
                            <>
                                <h1>select Address</h1>
                            </>
                        )
                    }

            </div>
      </div>
    </div>
    </>
  )
}
