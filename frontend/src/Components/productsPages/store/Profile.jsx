import axios from 'axios';
import React, { useState } from 'react'
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom'

export default function Profile() {
    const userData=useLoaderData();
    let navigate=useNavigate()
    let [vis,setVis]=useState(false)
    console.log(userData)
    let [imagData,setImgData]=useState({
      file:null,
      uid:""
    })
    let setOnChange=(e)=>{
      // console.log(e.target.files[0])
      const val=e.target.files[0];
      setImgData(()=>({
          file:val,
          uid:userData.uid
      }))
      console.log(imagData)
    }
    let handleSave=async()=>{
      console.log(imagData)
      let formData=new FormData();
      formData.append('file',imagData.file);
      formData.append('uid',imagData.uid)
      let resp=await axios.put(`${process.env.REACT_APP_SERVER_URL}setProfileImage`,formData,{
        headers:{
          "Authorization":`token ${JSON.parse(localStorage.getItem('login')).accessToken}`,
          "Content-Type": 'multipart/form-data'
        }
      })
      if(resp.status==200)
      {
        setImgData((prev)=>({file:null,uid:''}))
        setVis((prev)=>{return false})
        navigate('/app/profile')
        
      }
      
    }
  return (
    <>
        <div className='container-fluid m-0 p-0' style={{position:'relative',top:"10vh"}}>
          
            <div className="row ">
              <div className="col-4 ">
                <div className='container-fluid ms-5 mt-5'> 
                  <img src={`${process.env.REACT_APP_SERVER_URL}productImages/${userData.image}`} className='ProfileImg ' onClick={()=>{setVis((prev)=>{return !prev})}}>
                    
                    </img>
                  {/* {vis&& */}
                    <input type='file'   onChange={setOnChange} name='file' value={''} placeholder='' className='changeProfImg'/>
                  {/* } */}
                  {imagData.uid.length!=0?
                  (<>
                    <button onClick={handleSave} className='btn btn-dark' style={{fontSize:'1.6rem',borderRadius:'5px'}}>save</button>
                    <button className='btn btn-dark' style={{fontSize:'1.6rem',borderRadius:'5px'}} onClick={()=>{
                    setImgData((prev)=>({file:null,uid:''})); 
                    
                    setVis((prev)=>{
                      return false;
                    })}}>cancel</button>
                  </>):<></>}
                  <div class="d-flex flex-column flex-shrink-0 p-3 " style={{width: "340px",height:'100%'}}>
  
                    <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <Link to="about" class="nav-link active" aria-current="page">
                        <svg class="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                        Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/order" class="nav-link link-dark">
                        <svg class="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                         My Orders
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="address" class="nav-link link-dark">
                        <svg class="bi me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
                        Addresses
                        </Link>
                    </li> */}
                   
                    
                    </ul>
                    
                  
                  </div>
  
                </div>

              </div>
              <div className="col-8 d-flex flex-column justify-content-evenly">
                <Outlet context={userData}/>
              </div>
            </div>
        </div>
    </>
  )
}
