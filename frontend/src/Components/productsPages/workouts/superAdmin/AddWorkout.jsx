import React, { useEffect, useState } from 'react'
import Spinner from "../Spinner.jsx";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import legWor from '../../../../img/legg.mp4'
import arnieBoi from '../../../../img/arnold.jpg'
export default function AddWorkout() {
  useEffect(()=>{
    // if(localStorage.getItem(''))
  },[])
  let userData=useSelector(state=>state.Auth.value)
  const navigate=useNavigate()
  const [productData,setProductData]=useState({
    name:"",
    description:"",
    difficulty:"",
    force:"",
    category:"",
    grips:"",
    primary:"",
    secondary:""
  })
  let [vid,setVid]=useState(null);
  let [buttonSubmit,setButtonSubmit]=useState(false);
  let [dis,setDis]=useState(false);
  let [buttonState,setButtonState]=useState('Add Workout')
  const handleOnChange=(e)=>{
    const name=e.target.name;
    let value=e.target.value;
    if(name=="secondary")
    {
        let options=e.target.selectedOptions
        const sec = [];
        for (let i=0; i<options.length; i++) {
            sec.push(options[i].value);
        }
        value=sec;
    }       
    console.log(typeof(value))
    if(value=="")
    {
      value=e.target.innerHTML;
    }
    setProductData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  let handleVidOnChange=(e)=>{
    setVid((prev)=>{
      return e.target.files;
    })
  }
  let handleSubmit=async(e)=>{
    console.log('a')
    let proceed=true;
    for(let i of Object.keys(productData))
    {
      if(productData[i].length==0)
      {
        proceed=false;
        break;
      }
    }
    if(proceed==false || vid==null)
    {
      alert('fill all field')
    }
    else{
      if(vid.length!=2 )
      {
        alert('please select two videos')
      } 
      else{
          setButtonSubmit((prev)=>{
            return true;
          }) 
          setDis((prev)=>{
            return false;
          })
          let formData=new FormData();
          formData.append('name',productData.name)
          formData.append('description',productData.description)
          formData.append('category',productData.category)
          formData.append('force',productData.force)
          formData.append('difficulty',productData.difficulty)
          formData.append('grips',productData.grips)
          formData.append('primary',productData.primary)
          formData.append('secondary',productData.secondary)
          for (let key of Object.keys(vid)) {
            formData.append('file',vid[key]);                   
          } 
          
          try{
            let resp=await axios.post(`${process.env.REACT_APP_SERVER_URL}addWorkouts`,formData,{
              headers:{
                'Authorization': `token ${userData.accessToken}`,
                'content-type': 'multipart/form-data'                                           
              }
            })
            console.log(productData,vid)
            setButtonSubmit((prev)=>{
              return false;
            })  
            if(resp.data.err!=undefined || resp.status!=200)
            {
                console.log(resp.data.data);
                setButtonState((prev)=>{
                  return "❌"
                })
            }
            else{
                setButtonState((prev)=>{
                  return "✔"
                })
            } 
          }   
          catch(e)
          {
            setButtonSubmit((prev)=>{
              return false;
            })
              if(e)
              {
                alert('sever error')
              }
              setButtonState((prev)=>{
                return "❌"
              })
          }
          
          setTimeout(()=>{
            setButtonState((prev)=>{
              return 'Add Workout'
            })
            setDis((prev)=>{
              return false;
            })
            navigate('/app/workouts/addWorkout')
          },1000)
      }
    } 
    
  }
  return (
    <>
      <div className="container-fluid spConWorkout "  style={{backgroundColor:'rgba(0,0,10,0.9)'}} >
          <div className="row">
              <div className="col-6 p-0">
                <img src={arnieBoi} className='AddPageImageStyle' alt="arnie boi hai hamare yaha" style={{position:'fixed',marginTop:'0px'}}/>
                {/* <video src={legWor}  style={{height:"90vh",width:"50vw",objectFit:'fill',position:'fixed'}} controls={false} muted={true} autoPlay={true} loop={true}></video> */}
              </div>
              <div className="col-6 pb-5 pt-2" align="center">
                <div class="m-5 mb-2">
                    <input type="text" placeholder="name" name="name" class="form-control inp spInpLog" onChange={handleOnChange}  required/>
                </div>
                <div class="m-5 mb-2">
                    <textarea name="description" placeholder='Description , use || for multiple' id="" className='form-control inp spTextARLog' onChange={handleOnChange} rows="5"></textarea>
                </div>
                <div class="m-5 mb-2">
                    <input type="file" className='form-control inp spInpLog' min={2} max={3} accept="video/mp4,video/x-m4v,video/*" onChange={handleVidOnChange} name='workVid' multiple/>
                </div>
                <div class="m-5 mb-2">
                    <select name="difficulty" id="" class="form-control inp spSel" onChange={handleOnChange} required>
                        <option value="">please select Difficulty</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        
                    </select>
                </div>
                
                <div class="m-5 mb-2">
                  <select name="force" id="" class="form-control inp spSel" onChange={handleOnChange} required>
                        <option value="">please select Force type</option>
                        <option value="push">Push</option>
                        <option value="pull">Pull</option>
                        
                    </select>
                </div>
                <div class="m-5 mb-2">
                <select name="category" id="" class="form-control inp spSel" onChange={handleOnChange} required>
                      <option value="">please select Category</option>
                      <option value="Barbell">Barbells</option>
                      <option value="Cables">Cables Grip</option>
                      <option value="BodyWeight">Body Weight</option>
                      <option value="Dumbbells">Dumbells</option>
                      <option value="Band">Band</option>
                      <option value="Plate">Plate</option>
                  </select>
                </div>
                <div class="m-5 mb-2">
                  <select name="grips" id="" class="form-control inp spSel" onChange={handleOnChange} required>
                      <option value="">please select Grip</option>
                      <option value="Pronated">Pronated Grip</option>
                      <option value="Supinated">Supinated Grip</option>
                      <option value="Mixed">Mixed Grip</option>
                      <option value="Neutral">Neutral Grip</option>
                      <option value="Hook">Hook Grip</option>
                  </select>
              </div>
              <div class="m-5 mb-2">
                  <select name="primary" id="" class="form-control inp spSel" onChange={handleOnChange} required>
                        <option value="">please select Primary Muscles</option>
                        <option value="Traps">Traps</option>
                        <option value="Shoulders">Shoulders</option>
                        <option value="Chest">Chest</option>
                        <option value="Biceps">Biceps</option>
                        <option value="Forearms">Forearms</option>
                        <option value="Quads">Quads</option>
                        <option value="Triceps">Triceps</option>
                        <option value="Lats">Lats</option>
                        <option value="Middle Back">Middle Back</option>
                        <option value="Lower Back">Lower Back</option>
                            <option value="Glutes">Glutes</option>
                            <option value="Hamstrings">Hamstrings</option>
                            <option value="Calves">Calves</option>
                            <option value="Abdominals">Abs</option>
                            <option value="Obliques">Obliques</option>
                        </select>
                    </div>
                    <div class="m-5 mb-2">
                      <select  name="secondary" id="" class="form-control inp spSel" multiple={true} placeholder='select secondary muscle' onChange={handleOnChange} required>
                            {/* <option value="">please select Secondary Muscles</option> */}
                            <option  value="Traps">Traps</option>
                            <option value="Shoulders">Shoulders</option>
                            <option value="Chest">Chest</option>
                            <option value="Biceps">Biceps</option>
                            <option value="Forearms">Forearms</option>
                            <option value="Quads">Quads</option>
                            <option value="Triceps">Triceps</option>
                            <option value="Lats">Lats</option>
                            <option value="Middle Back">Middle Back</option>
                            <option value="Lower Back">Lower Back</option>
                            <option value="Glutes">Glutes</option>
                            <option value="Hamstrings">Hamstrings</option>
                            <option value="Calves">Calves</option>
                            
                        </select>
                    </div>

                    <button type="submit" class="buttonC" onClick={handleSubmit} disabled={dis}>{buttonSubmit==true?<Spinner/>:buttonState} </button>
              </div>
          </div>
      </div>
    </>
  )
}
