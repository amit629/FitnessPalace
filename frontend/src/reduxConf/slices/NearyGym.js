import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const nearByGymdata=createSlice({
    name:'nearByGym',
    initialState:{
        value:[]
    },
    reducers:{
        errGym:(state,action)=>{
            state.value=action.payload
        },
        getGym:(state,action)=>{
            // console.log(action.payload)
            state.value=action.payload;
        },
        getMoreGym:(state,action)=>{
            state.value=[...state.value,...action.payload]
        }
    }
})

export const imageData=createSlice({
    name:'imageData',
    initialState:{
        value:[]
    },
    reducers:{
        pushPlaces:(state,action)=>{
            // console.log(action.payload)
            state.value=[...state.value,action.payload]
        }
    }
})


export const { getGym,getMoreGym} = nearByGymdata.actions

export const {pushPlaces}=imageData.actions;

let coords={
    lat:'',
    long:'',
}
let next_page_token="";
export const getDataAsync=()=>async(dispatch)=>{
    let lat,long;
    
    navigator.geolocation.getCurrentPosition(async(pos)=>{
        lat=pos.coords.latitude
        long=pos.coords.longitude;
        const send={
            latitude:lat,
            longitude:long,
            rad:10000
        }
        // console.log(send.latitude)
        // if(send.latitude==undefined)
        // {
        //     dispatch(getGym({err:'Please Enable Loc'}));
        //     return;
        // }
        let data=await fetch(`${process.env.REACT_APP_SERVER_URL}getNearbyGymData`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(send)
        })
        data=await data.json();
        // console.log(data)
        next_page_token=data.next_page_token;
        data=data.results;
        // data.eloc=send
        coords.lat=send.latitude;
        coords.long=send.longitude;
        dispatch(getGym(data));

        
    })    
}

export const getMoreGymDataAsync=()=>async(dispatch)=>{
    if(next_page_token)
    {
        const send={
            next_token:next_page_token
        }
        let data=await fetch(`${process.env.REACT_APP_SERVER_URL}getNearbyGymData/moreData`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(send)
        })
        data=await data.json();
        next_page_token=data.next_page_token;
        data=data.results;
        dispatch(getMoreGym(data));

    }
}