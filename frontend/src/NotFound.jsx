import React from 'react'
import { Link, isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

export default function NotFound() {
  let error = useRouteError();
  console.log(error)
  let navigate=useNavigate();
 
  return (              
    <div className='container-fluid' style={{marginTop:'20vh'}} align="center">
        {error==undefined?<h1>Sorry Page Does Not Exist</h1>:(
          <>

            <h1 className='text-danger'>{error.data!=undefined?error.data.errorLine:"Error Not Specified"}</h1>
            <p>{error.data!=undefined?error.data.actualError:"Error Not Specified"}</p>
            <p>status {error.status||404}</p>
          </>
        )}
        <Link className='text-dark' onClick={()=>{navigate(-1)}}>Go back</Link>
    </div>
  )
}
