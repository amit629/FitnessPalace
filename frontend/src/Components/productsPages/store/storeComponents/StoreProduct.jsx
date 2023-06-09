import React, { useEffect, useRef, useState } from 'react'
import SpinnerAnim from '../SpinnerAnim';
import axios from 'axios';
import { Link, useLoaderData } from 'react-router-dom';
import { CartData } from '../../../../reduxConf/slices/Products';
import { useDispatch, useSelector } from 'react-redux';
import { AddCart } from '../../../../reduxConf/slices/Cart';

export default function StoreProduct() {
  let data=useLoaderData();
  let productData=data.data.productData
  let relPro=data.data.moredata
  let dispatch=useDispatch()
  let CartData=useSelector((state)=>state.UserCartData.value)
  console.log(CartData)
  // let [productData,setProductData]=useState(data.productData);
  // let [relPro,setRelPro]=useState(data.moredata);
  let pro=CartData.filter((ele)=>{
    return ele.item.pid==productData.pid
  })
  console.log(pro)

  let [cntVal,setCntVal]=useState(pro.length==0?1:pro[0].quantity);

  let decreaseCnt=()=>{
    setCntVal((prev)=>{
      if(prev!=1)
      {
        return prev-=1;
      }
      else{
        return prev
      }
    })
    
  }
  let increaseCnt=()=>{
    setCntVal((prev)=>{
      if(prev<=4)
      {
        return prev+=1;
      }
      else{
        return prev
      }
    })
    
  }
  console.log(data);

  let addToCart=()=>{
      console.log(cntVal)
      let cartData={
        item:productData,
        quantity:cntVal
      }
      dispatch(AddCart(cartData))
  }
  // if(!productData)
  // {
  //   return <SpinnerAnim/>
  // }
  return (
    <>
      <section class="py-5 spMarginProduct mb-5">
        <div class="container-fluid px-4 px-lg-5 my-5" >
            <div class="row gx-4 gx-lg-5 align-items-center mt-5">
                <div class="col-md-5">
                  <img class="card-img-top mb-5 mb-md-0 productImage" src={`${process.env.REACT_APP_SERVER_URL}productImages/${productData.image.fileName}`} alt="..." />
                </div>
                <div className="col"></div>
                <div class="col-md-6">
                    <div class="small mb-1">SKU: BST-{productData.pid.slice(productData.pid.length-3)}</div>
                    <h1 class=" fw-bolder">{productData.name}</h1>
                    <div class="fs-5 mb-5">
                        
                        <span><span class="fw-bolder">Rs {productData.price}</span> </span>
                    </div>
                    {/* <p class="lead"> */}
                        <ul type="square"> 
                          {
                            productData.description.map((ele)=>{
                              return(
                                <li>➢ { ele }</li>
                              )
                            })
                          }
                      </ul>
                    
                    <div class="d-flex">
                        <button class="btn btn-secondary decQuant" onClick={decreaseCnt}>-</button>
                        <input class="quant btn" value={cntVal} style={{maxWidth:"3rem",outline: "none",border:"none"}} disabled/>
                        <button class="btn btn-secondary addQuant" onClick={increaseCnt}>+</button>&nbsp;
                        <button class="btn btn-outline-dark flex-shrink-0" type="button" onClick={addToCart}>
                            <i class="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
      <div className="container-fluid">
        <div className="row">

        </div>
      </div>
    </section>
    

   { relPro.length!=0 && <section class="py-5 bg-light">
        <div class="container-fluid px-4 px-lg-5 mt-5">
           
                <h2 class="fw-bolder mb-4">Related products</h2>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            
                    {
                      relPro.map((ele)=>{
                        return (
                          <div class="col mb-5">
                            <div class="card h-100 relCard" style={{width:"300px"}}>
                                
                                  <img class="card-img-top relProductImage" src={`${process.env.REACT_APP_SERVER_URL}productImages/${ele.image.fileName}`} alt="product" style={{width:'100%',marginBottom:"10px"}}/>
                                  
                                  <div class="card-body-top">
                                      <div class="text-center">
                                          
                                          <h5 class="fw-bolder">{ele.name.slice(0,40)+'...'}</h5>
                                          
                                          Rs-{ele.price}
                                      </div>
                                  </div>
                                  
                                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                      <div class="text-center"><Link class="btn btn-outline-dark mt-auto" to={`/app/product/${ele._id}`} >View options</Link></div>
                                  </div>
                              </div>
                          </div>
                        )
                      })
                    }
                
            </div>    
            
        </div>
    </section>
    }

    </>
  )
}
