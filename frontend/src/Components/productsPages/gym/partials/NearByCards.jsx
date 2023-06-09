import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './smallComponents/Rating'

export default function NearByCards({data}) {
  
  return (
    <>
      {/* {console.log(data)} */}
        <div className="card p-0" style={{width: "100%",height:"25vh"}}>
        {/* <img src={data.icon} className="card-img-top" alt="..."/> */}
        <div className="card-body d-flex justify-content-between pe-0 ">
          <div className='d-flex flex-column justify-content-around'>
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">{data.vicinity}</p>
            <div className='d-flex'>
              <Rating rating={data.rating}/>
            <span className='ms-2'>{`(${data.user_ratings_total||0})`}</span>
            </div>
            
          </div>
          <div className='d-flex flex-column justify-content-center'>
            <Link to={`gymLocation/${data.place_id}`} className="btn btn-primary" style={{width:"150px"}}>show More</Link>
          </div>
        </div>
      </div>
    </>
  )
}
