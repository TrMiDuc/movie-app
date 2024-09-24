import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../css/Recommendation.css';

const Recommendation = () => {
    const { type, id } = useParams();
    const [film, setFilm] = useState(null);

    const getRecommendations = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=0ba35b46df83b841602ce49c6cda434b`);
            const data = await res.json();
            setFilm(data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    useEffect(() => {
        getRecommendations();
    }, [type, id]);

    if (!film || film.results.length === 0) return <div>No recommendations found.</div>;

    return (
        <div className="recommend container mt-4">
            <h1 className='recommend' style={{ paddingBottom: '20px' }}>You may like</h1>
            <div className="wrapper">
                {film.results.map(movie => (
                    <div className="item film-container text-center" key={movie.id}>
                        <Link to={`/${movie.media_type}/${movie.id}`}>
                            <img loading='lazy'
                                src={`https://image.tmdb.org/t/p/w500_and_h282_face/${movie.backdrop_path}`}
                                alt={movie.title ? movie.title : movie.name}
                                className="recommend img-fluid"
                            />
                            <p className="film-title mt-2">{movie.title ? movie.title : movie.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { Recommendation };
