import React from 'react';
import { StoreContext } from './Store';

const EpisodesList = React.lazy(() => import('./EpisodesList'))

const Homepage = () => {
    const {state, dispatch, toggleFavAction} = React.useContext(StoreContext);

    const fetchDataAction = async () => {
        const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
        const dataJSON = await data.json();
        return dispatch({
            type: 'FETCH_DATA',
            payload: dataJSON._embedded.episodes
        });
    }

    React.useEffect(() => {
        state.episodes.length === 0 && fetchDataAction();
    });

    const EpisodesProps = {
        episodes: state.episodes,
        toggleFavAction: toggleFavAction,
        favourites: state.favourites
    }
    
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