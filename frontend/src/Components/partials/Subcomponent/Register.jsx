import React, { useEffect, useState } from 'react'
import signImg from '../Auth/signup-image.jpg'
// import '../Auth/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../../reduxConf/slices/SignUp'
export default function Register() {
    const LoginData=useSelector((state)=>state.Auth.value);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    let [userData,setUserData]=useState({
        name:"",
        email:"",
        pass:"",
        re_pass:"",
        userRole:""
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
                dispatch(setLogin({accessToken:localItem.accessToken,username:localItem.username}));
            }
            navigate('/')
            
        }
    },[err])
    // let [err,setErr]=useState({
    //     name:[],
    //     email:[],
    //     password:[],
    //     repeat:[]
    // });
    // let onInputFocus=()=>{

    // }
    let RegUser=async (e)=>{
        e.preventDefault();
        if(!userData.name || !userData.email || !userData.pass)
        {
            setErr(true);
            return;
        }
        let response=await axios.post(`${process.env.REACT_APP_SERVER_URL}register`,{
            userData
        })
        console.log(response);
       
        if(response.status==200)
        {
            if(response.data.errors.length!=0)
            {
                alert(response.data.errors[0]);
            }
            else{
                alert('you are registered sucessfully')
                setTimeout(()=>{
                    navigate('/app/auth')
                },1000)   
            }
        }
        else{
            alert('server Error');
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
    
  return (
    <section className="signup">
    <div className="Spcontainer">
        <div className="signup-content">
            <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="register-form" onSubmit={RegUser}>
                    <div className="form-group">
                        <label htmlFor="name"><i className="fa-solid fa-user material-icons-name"></i></label>
                        <input type="text" name="name" id="name" placeholder="Your Name"  onChange={onInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"><i className="fa-solid fa-envelope material-icons-name"></i></label>
                        <input type="email" name="email" id="email" placeholder="Your Email"  onChange={onInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass"><i className="fa-solid fa-lock material-icons-name"></i></label>
                        <input type="password" name="pass" id="pass" placeholder="Password"  onChange={onInputChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="re-pass"><i className="fa-solid fa-unlock material-icons-name"></i></label>
                        <input type="text" name="re_pass" id="re_pass" placeholder="Repeat your password"  onChange={onInputChange}/>
                    </div>
                    <div class="form-group-two">
                        <label for="#passwo" className='text-dark '>Buyer</label>
                        <input id="passwo"  className='passwod' type="radio"  name="userRole" value="buyer" required onChange={onInputChange}/>
                    </div>
                    <div class="form-group-two">
                        <label for="#passwo" className=''>Seller</label>
                        <input id="passwo" className='passwod' type="radio" name="userRole" value="seller" required onChange={onInputChange}/>
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                    </div>
                </form>
            </div>
            <div className="signup-image">
                <figure><img src={signImg} alt="sing up image"/></figure>
                <Link to="/app/auth" className="signup-image-link">I am already member</Link>
            </div>
        </div>
    </div>
</section>
  )
}
