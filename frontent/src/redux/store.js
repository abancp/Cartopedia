import axios from "axios";
import { legacy_createStore as createStore } from "redux";
import collections from "../configurations/collections";

let initialState = {user: window.localStorage.getItem("token") ? axios.post(collections.server_base + "/get-user-details", { token: window.localStorage.getItem("token") }).then((res) => { return res.data }) : null};

const appReducer = (prevState = initialState, action) => {
            return { user: window.localStorage.getItem("token") ? axios.post(collections.server_base + "/get-user-details", { token: window.localStorage.getItem("token") }).then((res) => {  console.log(res.data);return res.data }) : null };
        
    
};

const store = createStore(appReducer);

export default store;