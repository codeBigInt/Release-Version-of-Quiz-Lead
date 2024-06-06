import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../../components/Forms/userSlice";

const reduxStore = configureStore({
    reducer: {
        //Fill in reducers
        user: userSlice
    }
})

//exporting the single store that will carry all slices of the store
export default reduxStore
  