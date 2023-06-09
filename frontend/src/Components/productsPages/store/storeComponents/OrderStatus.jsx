import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { json, useSearchParams } from 'react-router-dom';
import '../css/orderStatus.css'

export default function OrderStatus() {
  // let [searchParams, setSearchParams] = useSearchParams();
  let [status,setStatus]=useState();
  let userData=useSelector((state)=>state.Auth.value)
  let [orderData,setOrderData]=useState()
  let getOrderDetails=async(state,oid)=>{
    let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}orders/${oid}`).catch((e)=>{
        console.log(e) 
    })

    if(resp.data.err)
    {
      console.log('err')  
      return;
    }

    setOrderData(()=>{
      return resp.data.data;
    })
  }
  useEffect(()=>{
      let urlParams = new URLSearchParams(window.location.search);
      let status = urlParams.get('status'); 
      setStatus(()=>{
        return status
      })
      let oid=urlParams.get('orderId');
      console.log(status,oid)
      getOrderDetails(status,oid);
  },[])
  return (
    <>{status&&
        <Container fluid style={{position:'relative',top:'13vh',padding:'30px'}}>
            <Row>
              <Col lg={6} align="center">
              <div class="orderCard" align="center">
                  <div style={{borderRadius:'200px',height:'200px',width:'200px',background:'#F8FAF5',margin:'0 auto'}}>
                    {
                        status=='failed'?<i class="fa fa-exclamation-triangle orderi text-danger" aria-hidden="true"></i>:<i class="checkmark orderi">✓</i>
                    }
                  </div>
                  {
                        status=='failed'?(
                          <>
                            <h1 className='orderH1'>Sorry payment failed</h1> 
                             <p className='orderp'>please Retry your order</p>    
                          </>
                        ):(
                          <>
                              <h1 className='orderH1'>Success</h1> 
                              <p className='orderp'>We received your purchase request;<br/> we'll be in touch shortly!</p>
                          </>
                        )
                  }
                
              </div>
              </Col>
              <Col lg={6}>
                  {console.log(orderData)}
                  {
                    (orderData && status!='failed')&&(
                          <Container fluid>
                          <h1>Order Details</h1>
                          <Card>
                            <Card.Body>
                              <Card.Title>
                                  <h3>order no: {orderData.oid}</h3>
                              </Card.Title>
                              <Card.Body>
                                  <span className='fs-4'>Placed At: {orderData.createdAt.split('T')[0]}</span>
                                  <span className='fs-4'>order value: Rs {orderData.OrderValue}</span>
                                  <span className='fs-4'>No of items: {orderData.orderData.length}</span>
                              </Card.Body>
                              <Card.Footer>
                                <h4>Delivery to:</h4>
                                <p class="text-black">{orderData.shippingAddress.custName} , {orderData.shippingAddress.HouseNo} , {orderData.shippingAddress.locality} , {orderData.shippingAddress.Pincode} , {orderData.shippingAddress.District} , {orderData.shippingAddress.State} , {orderData.shippingAddress.Mobile}</p>
                              </Card.Footer>
                            </Card.Body>
                          </Card>
                      </Container>
                    )
                  }
              </Col>
            </Row>
        </Container>
    } 
    </>
  )
}
