import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import Navbar from './workOutComponent/Navbar';
import './workout.css'

export default function WorkoutHome() {
  const data=useOutletContext();
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <section  className='' style={{marginTop:'12vh'}} >
          <Outlet context={data}/>
      </section>
    </>
  )
}
