// MovieDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/MovieDetail.css'
import { Header } from './Header';

const MovieDetail = () => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);

    const getMovieDetail = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=0ba35b46df83b841602ce49c6cda434b`);
            const data = await res.json();
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    useEffect(() => {
        getMovieDetail();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <>
        <Header />
        <div className="container mt-4">
            <h1>{movie.title}</h1>
            <img className='movie-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.overview}</p>
        </div>
        </>
    );
};

export { MovieDetail };