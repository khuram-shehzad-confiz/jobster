import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
  "allJobs/getAllJobs",
  async (_, thunkAPI) => {

    const { page, search, searchStatus, searchType, sort } =
      thunkAPI.getState().allJobs;

    let url = `${BASE_URL}/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    try {
      const resp = await axios.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });

      console.log(resp.data)
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getStats = createAsyncThunk(
  "allJobs/getStats",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(BASE_URL + "/jobs/stats", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
const allJobsSlice = createSlice({
  name: "allJob",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    clearAllJobsState: () => {
        return initialState
    },

    updatePage:(state, {payload})=>{
        state.page=payload;
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStats.fulfilled, (state, { payload }) => {
        console.log("Stats....");
        console.log(payload);
        state.monthlyApplications = payload.monthlyApplications;
        state.stats = payload.defaultStats;
        state.isLoading = false;
      })
      .addCase(getStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading, handleChange, clearFilters, updatePage, clearAllJobsState } =
  allJobsSlice.actions;
export default allJobsSlice.reducer;
