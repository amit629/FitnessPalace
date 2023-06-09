import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../../../reduxConf/slices/Products';
import Spinner from '../../workouts/Spinner';
import arniBoi from '../../../../img/arnold.jpg'

export default function AddProducts() {
  const navigate=useNavigate()
  let userData=useSelector(state=>state.Auth.value)
  const dispatch=useDispatch()
  let [buttonSubmit,setButtonSubmit]=useState(false);
  let [dis,setDis]=useState(false);
  let [buttonState,setButtonState]=useState('Add Workout')
  const [productData,setProductData]=useState({
    name:"",
    price:"",
    desc:"",
    sel:"",
  })
  let [img,setImg]=useState(null);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(img);
    // let file=document.getElementById(img)
    // console.log(file)
    let formData=new FormData();
    formData.append('name',productData.name);
    formData.append('price',productData.price);
    formData.append('description',productData.desc);
    formData.append('category',productData.sel);
    formData.append('filename',img.fileData)
    formData.append('file',img.selFile);
    const resp=await axios.post(`${process.env.REACT_APP_SERVER_URL}admin/addProducts`,formData,{
      headers: {
        'Authorization': `token ${userData.accessToken}`,
        'content-type': 'multipart/form-data'
      },
      
    })
    // let resp=userData;
    
    console.log(resp);
    dispatch(addProduct(resp.data.data));
    setTimeout(()=>{
        navigate('/app')
    },2000)
  }
  const handleOnChange=(e)=>{
    const name=e.target.name;
    let value=e.target.value;
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
  const handleImage=(e)=>{
    // const name=e.target.name;
    const val=e.target.files[0];
    const val2=e.target.value;
    setImg({
      selFile:val,
      fileData:val2
    })
  }
  return (
    <>
      <div className="container-fluid containerAddPro" style={{backgroundColor:'rgba(0,0,10,0.9)'}}>
        <div className="row">
          <div className="col-6 p-0">
              <img src={arniBoi} className='AddPageImageStyle' alt="arnie boi hai idhar" />
          </div>
          <div className="col-6" align="center">
              <form action="/admin/AddProducts" method="post" enctype="multipart/form-data" class="adminForm" onSubmit={handleSubmit}>
                <div class="m-5 mb-2">
                    <input type="text" placeholder="name" name="name" class="form-control inp spInpLog" onChange={handleOnChange} required/>
                </div>
                <div class="m-5 mb-2">
                    <input type="number" placeholder="price" name="price" class="form-control inp spInpLog" onChange={handleOnChange} required/>
                </div>
                <div class="m-5 mb-2">
                    <textarea type="text" placeholder="description use || for multiple" name="desc" onChange={handleOnChange} class="form-control inp spTextARLog" rows="6" required></textarea>
                </div>
                <div class="m-5 mb-2">
                    <input type="file" name="img" id='img' class="form-control inp spInpLog" onChange={handleImage} required/>
                </div>
                <div class="m-5 mb-2">
                    <select name="sel" id="" class="form-control inp  spSel" onChange={handleOnChange} required>
                        <option value="">please select from list</option>
                        <option value="protiens">protien</option>
                        <option value="gainers">gainer</option>
                        <option value="vitamins">vitamin</option>
                        <option value="fitness">fitness</option>
                        <option value="powder">powder</option>
                        <option value="steroids">steroids</option>
                    </select>
                </div>
                <button type="submit" class="buttonC" style={{width:'250px'}} onClick={handleSubmit} disabled={dis}>{buttonSubmit==true?<Spinner/>:buttonState} </button>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}
