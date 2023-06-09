import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import SpinnerAnim from '../../gym/partials/smallComponents/SpinnerAnim';
import { getProductAsync } from '../../../../reduxConf/slices/Products';

export default function EditProduct() {
    let serverResp=useLoaderData();
    const userData=useSelector((state)=>state.Auth.value)
    const dispatch=useDispatch()
    useEffect(()=>{
        if(serverResp.data.err.length!==0)
        {
            return navigate('/app')
        }
    },[])
    let data=serverResp.data;    
    let navigate=useNavigate();
    if(data)
    {
        data=data.productData
    }
    // console.log(data)
   if(!data)
   {
        data={
            name:"",
            price:"",
            description:"",
            sel:""
        }
   }
    const [productData,setProductData]=useState({
        name:data.name,
        price:data.price,
        desc:data.description,
        sel:data.category,
    })
    let [img,setImg]=useState({
    selFile:null,
    fileData:null
    });
      const handleSubmit=async(e)=>{
        e.preventDefault();
        // console.log(productData,img);
        let formData=new FormData();
        formData.append('name',productData.name);
        formData.append('price',productData.price);
        formData.append('description',productData.desc);
        formData.append('category',productData.sel);
        formData.append('filename',img.fileData)
        formData.append('file',img.selFile);
        const resp=await axios.put(`${process.env.REACT_APP_SERVER_URL}admin/MyProducts/${data.pid}/edit`,formData,{
          headers: {
            'Authorization': `token ${userData.accessToken}`,
            'content-type': 'multipart/form-data'
          },
          
        })
        // let resp=userData;
        if(resp.status==201)
        {
          dispatch(getProductAsync())
          navigate('/app/admin/adminProducts')
        }
        console.log(resp.data.data);
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
            {serverResp.data.err.length==0?(<form action="/admin/AddProducts" method="post" enctype="multipart/form-data" align="center" class="adminForm" onSubmit={handleSubmit}>
                <div class="m-5 mb-2">
                    <input type="text" placeholder="name" name="name" class="form-control inp" value={productData.name}  onChange={handleOnChange}  required/>
                </div>
                <div class="m-5 mb-2">
                    <input type="number" placeholder="price" name="price" class="form-control inp" value={productData.price}  onChange={handleOnChange}  required/>
                </div>
                <div class="m-5 mb-2">
                    <textarea type="text" placeholder="description use || for multiple" name="desc" onChange={handleOnChange} class="form-control inp" rows="6" required>{data.description}</textarea>
                </div>
                <div class="m-5 mb-2">
                    <input type="file" name="img" id='img' class="form-control inp" onChange={handleImage} />
                </div>
                <div class="m-5 mb-2">
                    <select name="sel" id="" class="form-control inp" value={productData.sel} onChange={handleOnChange} required>
                    <option value="">please select from list</option>
                    <option value="protiens">protien</option>
                    <option value="gainers">gainer</option>
                    <option value="vitamins">vitamin</option>
                    <option value="fitness">fitness</option>
                    <option value="powder">powder</option>
                    <option value="steroids">steroids</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mb-3 ">Add Pro</button>
            </form>):(
                <div>
                    {
                        navigate('/app')
                    }
                    err
                </div>
            )
}
    </>
  )
}
