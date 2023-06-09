import axios from 'axios'

let {createSlice} =require('@reduxjs/toolkit')
export const CartData=createSlice({
    name:'cartData',
    initialState:{
        value:[]
    },
    reducers:{
        AddCart:(state,action)=>{
            // state.value.push(action.payload);
            // console.log(action.payload)
            let check=state.value.findIndex(o=>o.item.pid==action.payload.item.pid);
            if(check!=-1)
            {
                console.log(check)
                state.value[check].quantity=action.payload.quantity;
            }
            else{
                state.value.push(action.payload);
            }
        },
        RemoveCart:(state,action)=>{
            let id=action.payload
            // console.log(id)
            state.value=state.value.filter((ele)=>{
                return ele.item.pid!=id;
            })
        },
        EmptyCart:(state,action)=>{
            state.value=[]
        },
        updateCartQuantity:(state,action)=>{
           
            let id=action.payload.pid;
            let quantity=action.payload.quantity;
            if(quantity>=0 && quantity<=6)
            {
                
                if(quantity>=6)
                {
                    quantity=5      ;
                }
                if(quantity<=0)
                {
                    quantity=1;
                }
                console.log(quantity)
                let check=state.value.findIndex(o=>o.item.pid==id);
                state.value[check].quantity=quantity
            }
            
        }
    }
})

export const {AddCart,RemoveCart,EmptyCart,updateCartQuantity} = CartData.actions