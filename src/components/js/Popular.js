import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../css/Popular.css'

const Popular = () => {
    const [film, setFilm] = useState(null);

    const getMovie = async () => {
        try {
            const res = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US&page=1&api_key=0ba35b46df83b841602ce49c6cda434b');
            const data = await res.json();
            setFilm(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getMovie();
    }, []);
    if (!film) return <div>Loading...</div>;

    return (
    <div className="popular container mt-4">
                <h1 className='popular' style={{ paddingBottom: '20px' }}>Trending</h1>
                <div className="wrapper">
                    {film.results.map(movie => (
                        <div className="item film-container text-center" key={movie.id}>
                            <Link to={`/${movie.media_type}/${movie.id}`}>
                                <img loading='lazy'
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title ? movie.title : movie.name}
                                    className="img-fluid"
                                />
                                <p className="film-title mt-2">{movie.title ? movie.title : movie.name}</p>
                            </Link>

                            <div className="more-icon">
                                <div className="glyphicons_v2 circle-more white">
                                    <svg width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="18" fill="lightgray" stroke="#000" strokeWidth="2" />
                                        <circle cx="12" cy="20" r="3" fill="#000" />
                                        <circle cx="20" cy="20" r="3" fill="#000" />
                                        <circle cx="28" cy="20" r="3" fill="#000" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    )
}

export { Popular }