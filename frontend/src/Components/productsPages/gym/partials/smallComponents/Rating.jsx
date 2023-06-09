import React from 'react'

export default function Rating({rating}) {
  let rat=rating || 0;
  rat=Math.floor(rat)
  let arr=[];
  for(var i=1;i<=rat;i++)
  {
    arr.push(1);
  }

  let lp=rat==0?5:5-rat;
  for(var i=1;i<=lp;i++)
  {
    arr.push(0);
  }
  return (
    <>
        {
              arr.map((ele,ind)=>{
                if(ele==1)
                {
                  return <span className="fa fa-star checked ms-1" key={ind}></span>
                }
                else if(ele==0){
                  return <span className="fa fa-star ms-1" key={ind}></span>
                }
              })
              
            }
    </>
  )
}
