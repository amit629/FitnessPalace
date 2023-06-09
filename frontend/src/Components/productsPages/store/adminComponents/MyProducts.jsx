import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminCards from './AdminCards';
import { useNavigate } from 'react-router-dom';
import { removeLogin, setLogin } from '../../../../reduxConf/slices/SignUp';
import SpinnerAnim from '../SpinnerAnim';


export default function MyProducts() {
  // let userData=useSelector((state)=>state.Auth.value)
  const dispatch=useDispatch();
  const navigate=useNavigate();
  let [productData,setProductData]=useState([]);
  const dataFetchedRef = useRef(false);
  // let [err,setErr]=useState(false)
  
  useEffect(()=>{
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      let localItem=localStorage.getItem('login');

      console.log(localItem)
      if(JSON.parse(localItem)==null)
      {
          navigate('/app/auth')
      }
      localItem=JSON.parse(localItem);
      if(localItem!=null)
      {
          axios.get(`${process.env.REACT_APP_SERVER_URL}admin/myProducts`,{
          headers: {
            'Authorization': `token ${localItem.accessToken}`
          },
          
        }).then((resp)=>{
          if(resp.data.err=='EXP')
          {
            dispatch(removeLogin());
            navigate('/app/auth')
          }
          if(resp.data.err=='error')
          {
            navigate('/')
          }
          setProductData(resp.data.productData);
        })
      }

      
    
      
   
  },[])
  
  // if(productData.length==0 )
  // {
  //   return <SpinnerAnim/>
  // }
  return (
    <>
        <div className="container-fluid adminProducts">
          <div className="row">
            <div class="col"></div>
              <div class="col-11 d-flex justify-content-evenly align-items-evenly flex-wrap AdminCards">
                {
                    productData.map((ele,index)=>{
                      return(
                            <AdminCards data={ele} key={index}/>
                      )
                    })
                }
              </div>
            </div>
    </div>
    </>
  )
}
