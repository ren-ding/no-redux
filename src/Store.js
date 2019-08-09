import React from 'react'
import {reducer} from './Reducer';

export const StoreContext = React.createContext();

const initialState = {
    episodes: [],
    favourites: []
}

export const StoreProvider = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const toggleFavAction = episode => {
        const episodeInFavorites = state.favourites.includes(episode);
        let dispatchObj = {
            type: 'ADD_FAV',
            payload: episode
        };
        
        if(episodeInFavorites) {
            const favouritesWithoutEpisode = state.favourites.filter(fav => fav.id !== episode.id)
            dispatchObj = {
            type: 'REMOVE_FAV',
            payload: favouritesWithoutEpisode
            };
        }
        
        return dispatch(dispatchObj);
    }

    const value = { state, dispatch, toggleFavAction };

    return <StoreContext.Provider value={value}>
            {props.children}
           </StoreContext.Provider>
}