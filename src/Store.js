import React from 'react'
import {reducer} from './Reducer';

export const StoreContext = React.createContext();

const initialState = {
    episodes: [],
    favourites: []
}



export const StoreProvider = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <StoreContext.Provider value={value}>
            {props.children}
           </StoreContext.Provider>
}