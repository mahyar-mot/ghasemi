import React, {createContext, useReducer} from "react";
import AppReducer from "./reducer";
import {Token} from "../utils/utils";

const getInitialState = () => {
    return {
        isLoggedIn: true,
        // isLoggedIn: Boolean(Token()),
        userName: null,
        postList: [],
    };
}

const store = createContext(getInitialState());


const StateProvider = ( {children} ) => { 

    const [state, dispatch] = useReducer( AppReducer, getInitialState());

    return <store.Provider value={{...state, dispatch }}>{children}</store.Provider>
};

export { store, StateProvider };
