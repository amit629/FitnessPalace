import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Cards({Name,height,width,imgSrc,topMargin,leftMargin,pageRoute}) {
  
  return (
    <>
        <div className="card LandingCard" style={{height:height,width:width,marginTop:topMargin,borderRadius:'30px',marginLeft:leftMargin}} >
            <img src={imgSrc} className="card-img-top card-img-top-two" alt="..." style={{borderRadius:'30px'}}/>
            <div className="card-body card-body-two ms-2">
                <Link to={`${pageRoute}`} className="sp-Landing-Card-Text ms-3" style={{textDecoration:'none'}}>{Name}</Link>
            </div>
        </div>
    </>
  )
}
