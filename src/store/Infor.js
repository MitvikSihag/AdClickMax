import { createSlice } from "@reduxjs/toolkit";

const Infor = createSlice({
  name: "infor",
  initialState: {
    businessName: "",
    industry: "",
    posterImage: null, 
    prodDesc: ""
  },
  reducers: {
    setBusinessName: (state, action) => {
      state.businessName = action.payload;
      console.log(state.businessName);
    },
    setIndustry: (state, action) => {
      state.industry = action.payload;
      console.log(state.industry);
    },
    setPosterImage: (state, action) => {
      state.posterImage = action.payload; // Update the image URL
      console.log(state.posterImage);
    },
    setProdDesc: (state, action) => {
      state.prodDesc = action.payload; // Update the image URL
      console.log(state.prodDesc);
    },
  },
});

export const { setBusinessName, setIndustry, setPosterImage, setProdDesc } = Infor.actions;

export default Infor.reducer;
