import React, { useEffect, useRef } from 'react'
import Navbar from '../storeComponents/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import '../css/admin.css'

export default function AdminDashBoard() {
    let userData=useSelector(state=>state.Auth.value);
  const navigate=useNavigate();
  const dataFetchedRef = useRef(false);
  useEffect(()=>{
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
    console.log(userData)
    const localItem=localStorage.getItem('login');
    if(localItem==null || JSON.parse(localItem).role=="buyer")
    {
        // alert('access denied')
        navigate('/app')
    }
  },[])
  return (
    <>
            <Outlet userData={userData}/>
    </>
  )
}
