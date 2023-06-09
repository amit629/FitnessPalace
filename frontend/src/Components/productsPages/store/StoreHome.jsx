import React, { useEffect } from 'react'
import './store.css'
import Navbar from './storeComponents/Navbar'
import { Outlet, redirect } from 'react-router-dom'
import Footer from './storeComponents/Footer'


export default function StoreHome() {
  useEffect(()=>{
    redirect('/app/store')
  },[])
  return (
    <>
      <header>
        <Navbar />
      </header>
        <Outlet/>
      
    </>
  )
}
