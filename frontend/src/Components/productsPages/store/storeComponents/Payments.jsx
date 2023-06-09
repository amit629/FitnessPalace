import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import CheckOutForm from "./CheckOutForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SpinnerAnim from "../SpinnerAnim";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.


export default function Payments() {
  let orderData=useSelector((state)=>state.orderData.value)
  let navigate=useNavigate();
  const [stripePromise,setStripePromise]=useState(null);
  const [clientSecret, setClientSecret] = useState("");
  let [intent,setIntent]=useState({})
  let [orderState,setOrderState]=useState({})
  const userData=useSelector((state)=>state.Auth.value)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if(!orderData.address.shippingAddress || !orderData.address.billingAddress || orderData.Products.length==0 || orderData.total==0)
    {
        navigate('/app')
    }
    fetch(`${process.env.REACT_APP_SERVER_URL}config`,{
        headers:{
            'Authorization':`token ${userData.accessToken}`
        }
    }).then(async(r)=>{
        const {publishableKey}=await r.json()
        console.log(publishableKey)
        setStripePromise(loadStripe(publishableKey));
    })
    
  }, []);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_SERVER_URL}create-payment-intent`, {
        method: "POST",
        headers: { 
          'Authorization':`token ${userData.accessToken}`,
         "Content-Type": "application/json"  
        },
        body: JSON.stringify({
            items:orderData.Products,
            address:{
                    billingAddress:orderData.address.billingAddress,
                    shippingAddress:orderData.address.shippingAddress 
            },
            total:orderData.total
        }),
      })
        .then(async(r) =>{
          if(r.ok)
          {
            const rt=await r.json();
            console.log(rt);
            setClientSecret(rt.clientSecret)
            setIntent(rt.data);
            setOrderState(rt.orderData);
          }
          else{
            return Promise.reject(r);
          }
            
        } ).catch((err)=>{
            console.log(err);
        })

    
  },[])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  if(!clientSecret || !stripePromise)
  {
    return <SpinnerAnim/>
  }
  return (
    <div className="container-fluid" style={{position:'relative',top:'150px',left:'400px'}}>
        {stripePromise && clientSecret && (
            <>
              <h1>Amount to pay Rs{intent.amount}</h1>
              <Elements options={options} stripe={stripePromise} >
                  <CheckOutForm orderData={orderState} clientId={clientSecret}/>
              </Elements>
            </>
        )}
    </div>
  );
}