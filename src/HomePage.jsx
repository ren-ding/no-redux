import React from 'react';
import { StoreContext } from './Store';

const EpisodesList = React.lazy(() => import('./EpisodesList'))

const Homepage = () => {
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

    const fetchDataAction = async () => {
        const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
        const dataJSON = await data.json();
        return dispatch({
            type: 'FETCH_DATA',
            payload: dataJSON._embedded.episodes
        });
    }

    const EpisodesProps = {
        episodes: state.episodes,
        toggleFavAction: toggleFavAction,
        favourites: state.favourites
    }

    React.useEffect(() => {
        state.episodes.length === 0 && fetchDataAction();
    });

    return (
        <React.Fragment>
            <React.Suspense fallback={<div>Loading...</div>}>
                <section className='episode-layout'>
                    <EpisodesList {...EpisodesProps}/>
                </section>
            </React.Suspense>
        </React.Fragment>
    );
}

export default Homepage;