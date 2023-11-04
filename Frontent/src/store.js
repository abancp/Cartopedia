import axios from "axios";
import { legacy_createStore as createStore } from "redux";
import collections from "./configurations/collections";


const token = window.localStorage.getItem("token")


let initialState = {
    user: token ? axios.post(collections.server_base + "/get-user-details", { token: token }).then((res) => { return res.data }) : null,
    theme: 'light'
};

const appReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case "user": {
            return { ...prevState , user: token ? axios.post(collections.server_base + "/get-user-details", { token: token }).then((res) => { return res.data }) : null };
        }
        case 'dark':{
            return {...prevState ,theme:'dark'}
        }
        case 'light':{
            return {...prevState,theme:'light'}
        }
    }
    return prevState
};
const store = createStore(appReducer);


export default store;