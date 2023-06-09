import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataAsync, getMoreGymDataAsync } from '../../../../reduxConf/slices/NearyGym';
import NearByCards from './NearByCards';
import AllGymMaps from './AllGymMaps';
import SpinnerAnim from './smallComponents/SpinnerAnim';

export default function NearbyPlaces() {
  const dispatch=useDispatch();
  const dataFetchedRef = useRef(false);
  // const dataFetchedRef = useRef(false);
  useEffect(()=>{
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      // console.log(gymData)
    if(gymData.length==0)
    {
      dispatch(getDataAsync());
    }
    
  },[])
  let gymData=useSelector((state)=>state.nearbygymdata.value);
  gymData = gymData.slice().sort((a, b) => b.rating/b.user_ratings_total||0 - a.rating/a.user_ratings_total||0)
  

  // gymData.sort((a,b)=>{
  //   return a.rating-b.rating
  // })
  // console.log(gymData[0])
  let moreDataFun=()=>{
    dispatch(getMoreGymDataAsync())
  }
  return (
    <>
      
      {gymData.length!=0?<div className="container-fluid me-0 pe-0">
        
        <div className="row">
          
          <div className="col-4 nearByCardsSpecialClass p-5 ps-0 pe-0">
            <h1 className='ms-5 mt-4'>Near By Gyms</h1>
            <hr className='lineSpecial'/>
            {
            gymData.length!=0?
                <div >
                
                  {
                    gymData.map((ele,ind)=>{
                      
                        return <>
                          <NearByCards data={ele} key={ind}/>
                        </>
                        

                    })
                  }
                <button className='btn btn-secondary' onClick={moreDataFun}>Get More Gym</button>
              </div>
              :<h1>loading...</h1>
          }
              
            
          </div>
          <div className="col-8 ps-0">
            {gymData.length!=0?<><AllGymMaps placeData={gymData}/></>:<h1></h1>}
            
          </div>
        </div>

      
    </div>:<SpinnerAnim/>}
    </>
  )
}
