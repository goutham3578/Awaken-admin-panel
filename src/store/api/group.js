import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../api/api_urls";

// Action
export const fetchGroup = createAsyncThunk("fetchDashboard", async () => {
  const data = localStorage.getItem('user');
  const id=JSON.parse(data).clusterId._id
  console.log("hello")
  console.log(id)
  const response = await fetch(`${constants.isTestServer ? constants.testUrl : constants.baseUrl}/group/all-groups?cluster=${id}`);
  
  return response.json();
});

const groupSlice = createSlice({
  name: "group",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGroup.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload)

      state.data = action.payload;
    });
    builder.addCase(fetchGroup.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default groupSlice.reducer;
