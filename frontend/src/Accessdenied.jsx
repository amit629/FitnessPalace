import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Accessdenied() {
    const navigate=useNavigate();
    useEffect(()=>{

            navigate('/app/auth')
        
    },[])
  return (
    <div>
        Accessdenied,you will be redirected
    </div>
  )
}
