import '../css/SearchTemplate.css'
import { useParams, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Header } from './Header';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const SearchTemplate = () => {
    const { query } = useParams();

    const [film, setMovieList] = useState(null);

    const getMovieList = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=0ba35b46df83b841602ce49c6cda434b`);
            const data = await res.json();
            setMovieList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getMovieList();
    }, [query]);

    return (
        <>
            <Header />
            <div className="movies-search-grid">
                {film && film.results ? (
                    film.results.length > 0 ? (
                        film.results.map((movie) => (
                            <Link to={`/movie/${movie.id}`}>
                                <div key={movie.id} className="movie-item">
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                                    <div className='details'>
                                        <h3 style={{ fontWeight: 'bolder' }}>{movie.title}</h3>
                                        <p>{formatDate(movie.release_date)}</p>
                                        <h3 id='overview'>{movie.overview}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <h1 style={{ textAlign: 'center' }}>No results found for "{query}".</h1>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );

}

export { SearchTemplate };