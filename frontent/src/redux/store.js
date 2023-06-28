import axios from "axios";
import { legacy_createStore as createStore } from "redux";
import collections from "../config/collections";

const initialState={
    user:window.localStorage.getItem("token")?axios.post(collections.server_base+"/getUserDetails",{token:window.localStorage.getItem("token")}).then((res)=>{return res.data}):null
};

const appReducer=(prevState=initialState,action)=>{
    console.log("action"+action)
        return{
            user:window.localStorage.getItem("token")?axios.post(collections.server_base+"/getUserDetails",{token:window.localStorage.getItem("token")}).then((res)=>{return res.data}):null
        };
};

const store = createStore(appReducer);

export default store;