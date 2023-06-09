
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeLogin } from '../../reduxConf/slices/SignUp';

export default function Navbar() {
  let LoginData=useSelector((state)=>state.Auth.value);
  let dispatch=useDispatch()
  return (
    <>
        <div className="container-fluid m-0 bg-transparent" style={{height:"100px"}}>
            {
              LoginData.username.length!=0&&<button className='logoutClass' onClick={()=>{dispatch(removeLogin())}}>logout</button>
            }
            {
              LoginData.username.length!=0?<>
              <span className={'userClass'}>{LoginData.username}</span>
              
              </>:<Link className={'sp-button-class'} to={'/app/auth'}>Sign in</Link>
            }
            {/* <button className={'btn btn-danger'}>Sign up</button> */}
        </div>
    </>
  )
}
