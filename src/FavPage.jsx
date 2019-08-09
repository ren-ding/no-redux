import React from 'react';
import {StoreContext} from './Store';

const EpisodesList = React.lazy(()=>import('./EpisodesList'));


const FavPage = () => {
    const {state, toggleFavAction} = React.useContext(StoreContext);
    
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