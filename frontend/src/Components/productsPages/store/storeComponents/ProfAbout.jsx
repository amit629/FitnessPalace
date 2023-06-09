import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { redirect, useLoaderData, useNavigate, useOutletContext } from 'react-router-dom'
import { refreshLogin } from '../../../../reduxConf/slices/SignUp';

function EditForm({userData,setEdit}){
    const dispatch=useDispatch()
    let [formState,setFormState]=useState({
        name:userData.name,
        email:userData.email,
        uid:userData.uid,
        about:userData.about,
        mobile:userData.mobile
    })
    let navigate=useNavigate()
    let handleOnChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setFormState((prev)=>({
            ...prev,
            [name]:value
        }))
        console.log(formState)
    }
    let handleOnSave=async(e)=>{
        let resp=await axios.put(`${process.env.REACT_APP_SERVER_URL}User`,formState,{
            headers:{
                'Authorization':`token ${JSON.parse(localStorage.getItem('login')).accessToken}`
            }
        })
        console.log(resp.data)
        setEdit(()=>{
            return false;
        })
        dispatch(refreshLogin(resp.data.userData.name))
        navigate('/app/profile')
    }
    return(
        <>
            <div className='d-flex justify-content-around'>

                <div class="card" style={{width:"20vw"}}>
                    <div class="card-body">
                        <h5 class="card-title">Name</h5>
                        <input className='form-control' name='name' value={formState.name} onChange={handleOnChange}/>
                    </div>
                </div>

                <div class="card" style={{width:"40vw"}}>
                    <div class="card-body">
                        <h5 class="card-title">Email</h5>
                        <input className='form-control' name='email' value={formState.email} onChange={handleOnChange} disabled/>
                    </div>
                </div>
                </div>

                <div className='d-flex justify-content-around'>

                <div class="card" style={{width:"20vw"}}>
                    <div class="card-body">
                        <h5 class="card-title">Mobile Number</h5>
                        <input className='form-control' type='number' minLength={10} maxLength={10} name='mobile' value={formState.mobile==0?null:formState.mobile} onChange={handleOnChange} />
                    </div>
                </div>


                <div class="card" style={{width:"40vw"}}>
                    <div class="card-body">
                        <h5 class="card-title">About</h5>
                        <input className='form-control'  name='about' value={formState.about==undefined?"":formState.about} onChange={handleOnChange}/>
                    </div>
                </div>
            </div>

            <div className='ms-5'>
                <button className='btn btn-dark' style={{fontSize:'1.6rem',borderRadius:'5px'}} onClick={()=>{setEdit(()=>{return false})}}>cancel</button>
                <button className='btn btn-dark ms-3' style={{fontSize:'1.6rem',borderRadius:'5px'}} onClick={handleOnSave}>Save</button>
            </div>
        </>
    )
}


export default function ProfAbout() {
    let userData=useOutletContext();
    let [edit,setEdit]=useState(false);
    let navigate=useNavigate()
    useEffect(()=>{
        // if(edit==false)
        // {
        //     navigate('/app/profile')    
        // }
    },[])
    return (
    <>
                {
                    edit?<EditForm userData={userData} setEdit={setEdit}/>:(
                        <>
                            <button className='btn text-danger ms-5' onClick={()=>{setEdit(()=>{return true})}} style={{width:"5vw",fontSize:'2rem'}}>Edit &nbsp;<i class="fa-solid fa-pen-to-square"></i></button>
                            <div className='d-flex justify-content-around'>

                                <div class="card" style={{width:"20vw"}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Name</h5>
                                        <p class="card-text">{userData.name}</p>
                                    </div>
                                </div>

                                <div class="card" style={{width:"40vw"}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Email</h5>
                                        <p class="card-text">{userData.email}</p>
                                    </div>
                                </div>
                            </div>

                        <div className='d-flex justify-content-around'>

                                <div class="card" style={{width:"20vw"}}>
                                    <div class="card-body">
                                        <h5 class="card-title">Mobile Number</h5>
                                        <p class="card-text">{userData.mobile==0?'add mobile no':userData.mobile}</p>
                                    </div>
                                </div>
                            

                                <div class="card" style={{width:"40vw"}}>
                                    <div class="card-body">
                                        <h5 class="card-title">About</h5>
                                        <p class="card-text">{userData.about}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

                
    </>
  )
}
