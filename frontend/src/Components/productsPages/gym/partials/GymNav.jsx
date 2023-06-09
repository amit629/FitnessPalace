import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

export default function GymNav() {
  let userData=useSelector((state)=>state.Auth.value);
    const dispatch=useDispatch()
    const navigate=useNavigate();
    let [userName,setUserName]=useState(false);
    // useEffect(()=>{
    //   if(!userData || localStorage.getItem('login')==null)
    //   {
    //     navigate('/app')
    //   }
    // },[])
  return (
    <>
          <header class="header bg-dark p-0" data-header style={{height:"90px"}} onMouseLeave={()=>{setUserName((prev)=>{return false})}}>
            <div class="spCon mt-4" style={{margin:'none',backgroundColor:'black'}}>
    
              <Link to="/" class="logo">
                <ion-icon name="barbell-sharp" aria-hidden="true"></ion-icon>
    
                <span class="span">FITNESS PALACE</span>
              </Link>
    
              <nav class="navbar m-0 p-0 " data-navbar >
    
                  <button class="nav-close-btt" aria-label="close menu" data-nav-toggler>
                    <ion-icon name="close-sharp" aria-hidden="true"></ion-icon>
                  </button>
      
                  <ul class="navbar-list " style={{position:'absolute',left:'25vw',top:'30px'}}>
                        <li className="nav-item">
                          <Link className="navbar-link fs-3" aria-current="page" to="/app/nearByGym">Home</Link>
                        </li>
                  </ul>
      
                </nav>
                <ul className="navbar-list">
                    {
                      userData.username.length!=0?(<>
                          <li className="nav-item ">
                            <button class="nav-link text-white spcss" onMouseEnter={()=>{setUserName((prev)=>{return true})}}>
                              {userData.username}
                            </button>
                            
                          </li>
                          <ul class={`hoverLog bg-dark list-group ${userName==false?'d-none':''}`} >
                            <li className='list-group-item '>
                              <Link style={{textDecoration:'none',color:'black'}} to={'/app/profile'} className='Profile'>Profile</Link>
                            </li>  
                            <li className='list-group-item '>
                            <Link style={{textDecoration:'none',color:'black'}} to={'/app/auth/logout'}>logout</Link>
                            </li> 
                            
                        </ul>
                          
                        
                      </>):(<>
                        <li className="nav-item">
                          <Link className="nav-link active navButt  btt btt-secondary" aria-current="page" to="/app/auth">Login</Link>
                        </li>
                        <li className="nav-item ms-2">
                          <Link className="nav-link active navButt  btt btt-secondary" aria-current="page" to="/app/auth/register">Register</Link>
                        </li>
                      </>)
                    
                    }
                    
                    </ul>
                
      
                
      
              </div>
        
            </header>
    </>
  )
}
