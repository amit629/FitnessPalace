import React from 'react'
import './css/Spinner.css'

export default function SpinnerAnim() {
  return (
    <>
        <div className="container-fluid d-flex justify-content-center align-items-center spinnerBack" >
            <div className="loader">Loading...</div>
        </div>
    </>
  )
}