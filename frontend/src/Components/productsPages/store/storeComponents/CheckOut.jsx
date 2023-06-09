import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { UpdateProducts } from '../../../../reduxConf/slices/Order';

export default function CheckOut() {
  let CartData=useSelector((state)=>state.UserCartData.value)
  let dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(UpdateProducts(CartData))
    
    
  },[CartData])
  return (
    <>
        <Outlet />  
    </>
  )
}
