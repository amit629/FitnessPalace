import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import GymNav from './partials/GymNav'
import SpinnerAnim from './partials/smallComponents/SpinnerAnim'
import { useSelector } from 'react-redux'




export default function GymHome() {
    
  return (
    <>
        <header>
            <GymNav/>
        </header>
        <main>
            <div className="container-fluid me-0 ms-0 ps-0 pe-0" style={{position:'relative',top:'8vh'}}>
                <Outlet/>
            </div>
        </main>
        
    </>
  )
}
