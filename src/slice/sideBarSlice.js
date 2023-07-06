import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice=createSlice(
    {
        name:'sidebar',
        initialState:{
            isSidebarOpen:false
        },
        reducers:{
            toggleSidebar:(state)=>{
                state.isSidebarOpen=!state.isSidebarOpen
            }
        }
    }

)


export const {toggleSidebar}=sideBarSlice.actions;
export default sideBarSlice.reducer;