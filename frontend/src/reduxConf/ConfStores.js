import { configureStore } from "@reduxjs/toolkit";
import { imageData, nearByGymdata } from "./slices/NearyGym";
import { loginSlice } from "./slices/SignUp";
import {  ProductsData } from "./slices/Products";
import { CartData } from "./slices/Cart";
import { Order } from "./slices/Order";

export default configureStore({
    reducer:{
        nearbygymdata:nearByGymdata.reducer,
        Auth:loginSlice.reducer,
        userProduct:ProductsData.reducer,
        UserCartData:CartData.reducer,
        orderData:Order.reducer
    },
})