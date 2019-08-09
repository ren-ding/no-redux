import React from 'react';

const EpispdesList = (props) => {
    const {episodes, toggleFavAction, favourites} = props;
    return episodes.map(episode => {
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
                    {favourites.find(fav => fav.id === episode.id) ? 'Unfav' : 'Fav'}
                </button>
                </section>
            </section>
        );
    });
}

export default EpispdesList;