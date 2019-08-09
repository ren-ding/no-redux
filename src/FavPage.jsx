import React from 'react';
import {StoreContext} from './Store';

const EpisodesList = React.lazy(()=>import('./EpisodesList'));


const FavPage = () => {
    const {state, dispatch} = React.useContext(StoreContext);
    
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

    const favEpisodesListProps = {
        episodes: state.favourites,
        toggleFavAction: toggleFavAction,
        favourites: state.favourites
    }

    return (
        <React.Fragment>
            <React.Suspense fallback={<div>Loading...</div>}>
                <div className='episode-layout'>
                    <EpisodesList {...favEpisodesListProps}/>
                </div>
            </React.Suspense>
        </React.Fragment>
    )
}

export default FavPage;