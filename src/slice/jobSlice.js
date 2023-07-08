import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { getAllJobs, hideLoading, showLoading } from "./allJobsSlice";

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const resp = await axios.post(BASE_URL + "/jobs", job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      // basic setup
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobId, job }, thunkAPI) => {
    // console.log("jobId " + jobId);

    try {
      const resp = await axios.patch(BASE_URL + "/jobs/" + jobId, job, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(clearValues());
      return resp.data;
    } catch (error) {
      // basic setup
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    debugger;
    const jobId = thunkAPI.getState().job.deleteJobId;
    console.log("jobId" + jobId);
    try {
      console.log("jobId: " + jobId);
      const resp = await axios.delete(BASE_URL + "/jobs/" + jobId, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      thunkAPI.dispatch(closeDeleteModal());
      thunkAPI.dispatch(getAllJobs());
      return resp.data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
  isDeleting: false,
  deleteJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return initialState;
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
    enableDeleteModal: (state, { payload }) => {
      state.isDeleting = true;
      state.deleteJobId = payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleting = false;
      state.deleteJobId = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Modified...");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  handleChange,
  clearValues,
  setEditJob,
  closeDeleteModal,
  enableDeleteModal,
} = jobSlice.actions;
export default jobSlice.reducer;
