

let {createSlice} =require('@reduxjs/toolkit')


export const loginSlice=createSlice({
    name:'loginSlice',
    initialState:{
        value:{
            accessToken:"",
            username:"",
            role:"",
        },
    },
    reducers:{
        setLogin:(state,action)=>{
            state.value.accessToken=action.payload.accessToken;
            state.value.username=action.payload.username;
            state.value.role=action.payload.role;
        },
        refreshLogin:(state,action)=>{
            let local=localStorage.getItem('login')
            if(local!=null)
            {
                // console.log(action.payload)
                state.value.username=action.payload;
                localStorage.setItem('login',JSON.stringify(state.value))
            }
           
        },
        removeLogin:(state)=>{
            localStorage.removeItem('login');
            state.value.accessToken="";
            state.value.username="";
            state.value.role="";
        }
    }
})
export const { setLogin,removeLogin,refreshLogin} = loginSlice.actions