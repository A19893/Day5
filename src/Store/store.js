import { configureStore } from "@reduxjs/toolkit";
import  AuthSlice from "../Features/AuthSlice";
import UserSlice from "../Features/UserSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer,persistStore } from "redux-persist";
const persistConfig={
    key:'root',
    verssion:'1',
    storage
}
const rootReducer=combineReducers({
    authentication:AuthSlice,
    usersData:UserSlice
})
const perisitedReducer=persistReducer(persistConfig,rootReducer);
export const store=configureStore({
    reducer:perisitedReducer
})
export const persistor=persistStore(store)
