import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { deleteProduct } from '../../../../reduxConf/slices/Products';

export default function AdminCards({data}) {
  
  const userData=useSelector((state)=>state.Auth.value);
  // const [navig,setNavig]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const delProduct=async ()=>{
    console.log(data._id)
    let deleteReq=await axios.delete(`${process.env.REACT_APP_SERVER_URL}admin/MyProducts/${data.pid}/delete`,{
      headers:{
        'Authorization':`token ${userData.accessToken}`
      }
    }) 
    dispatch(deleteProduct(data.pid));
    if(deleteReq.status==200)
    {
      
      navigate('/app')  
    }
   
  } 
  console.log(data)
  return (
    
    <>
        <div class="card" align="center">
          <img src={`${process.env.REACT_APP_SERVER_URL}productImages/${data.image.fileName}`} class="card-img-top m-0 mb-3" style={{position:'relative'}} alt="..."/>
          <div class="card-body">
          <h5 class="card-title">
                  {data.name.slice(0,40)+"..."}
              
          </h5>
       
          <Link to="/app" class="btn btn-primary mt-3 ms-2">Show</Link>
          <Link to={`/app/admin/edit/${data.pid}`} class="btn btn-success mt-3 ms-2">Edit</Link>
          <button onClick={delProduct} class="btn btn-danger mt-3 ms-2">Delete</button>
          </div>
      </div>
    </>
  )
}
