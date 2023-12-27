import { createSlice  } from "@reduxjs/toolkit";

const INITIAL_STATE={
    // once we refresh the datas are missing. to overcome that we are using the code
    courtDetails:JSON.parse(localStorage.getItem('court')) ?? {} ,
}
const generalSlice=createSlice({
name:'court',
initialState:INITIAL_STATE,
    // userRole:10,
    reducers:{
        setcourtDetails:(state,action)=>{
        state.courtDetails=action.payload
        // storing the court data to the local storage
        localStorage.setItem ('court',JSON.stringify(action.payload))

        },
        }}

)

export const{setcourtDetails}=generalSlice.actions
export default generalSlice.reducer

