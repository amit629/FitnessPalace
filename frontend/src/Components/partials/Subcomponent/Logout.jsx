import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeLogin } from '../../../reduxConf/slices/SignUp'

export default function Logout() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(removeLogin());
        navigate(-1)
    },[])
  return (
    <div>
        bye
    </div>
  )
}
