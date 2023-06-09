import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Auth/auth.css'
export default function Auth() {
  return (
    <>
        <div className="container-fluid bg-special-fitnessPalace" style={{height:"100vh",width:'100vw'}}>
                 
                <Link to="/" ><i class="fa-sharp fa-solid fa-xmark authCross"></i></Link>
                <div style={{position:'relative',top:'12vh'}}>
                    <Outlet/>
                </div>
        </div>

    </>
  )
}
