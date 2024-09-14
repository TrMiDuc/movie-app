import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/MovieDetail.css';
import { Header } from './Header';
import 'bootstrap';
import { Recommendation } from './Recommendation';
import { CommentBox } from './CommentBox';

const MovieDetail = () => {
    const { type, id } = useParams();

    const [credits, setCredits] = useState(null);
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    const getCreditDetails = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=0ba35b46df83b841602ce49c6cda434b`);
            const data = await res.json();
            setCredits(data);
        } catch (error) {
            console.error('Error fetching credit details:', error);
        }
    };

    const getMovieDetail = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=0ba35b46df83b841602ce49c6cda434b`);
            const data = await res.json();
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    const getMovieTrailer = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=0ba35b46df83b841602ce49c6cda434b`);
            const data = await res.json();
            const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailer) {
                setTrailerKey(trailer.key);
            }
        } catch (error) {
            console.error('Error fetching movie trailer:', error);
        }
    };

    useEffect(() => {
        getCreditDetails();
        getMovieDetail();
        if (type === 'movie') getMovieTrailer();
    }, [id]);

    const writers = credits?.crew.filter(person => person.job === 'Writer' || person.job === 'Screenplay') || [];
    const directors = credits?.crew.filter(person => person.job === 'Director') || [];

    if (!movie) return <div>Loading...</div>;

    return (
        <>
            <Header />

            <div className='header large border first'
                style={{
                    backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`,
                }}>

                <div className='keyboard_s custom_bg'>
                    <div className="content">
                        <div className='img-detail'>
                            <img loading='lazy' className='movie-img' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </div>

                        <div className='words-detail'>
                            <h1 style={{ fontStyle: 'italic' }}>{movie.title}</h1>
                            <div className='facts'>
                                <div>Released: {(movie.release_date ? movie.release_date : movie.first_air_date)}</div>
                                <div className='genre'>
                                    Genre: {
                                        movie.genres.map((genre, index) => (
                                            <a href='' key={genre.id}>
                                                {genre.name}{index < movie.genres.length - 1 ? ', ' : ''}
                                            </a>
                                        ))
                                    }
                                </div>
                                <div className='runtime'>Length:  {movie.runtime ? parseInt(movie.runtime / 60) + "h" : ""} {movie.runtime ? (movie.runtime % 60) + "m" : "N/A"}</div>
                            </div>

                            <div className='action'>
                                <button></button>
                                <button></button>
                                <button></button>
                                {trailerKey && (
                                    <button
                                        className='trailer'
                                        onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank')}
                                    >
                                        Play Trailer
                                    </button>
                                )}
                            </div>

                            <div className='Overview'>
                                <h4>Overview</h4>
                                <p>{movie.overview}</p>
                            </div>
                            <div className='people no_image'>
                                <div><strong>Director:</strong> {directors.map(director => director.name).join(', ')}</div>
                                <div><strong>Writers:</strong> {writers.map(writer => writer.name).join(', ')}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Recommendation />
            <CommentBox />
        </>
    );
};

export { MovieDetail };
