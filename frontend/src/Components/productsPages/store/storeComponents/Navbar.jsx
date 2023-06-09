import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeLogin } from '../../../../reduxConf/slices/SignUp';
import '../css/Navbar.css'

export default function Navbar() {
  let userData=useSelector((state)=>state.Auth.value);
  const dispatch=useDispatch()
  const navigate=useNavigate();
  let [userName,setUserName]=useState(false);
  useEffect(()=>{
    if(!userData || localStorage.getItem('login')==null)
    {
      navigate('/app')
    }
  },[])
  // let logout=(e)=>{
  //   dispatch(removeLogin())
  //   console.log('h1')
  //   // navigate('/app/store')
  // }
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
                    <Link className="navbar-link fs-3" aria-current="page" to="/app">Home</Link>
                  </li>
                  {
                    (userData.role=="seller" || userData.role=='admin')&&(<>
                        <li className="nav-item">
                        <Link className="navbar-link fs-3" aria-current="page" to="/app/admin">Add Products</Link>
                        </li> 
                        <li className="nav-item">
                          <Link className="navbar-link fs-3" aria-current="page" to="/app/admin/adminProducts">My Products</Link>
                        </li>
                    </>
                    )
                  }
              


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
                        <Link style={{textDecoration:'none',color:'black'}} className='MyOrders' to={'/app/order'}>My Orders</Link>
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
              <li className="nav-item">
                    <Link className="nav-link active ms-2 spLink" aria-current="page" to="/app/cart"><i class="fa-sharp fa-solid fa-cart-shopping " style={{color: "white",fontSize:"1.5rem"}}></i></Link>
              </li>
              </ul>
          

          {/* <a href="#" class="btt btt-secondary">SIGN IN</a> */}

          {/* <button class="nav-open-btt" aria-label="open menu" data-nav-toggler>
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </button> */}

        </div>
      </header>
      {/* <section>
            <div id="container">
                <div id="shopName"><Link to={'/'}> <b>Fitness</b>Palace </Link></div>
                    
                    <div id="collection">
                        <div id="clothing"><a href="clothing.html"> CLOTHING </a></div>
                        <div id="accessories"><a href="accessories.html"> ACCESSORIES </a></div>
                        
                    </div>
                    
                    <div id="search">
                        <i class="fas fa-search search"></i>
                        <input type="text" id="input" name="searchBox" placeholder="Search for Clothing and Accessories" />
                    </div>
                    {
                      userData.username.length!=0?(<>
                        <div id="user">
                          <Link to="cart.html"> <i class="fas fa-shopping-cart addedToCart"><div id="badge"> 0 </div></i></Link>
                          <Link to="#"> <i class="fas fa-user-circle userIcon"></i> </Link>
                          <Link style={{textDecoration:'none',color:'black'}} to={'/app/auth/logout'}>logout</Link>
                        </div>
                      </>):(<>
                        <div id="user">
                        <Link className="nav-link active btt btt-secondary text-white" aria-current="page" to="/app/auth">Login</Link>
                        <Link className="nav-link active btt btt-secondary text-white" aria-current="page" to="/app/auth/register">Register</Link>
                      </div>
                      </>)
                    }
                    
            </div>

        </section> */}
        {/* <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark" style={{height:'70px',position:'fixed',width:'100%',zIndex:10}} onMouseLeave={()=>{setUserName((prev)=>{return false})}}>
          <div className="container-fluid">
            <Link className="navbar-brand" to='/'>Fitness Palace</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/app">Home</Link>
                </li>
                {
                  userData.role=="seller"&&(<>
                      <li className="nav-item">
                       <Link className="nav-link active" aria-current="page" to="/app/admin">Add Products</Link>
                      </li> 
                      <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/app/admin/adminProducts">My Products</Link>
                      </li>
                  </>
                  )
                }
              </ul>



              <ul className="navbar-nav me-5">
              {
                userData.username.length!=0?(<>
                    <li className="nav-item ">
                      <button class="nav-link text-white " onMouseEnter={()=>{setUserName((prev)=>{return true})}}>
                        {userData.username}
                      </button>
                      
                    </li>
                    <ul class={`hoverLog list-group ${userName==false?'d-none':''}`} >
                      <li className='list-group-item '>
                        <Link style={{textDecoration:'none',color:'white'}} to={'/app/profile'} className='Profile'>Profile</Link>
                      </li>  
                      <li className='list-group-item '>
                        <Link style={{textDecoration:'none',color:'white'}} className='MyOrders'>My Orders</Link>
                      </li> 
                      <li className='list-group-item ' >
                        
                      </li>
                  </ul>
                    
                  
                </>):(<>
                  <li className="nav-item">
                    <Link className="nav-link active btt btt-secondary text-white" aria-current="page" to="/app/auth">Login</Link>
                  </li>
                  <li className="nav-item ms-2">
                    <Link className="nav-link active btt btt-secondary text-white" aria-current="page" to="/app/auth/register">Register</Link>
                  </li>
                </>)
              
              }
              <li className="nav-item">
                    <Link className="nav-link active ms-2" aria-current="page" to="/app/cart"><i class="fa-sharp fa-solid fa-cart-shopping" style={{color: "white",fontSize:"1.5rem"}}></i></Link>
              </li>
              </ul>
            </div>
          </div>
        </nav> */}
    </>
  )
}
