import React from 'react'
import Rating from './Rating'

export default function GymReviewCard({review}) {
  return (
    <>
        <div className="card mt-5 mb-5" style={{width:"100%"}}>
            <div className="row">
                <div className="col-1">
                    <img src={review.profile_photo_url!=undefined?review.profile_photo_url:''} className="card-img-top GymCardPhoto mt-3 ms-2"  alt="..." /> 
                </div>
                <div className="col-10">
                    <div className="card-body">
                        <h5 className="card-title">{review.author_name} </h5>
                        <p className='card-text'><Rating rating={review.rating}/>&nbsp;{`${review.relative_time_description}`}</p>
                        <p className="card-text" style={{fontSize:"13px"}}>{review.text}</p>
                    </div>
                </div>
            </div>
       
        
        </div>
    </>
  )
}
