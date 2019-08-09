import React from 'react'
import {reducer} from './Reducer';

export const StoreContext = React.createContext();

const initialState = {
    episodes: [],
    favourites: []
}

const toggleFavAction = (dispatch, state) =>
    episode => {
        const {favourites} = state;

        const episodeInFavorites = favourites.includes(episode);
        let dispatchObj = {
            type: 'ADD_FAV',
            payload: episode
        };
        
        if(episodeInFavorites) {
            const favouritesWithoutEpisode = favourites.filter(fav => fav.id !== episode.id)
            dispatchObj = {
            type: 'REMOVE_FAV',
            payload: favouritesWithoutEpisode
            };
        }
        
        return dispatch(dispatchObj);
    }   

export const StoreProvider = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = { 
        state, 
        dispatch, 
        toggleFavAction: toggleFavAction(dispatch,state) 
    };

    return <StoreContext.Provider value={value}>
            {props.children}
           </StoreContext.Provider>
}