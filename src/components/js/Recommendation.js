import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Recommendation.css';

const Recommendation = ({ overview, genres, keywords, adult }) => {
    const { type, id } = useParams();
    const [film, setFilm] = useState(null);

    const getRecommendations = async () => {
        try {
            const requestData = {
                overview,
                genres,
                keywords,
                adult
            };

            const res = await axios.post('https://997b-35-199-3-137.ngrok-free.app/recommend', requestData);
            setFilm(res.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    useEffect(() => {
        setFilm(null);
        getRecommendations();
    }, [type, id, overview, genres, keywords, adult]);

    if (!film || film.length === 0) return <div>Loading recommendations...</div>;

    return (
        <div className="recommend container mt-4">
            <h1 className='recommend' style={{ paddingBottom: '20px' }}>You may like</h1>
            <div className="wrapper">
                {film.map(movie => (
                    <div className="item film-container text-center" key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            <img loading='lazy'
                                src={`https://image.tmdb.org/t/p/w500_and_h282_face/${movie.backdrop_path}`}
                                alt={movie.title ? movie.title : movie.name}
                                className="recommend img-fluid"
                            />
                            <p className="film-title mt-2">{movie.title}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Recommendation };
