import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import sideBarSlice from "./slice/sideBarSlice";
import jobSlice from "./slice/jobSlice";
import allJobsSlice from "./slice/allJobsSlice";

const store=configureStore({
    reducer:{
        user:userSlice,
        sideBar:sideBarSlice,
        job:jobSlice,
        allJobs:allJobsSlice
    }
}
)

export default store;