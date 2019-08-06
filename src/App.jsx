import React from 'react';
import { StoreContext } from './Store';

export default function App() {
  const {state, dispatch} = React.useContext(StoreContext);

  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes');
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  }

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

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  return (
    <React.Fragment>
      {console.log(state)}
      <div className='header'>
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episodes</p>
        <div>
          Favourite(s) {state.favourites.length}
        </div>
      </div>
      <section className='episode-layout'>
        {state.episodes.map(episode => {
          return (
            <section key={episode.id} className='eposode-box'>
              <img
                src={episode.image.medium}
                alt={`Rick and Morty ${episode.name}`}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>{episode.name}</div>
              <section>
                <div>
                  Season: {episode.season} Number: {episode.number}
                </div>
                <button type='button' onClick={() => toggleFavAction(episode)}>
                  {state.favourites.find(fav => fav.id === episode.id) ? 'Unfav' : 'Fav'}
                </button>
              </section>
            </section>
          );
        })}
      </section>
    </React.Fragment>
  );
}