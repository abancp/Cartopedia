import axios from "axios";
import { legacy_createStore as createStore } from "redux";
import collections from "./configurations/collections";


let initialState = {
    user: window.localStorage.getItem("token") ? axios.post(collections.server_base + "/get-user-details", { token: window.localStorage.getItem("token") }).then((res) => { return res.data }) : null,
    theme: 'light'
};

const appReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case "user": {
            return { ...prevState, user: action.payload.user };
        }
        case 'dark': {
            return { ...prevState, theme: 'dark' }
        }
        case 'light': {
            return { ...prevState, theme: 'light' }
        }
        default: {
            return prevState
        }
    }
};
const store = createStore(appReducer);


export default store;