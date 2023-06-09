import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/Cart.css'
import { EmptyCart, RemoveCart, updateCartQuantity } from '../../../../reduxConf/slices/Cart'
import { Link } from 'react-router-dom'

export default function Cart() {
    let CartData=useSelector((state)=>state.UserCartData.value)
    let dispatch=useDispatch()
    let [total,setTotal]=useState(0);
    useEffect(()=>{
        setTotal((prev)=>{
            return 0
        })
        CartData.forEach((ele)=>{
            
            setTotal((prev)=>{
                return prev+(parseInt(ele.item.price)*ele.quantity);
            })
        })
    },[CartData])
    // console.log(CartData);
    let removeAllItem=(ele)=>{
        dispatch(EmptyCart());
    }
    let removeItem=(ele)=>{
        // console.log(ele)
        dispatch(RemoveCart(ele))
    }
    let updateCart=(id,quant)=>{
        dispatch(updateCartQuantity({
            pid:id,
            quantity:quant
        }))
    }
    let decreaseCnt=(id,quant)=>{
        console.log(id,quant)
        quant-=1;
        updateCart(id,quant)
        
        
    }
    let increaseCnt=(id,quant)=>{
        console.log(id,quant)
        quant+=1;
        updateCart(id,quant);
        
        
        
    }
   
  return (
    <>
        <div className='container-fluid m-0 p-0' style={{position:'relative',top:"10vh"}}>
            <div className="row">
                <div className="col-1 ">

                </div>
                <div className="col-8 CartContainer">
                    {
                        CartData.length!=0 ? (
                            <>
                                <div class="Header">
                                    <h3 class="Heading">Shopping Cart</h3>
                                    <h5 class="Action" onClick={removeAllItem}>Remove all</h5>
                                </div>
                                {
                                    
                                    CartData.map((ele)=>{
                                            
                                        return (
                                            
                                            <div className="container-fluid mt-3">
                                                <div class="Cart-Items">
                                                    <div class="image-box">
                                                        <img src={`${process.env.REACT_APP_SERVER_URL}productImages/${ele.item.image.fileName}`}  style={{height:"120px"}} />
                                                    </div>
                                                    <div class="about">
                                                        <h3 class="title">{ele.item.name}</h3>
                                                       
                                                    </div>
                                                    <div class="counter">
                                                        <button class="butti" onClick={()=>{increaseCnt(ele.item.pid,ele.quantity)}}>+</button>
                                                        <div class="count">{ele.quantity}</div>
                                                        <button class="butti" onClick={()=>{decreaseCnt(ele.item.pid,ele.quantity)}}>-</button>
                                                    </div>
                                                    <div class="prices">
                                                        <div class="amount">Rs {ele.item.price}</div>
                                                        <div class="save"><u>Save for later</u></div>
                                                        <div class="remove" onClick={()=>{removeItem(ele.item.pid)}}><u>Remove</u></div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        )
                                    })
                                }
                                <hr/>
                                <div class="checkout">
                                    <div class="total">
                                        <div>
                                            <div class="Subtotal">Sub-Total</div>
                                            <div class="items">{CartData.length} items</div>
                                        </div>
                                        <div class="total-amount">Rs {total}</div>
                                    </div>
                                    <Link to="selectAddress" class="button">Checkout</Link>
                                </div>
                            </>
                        ):(
                            <h1>Cart is Empty</h1>
                        )
                    }
                </div>
               
            </div>
        </div>
    </>
  )
}
