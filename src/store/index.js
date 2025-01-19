import { configureStore } from "@reduxjs/toolkit";
import Infor from "./Infor";
import Budget from "./Budget";

const store = configureStore({

    reducer: {
        infor: Infor,
        promotions: Budget
    }

});

export default store;