import React from 'react'
import { useLoaderData } from 'react-router-dom'
import DummyBody from './DummyBody';

export default function WorkoutsLan() {

  return (
    <div className='container-fluid' >
        <div className="row">
            <div className="col"></div>
            <div className="col-4">
                <DummyBody type="front"/>
            </div>
            <div className="col-5"> 
                <DummyBody type="back"/>
            </div>
            <div className="col"></div>
        </div>
    </div>
  )
}
