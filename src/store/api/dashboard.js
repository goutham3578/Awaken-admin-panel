import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../api/api_urls";

// Action
export const fetchDashboard = createAsyncThunk("fetchDashboard", async () => {
  const data = localStorage.getItem('user');
  const id=JSON.parse(data).clusterId._id
  console.log(id)
  const response = await fetch(`${constants.isTestServer ? constants.testUrl : constants.baseUrl}/admin-analytics/dashboard-details?cluster=${id}`);
  
  return response.json();
});

const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashboard.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchDashboard.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default dashBoardSlice.reducer;
