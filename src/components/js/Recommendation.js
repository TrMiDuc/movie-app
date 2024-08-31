import { Link } from 'react-router-dom';
import '../css/Recommendation.css';
const Recommendation = () => {
    var film = {
        "page": 1,
        "results": [
            {
                "backdrop_path": "/yHzyPJrVqlTySQ9mc379yxrLBYQ.jpg",
                "id": 672,
                "title": "Harry Potter and the Chamber of Secrets",
                "original_title": "Harry Potter and the Chamber of Secrets",
                "overview": "Cars fly, trees fight back, and a mysterious house-elf comes to warn Harry Potter at the start of his second year at Hogwarts. Adventure and danger await when bloody writing on a wall announces: The Chamber Of Secrets Has Been Opened. To save Hogwarts will require all of Harry, Ron and Hermione’s magical abilities and courage.",
                "poster_path": "/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    12,
                    14
                ],
                "popularity": 130.094,
                "release_date": "2002-11-13",
                "video": false,
                "vote_average": 7.72,
                "vote_count": 21619
            },
            {
                "backdrop_path": "/5rrGVmRUuCKVbqUu41XIWTXJmNA.jpg",
                "id": 674,
                "title": "Harry Potter and the Goblet of Fire",
                "original_title": "Harry Potter and the Goblet of Fire",
                "overview": "When Harry Potter's name emerges from the Goblet of Fire, he becomes a competitor in a grueling battle for glory among three wizarding schools—the Triwizard Tournament. But since Harry never submitted his name for the Tournament, who did? Now Harry must confront a deadly dragon, fierce water demons and an enchanted maze only to find himself in the cruel grasp of He Who Must Not Be Named.",
                "poster_path": "/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    12,
                    14
                ],
                "popularity": 114.48,
                "release_date": "2005-11-16",
                "video": false,
                "vote_average": 7.814,
                "vote_count": 20372
            },
            {
                "backdrop_path": "/r5xT55Era1XrpAq6XNsrPpozNjM.jpg",
                "id": 767,
                "title": "Harry Potter and the Half-Blood Prince",
                "original_title": "Harry Potter and the Half-Blood Prince",
                "overview": "As Lord Voldemort tightens his grip on both the Muggle and wizarding worlds, Hogwarts is no longer a safe haven. Harry suspects perils may even lie within the castle, but Dumbledore is more intent upon preparing him for the final battle fast approaching. Together they work to find the key to unlock Voldemorts defenses and to this end, Dumbledore recruits his old friend and colleague Horace Slughorn, whom he believes holds crucial information. Even as the decisive showdown looms, romance blossoms for Harry, Ron, Hermione and their classmates. Love is in the air, but danger lies ahead and Hogwarts may never be the same again.",
                "poster_path": "/z7uo9zmQdQwU5ZJHFpv2Upl30i1.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    12,
                    14
                ],
                "popularity": 92.383,
                "release_date": "2009-07-15",
                "video": false,
                "vote_average": 7.693,
                "vote_count": 19149
            },
            {
                "backdrop_path": "/obKmfNexgL4ZP5cAmzdL4KbHHYX.jpg",
                "id": 673,
                "title": "Harry Potter and the Prisoner of Azkaban",
                "original_title": "Harry Potter and the Prisoner of Azkaban",
                "overview": "Year three at Hogwarts means new fun and challenges as Harry learns the delicate art of approaching a Hippogriff, transforming shape-shifting Boggarts into hilarity and even turning back time. But the term also brings danger: soul-sucking Dementors hover over the school, an ally of the accursed He-Who-Cannot-Be-Named lurks within the castle walls, and fearsome wizard Sirius Black escapes Azkaban. And Harry will confront them all.",
                "poster_path": "/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    12,
                    14
                ],
                "popularity": 142.535,
                "release_date": "2004-05-31",
                "video": false,
                "vote_average": 8.018,
                "vote_count": 21236
            },
            {
                "backdrop_path": "/pkxPkHOPJjOvzfQOclANEBT8OfK.jpg",
                "id": 675,
                "title": "Harry Potter and the Order of the Phoenix",
                "original_title": "Harry Potter and the Order of the Phoenix",
                "overview": "Returning for his fifth year of study at Hogwarts, Harry is stunned to find that his warnings about the return of Lord Voldemort have been ignored. Left with no choice, Harry takes matters into his own hands, training a small group of students to defend themselves against the dark arts.",
                "poster_path": "/5aOyriWkPec0zUDxmHFP9qMmBaj.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    12,
                    14
                ],
                "popularity": 90.459,
                "release_date": "2007-07-08",
                "video": false,
                "vote_average": 7.681,
                "vote_count": 19171
            }
        ],
        "total_pages": 2,
        "total_results": 40
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