import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { EmptyCart } from "../../../../reduxConf/slices/Cart";

export default function CheckOutForm({orderData,clientId}) {
  const userData=useSelector((state)=>state.Auth.value);
  const stripe = useStripe();
  const elements = useElements();
  let dispatch=useDispatch();
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [intent,setIntent]=useState({})
  let [sucess,setSucess]=useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let[oid,setOid]=useState()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error,paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        
        return_url: `${window.location.origin}/app/order/completion`,
      },
      redirect:'if_required'
    });

    if (error) {
        setMessage(error.message);
          
        setTimeout(()=>{
          navigate('/app/cart');
        },1000)
    } else if(paymentIntent && paymentIntent.status==='succeeded'){
        setSucess((prev)=>{
          return true;
        })
        setMessage('sucess')  
        setIntent(paymentIntent.status) 
                
    }else{
        setMessage("Unexpected state")
        setTimeout(()=>{
          navigate('/app/cart');
        },1000)
    }

    setIsLoading(false);
  };

  let updateOrderState=async()=>{
      if(message!=null)
      {
        // console.log(intent)
        console.log(orderData)
            let data={
              item:orderData.item,
              billingAddress:orderData.billingAddress,
              shippingAddress:orderData.shippingAddress,
              total:orderData.total,
              paymentMethod:'online',
              
          } 
          dispatch(EmptyCart()) 
          let resp=await axios.post(`${process.env.REACT_APP_SERVER_URL}createOrder`,{
            status:intent==='succeeded'?'completed':'failed',
            aboutOrder:data,
            clientSecret:clientId
          },{
            headers:{
              'Authorization':`token ${userData.accessToken}`
            }
          }).catch((e)=>{
            console.log(e)
          })
          
          setTimeout(()=>{
            navigate(`/app/order/completion?${resp.status==200?`status=succeeded&orderId=${resp.data.oid}`:'status=failed'}`) 
          },2000) 
          
      } 
  }
  useEffect(()=>{
      if(message!=null)
      {
        updateOrderState();
        
      }
  },[message])
  const paymentElementOptions = {
    layout: "accordion",
    size:'desktop',
    theme:'Night'
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}  style={{width:'45vw',height:'60vh',border:'2px solid black',padding:'70px',paddingTop:'50px'}} align='center'>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-secondary" style={{position:'relative',top:'20px'}}>
        <span id="button-text" style={{height:'30px',width:'100px',fontSize:'1.6rem'}}>
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" style={{color:'black',fontSize:'20px',position:'relative',top:'20px'}}>{message}    </div>}
    </form>
  );
}