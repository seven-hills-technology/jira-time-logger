import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from '../reducers';
import { history } from "./history";

export function configureStore(initialState: any = {}) {
    const middleware = [
        routerMiddleware(history),
        thunk
    ];

    return createStore(
        connectRouter(history)(rootReducer), 
        initialState, 
        composeWithDevTools(
            applyMiddleware(...middleware))
        );
}