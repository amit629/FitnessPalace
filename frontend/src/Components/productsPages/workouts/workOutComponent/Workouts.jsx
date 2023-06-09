import React from 'react'
import { useLoaderData, useOutletContext } from 'react-router-dom'

export default function Workouts() {
    let workouts=useLoaderData();
    let userData=useOutletContext();
    console.log(userData)
    console.log(workouts)
  return (
    <>
        <div className="container-fluid p-5 " >

            {
                workouts.map((ele,ind)=>{
                    return(
                        <>
                            <div className="container-fluid " style={{marginTop:`${ind==0?'20px':'40px'}`,border:'2px solid black',width:'90vw'}}>
                                <div className="row ">
                                    {/* <div className="col"></div> */}
                                    <div className="col-6 p-5">
                                        <h2 className='text-dark d-flex'>{ele.name}</h2>
                                        <hr  style={{width:'100%',borderTop:'2px solid black',position:'relative',left:'30px'}}/>
                                        <span className='text-dark' style={{fontSize:'1.5rem'}}><b>Difficulty</b>:&nbsp;{ele.difficulty}</span>
                                        <div className='workoutAlign'>
                                            <ol type="1" >
                                                {
                                                    ele.description.map((des,ind)=>{
                                                        return(
                                                            <>
                                                                <li style={{display:'list-item'}}>{ind+1})&nbsp;{des}</li>  
                                                                <br />
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ol>                                                                               
                                        </div>
                                        {
                                            (userData.role!='undefined'&&userData.role=="admin")?
                                            (
                                                <div className='adminControls'>
                                                    <button className='btn btn-primary'>Edit</button>
                                                    <button className='btn btn-danger'>Delete</button>
                                                </div>
                                            ):<></>
                                        }
                                    </div>
                                    <div className="col" style={{borderRight:'3px solid black'}}></div>
                                    <div className="col-5 p-5">
                                        {
                                            ele.video.map((vid,ind)=>{
                                                return(
                                                    <>
                                                        <video src={`${process.env.REACT_APP_SERVER_URL}video/${vid.fileName}`} style={{height:'310px',width:'100%',objectFit:'fill'}}  autoPlay={true} loop muted></video>                             
                                                    </>
                                                )
                                            })
                                        }   
                                    </div>
                                    {/* <div className="col"></div> */}
                                </div>
                            </div>      
                        </>
                    )
                })
            }
            
            {/* {
                workouts.map((ele)=>{
                    return(
                        <>
                            <h1 align="left">{ele.name}</h1>
                            <div className="row">
                                {
                                    ele.video.map((vid,ind)=>{
                                        return(
                                            <>
                                                <div className="col-6" key={ind}>
                                                    <video src={`${process.env.REACT_APP_SERVER_URL}video/${vid.fileName}`} style={{height:'360px',width:'640px'}}  autoPlay={true} loop muted></video> 
                                                </div>                                  
                                            </>
                                        )
                                    })
                                }  
                            </div>  
                            <div className="row">
                                <h1 className='ms-3 mt-4 mb-2' align="left">Instruction</h1>
                            </div>
                            <div className="row " align="left " style={{height:'25vh'}}>
                                {
                                    ele.description.map((des,ind)=>{
                                      return(
                                        <div className='d-flex' style={{position:'relative',left:'5vw'}}>
                                            <span className='' style={{fontSize:'2rem',display:'inline-block'}}>{ind+1}</span>
                                             <h3 className='mt-3' key={ind}> &emsp;{des}</h3>
                                        </div>
                                      )
                                    })
                                }
                            </div>
                            
                        </>
                    )
                })
            } */}
        </div>
    </>
  )
}
