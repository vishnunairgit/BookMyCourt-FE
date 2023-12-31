import { createSlice  } from "@reduxjs/toolkit";

const INITIAL_STATE={
    // once we refresh the datas are missing. to overcome that we are using the code
    userDetails:JSON.parse(localStorage.getItem('user')) ?? {} ,
}
const generalSlice=createSlice({
name:'user',
initialState:INITIAL_STATE,
    // userRole:10,
    reducers:{
        setuserDetails:(state,action)=>{
        state.userDetails=action.payload
    
        },
        }}

)

export const{setuserDetails, setuserRoll}=generalSlice.actions
export default generalSlice.reducer


