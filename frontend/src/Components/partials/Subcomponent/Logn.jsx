import React, { useEffect, useState } from 'react'
import signImg from '../Auth/signin-image.jpg'
// import '../Auth/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../../reduxConf/slices/SignUp';
export default function Logn() {
    const navigate=useNavigate();
    const LoginData=useSelector((state)=>state.Auth.value);
    let dispatch=useDispatch();
    let [userData,setUserData]=useState({
        email:"",
        pass:"",
        remember:false
    })
    let[err,setErr]=useState(false);
    useEffect(()=>{
        if(err){
            alert('err')
            setErr(false);
        }  
        let localItem=localStorage.getItem('login');
        if(localItem!=null){
            if(LoginData.accessToken.length==0)
            {
                localItem=JSON.parse(localItem)
                dispatch(setLogin({accessToken:localItem.accessToken,username:localItem.username,role:localItem.role}));
            }
            navigate('/')
            
        }
     
    },[err])
    let LoginUser=async (e)=>{
        e.preventDefault();
        if(!userData.email || !userData.pass)
        {
            setErr(true);
            return;
        }
        // console.log(userData)
        let response=await axios.post(`${process.env.REACT_APP_SERVER_URL}login`,{
            userData
        })
        // console.log(response);
       
        if(response.data.error.length!=0)
        {
            let err=response.data.error[0];
            if(err=="NU58")
            {
                alert("Username dont exist")
            }else if(err=="NP58"){
                alert("password dont match")
            }
        }
        else{
            // localStorage
            // console.log(response.data.accessToken)
            const data={accessToken:response.data.result,username:response.data.username,role:response.data.role};
            localStorage.setItem('login',JSON.stringify(data));
            dispatch(setLogin(data))
            navigate('/');
            
        }
    }
    let onInputChange=(e)=>{
        const name=e.target.name.trim();
        const val=e.target.value.trim();
        setUserData((prev)=>({
            ...prev,
            [name]:val
        }))
    }
    let onChecked=(e)=>{
        const name=e.target.name.trim();
        const val=e.target.checked;
        setUserData((prev)=>({
            ...prev,
            [name]:val
        }))
    }
  return (
       
         <section className="sign-in">
        
         <div className="Spcontainer">
             <div className="signin-content">
                 <div className="signin-image">
                     <figure><img src={signImg} alt="sing up image"/></figure>
                     <Link to="/app/auth/register" className="signup-image-link">Create an account</Link>
                 </div>

                 <div className="signin-form">
                     <h2 className="form-title">Sign up</h2>
                     <form method="POST" className="register-form" id="login-form" onSubmit={LoginUser}>
                         <div className="form-group">
                             <label htmlFor="email"><i className="fa-solid fa-envelope material-icons-name"></i></label>
                             <input type="text" name="email" id="email" placeholder="Email" onChange={onInputChange}/>
                         </div>
                         <div className="form-group">
                             <label htmlFor="pass"><i className="fa-solid fa-lock material-icons-name"></i></label>
                             <input type="password" name="pass" id="pass" placeholder="Password" onChange={onInputChange}/>
                         </div>
                         <div className="form-group">
                             <input type="checkbox" name="remember" id="remember-me" className="agree-term" onChange={onChecked}/>
                             <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                         </div>
                         <div className="form-group form-button">
                             <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                         </div>
                     </form>
                     <div className="social-login">
                         <span className="social-label">Or login with</span>
                         <ul className="socials">
                             <li><Link to="#"><i className="display-flex-center zmdi zmdi-facebook fa-brands fa-facebook"></i></Link></li>
                             <li><Link to="#"><i className="display-flex-center zmdi zmdi-twitter fa-brands fa-twitter"></i></Link></li>
                             <li><Link to="#"><i className="display-flex-center zmdi zmdi-google fa-brands fa-google"></i></Link></li>
                         </ul>
                     </div>
                 </div>
             </div>
         </div>
     </section>
  )
}
