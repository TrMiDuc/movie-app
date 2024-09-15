import { Link } from 'react-router-dom';
import '../css/Recommendation.css';
const Recommendation = () => {
    var film = {
    }

    return (
        <div className="recommend container mt-4">
            <h1 className='recommend' style={{ paddingBottom: '20px' }}>You may like</h1>
            <div className="wrapper">
                {film.results.map(movie => (
                    <div className="item film-container text-center" key={movie.id}>
                        <Link to={`/${movie.media_type}/${movie.id}`}>
                            <img loading='lazy'
                                src={`https://media.themoviedb.org/t/p/w500_and_h282_face/${movie.backdrop_path}`}
                                alt={movie.title ? movie.title : movie.name}
                                className="recommend img-fluid"
                            />
                            <p className="film-title mt-2">{movie.title ? movie.title : movie.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Recommendation }