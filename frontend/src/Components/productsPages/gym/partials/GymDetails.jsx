import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useGeolocated } from "react-geolocated";
import Maps from './Maps';
import { useSelector } from 'react-redux';
import GymReviewCard from './smallComponents/GymReviewCard';
import AboutGymCards from './smallComponents/AboutGymCards';

export default function GymDetails() {
    const gymdata=useLoaderData();
  return (
    
    <>
        {console.log(gymdata)}
          <div className="container-fluid" style={{marginTop:'4.1vh'}} >
              <div className="row" style={{overflow:'hidden'}}>
                  <div className="col-5  aboutGymContainer" style={{padding:'30px'}}>
                      <AboutGymCards data={gymdata}/>
                  </div>         
                  <div className="col-7 ">
                    <div className="row">
                        <Maps placeData={gymdata} />
                    </div>
                    {/* <div className="row">
                      <div className="col rm-scroll" style={{height:'40vh',overflow:'auto'}}>
                        {
                          (gymdata.reviews==undefined || !gymdata.reviews)?<>
                            <h2>No reviews</h2>
                          </>:<>
                          {
                              gymdata.reviews.map((ele,ind)=>{
                                  return <GymReviewCard review={ele} key={ind}/>
                              })
                            }
                          </>
                        }
                      </div>
                    </div> */}
                  </div>
              </div>  
          </div>


        {/* <div className="container-fluid mt-5" style={{marginTop:'60px'}}> 
          <div className="row">
            <div className="col-5 aboutGymContainer">
                <AboutGymCards data={gymdata}/>
            </div>         
            <div className="col-7 ">
              <div className="row">
                  <Maps placeData={gymdata} />
              </div>
              <div className="row">
                <div className="col rm-scroll" style={{height:'40vh',overflow:'auto'}}>
                  {
                    (gymdata.reviews==undefined || !gymdata.reviews)?<>
                      <h2>No reviews</h2>
                    </>:<>
                    {
                        gymdata.reviews.map((ele,ind)=>{
                            return <GymReviewCard review={ele} key={ind}/>
                        })
                      }
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div> */}
    </>
  )
}
