import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, redirect, useNavigate } from 'react-router-dom'
import { getProductAsync } from '../../../../reduxConf/slices/Products';
import SpinnerAnim from '../SpinnerAnim';
import Sidebar from './Sidebar';
import Footer from './Footer';


export default function Store() {
  let proData=useSelector((state)=>state.userProduct.value);
  let CartData=useSelector((state)=>state.UserCartData.value);
  let dispatch=useDispatch()
  const navigate=useNavigate();
  useEffect(()=>{
      if(proData.length==0)
      {
        dispatch(getProductAsync())
      }
  },[])

  // if(proData.length==0)
  // {
  //   return <SpinnerAnim/>
  // }
  
  return (
    <>
        <div className="container-fluid storeSection m-0 p-0 "style={{width:"100vw"}} id='str'>
            <div className="row">
              <div className="col-3">
                {/* <Sidebar sideBarRoutes={[]} type={'Filter'}/> */}
              </div>
              <div className="col-9">
                  <div className="container-fluid">
                    <div className="row storeCardsrow">
                    {proData.length==0?<h1>Sorry nothing to show</h1>:(
                      proData.map(ele=>{
                        console.log(ele)
                        return(
                          <>
                          <div className="col-4">
                            <div className="card productcards bg-light"  onClick={()=>{navigate(`/app/product/${ele._id}`)}}>
                                  <img src={`${process.env.REACT_APP_SERVER_URL}productImages/${ele.image.fileName}`} className="card-img-top imageStyle" alt="..."/>
                                  <div className="card-body" align="left">
                                      <h5 className="card-title">{ele.name.slice(0,40)}</h5>
                                      <p className="card-text">Rs {ele.price}</p>
                                      {/* <a href="/app/store/product/<%=ele.pid%>" className="btn btn-primary">btn</a> */}
                                  </div>
                                  {/* <div>
                                    <Link className='ButtonAddCart'>Add to Cart</Link>
                                  </div> */}
                              </div>
                            </div>
                          </>
                        )
                      }))
                  }  
                      

                      
                    </div>
                  </div>
              </div>  
            </div>
        </div>
        {/* <footer className='FooterPosition'>
        <Footer/>
      </footer> */}
    </>
  )
}
