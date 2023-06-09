
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { getDataAsync } from '../reduxConf/slices/NearyGym';
import SpinnerAnim from './productsPages/gym/partials/smallComponents/SpinnerAnim';
import { loginSlice } from '../reduxConf/slices/SignUp';
import { setLogin } from '../reduxConf/slices/SignUp';

export default function Home() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const dataFetchedRef = useRef(false);
  let gymData=useSelector((state)=>state.nearbygymdata.value);
  let loginData=useSelector((state)=>state.Auth.value);
  useEffect(()=>{
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
    if(gymData.length==0)
    {
      // dispatch(getDataAsync())
    }
    // console.log(loginData)
    let localItem=localStorage.getItem('login');
    if(localItem==null)
    {
      // navigate('/app/auth')
    }
    else{
      if(loginData.accessToken.length==0)
      {
        localItem=JSON.parse(localItem)
        dispatch(setLogin({accessToken:localItem.accessToken,username:localItem.username,role:localItem.role}));
      }
    }

  },[])
  return (
    <>
      <div className="container-fluid m-0 p-0">
          <Outlet context={loginData}/>
      </div>
    </>
  )
}
