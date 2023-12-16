import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'
import posts from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    user: {},
    theme: "dark",
    then:cb=>cb()
}

const store = createStore(posts,initialState, applyMiddleware(thunk));

export default store