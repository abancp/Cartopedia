import axios from "axios";
import { legacy_createStore as createStore } from "redux";

const appReducer = (prevState={user:{},theme:'dark'}, action) => {
    console.log(action.type);
    switch (action.type) {
        case 'user': {
            console.log(action.payload);
            return { ...prevState, user: action.payload.user }
        }
        case 'dark': {
            return { ...prevState, theme: 'dark' }
        }
        case 'light': {
            return { ...prevState, theme: 'light' }
        }
    }
}

const store = createStore(appReducer);


export default store;