const db = require('../utils/db');

exports.addToList = (req, res) => {
    // const { movie_id } = req.body;
    // const user_id = req.user.user_id;

    // const query = 'INSERT INTO user_movie_list (user_id, movie_id) VALUES (?, ?)';
    // db.query(query, [user_id, movie_id], (err, result) => {
    //     if (err) return res.status(500).send({ message: 'Error adding to list' });
    //     res.status(201).send({ message: 'Added to list' });
    // });
    res.status(201).send({ message: 'Added to list' });
};

exports.addToWishlist = (req, res) => {
    const movie_id = req.body.movie_id;
    const type = req.body.type;
    const user_id = req.user.user_id;

    const query = 'INSERT INTO wishlist (user_id, type, movie_id) VALUES (?,?, ?)';
    db.query(query, [user_id, type, movie_id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error adding to wishlist' });
        res.status(201).send({ message: 'Added to wishlist' });
    });
};

exports.addToFavorite = (req, res) => {
    const movie_id = req.body.movie_id;
    const type = req.body.type;
    const user_id = req.user.user_id;

    const query = 'INSERT INTO favorites (user_id, type, movie_id) VALUES (?, ?, ?)';
    db.query(query, [user_id, type, movie_id], (err, result) => {
        if (err) return res.status(500).send({ message: 'Error adding to favorites' + err + movie_id + type });
        res.status(201).send({ message: 'Added to favorites' });
    });
};

exports.getUserActions = (req, res) => {
    const movie_id = req.query.movie_id;
    const type = req.query.type;
    const user_id = req.user.user_id;

    //EXISTS(SELECT 1 FROM user_movie_list WHERE user_id = ? AND movie_id = ? AND type = ?) AS isInList,

    const query = `
        SELECT 
            FALSE AS isInList,
            EXISTS(SELECT 1 FROM wishlist WHERE user_id = ? AND movie_id = ? AND type = ?) AS isInWishlist,
            EXISTS(SELECT 1 FROM favorites WHERE user_id = ? AND movie_id = ? AND type = ?) AS isFavorite
    `;
    db.query(query, [user_id, movie_id, type, user_id, movie_id, type], (err, results) => {
        if (err) return res.status(500).send({ message: 'Error checking user actions' });
        res.status(200).send(results[0]);
    });
};


exports.removeFromList = (req, res) => {
    // const { movie_id } = req.body;
    // const user_id = req.user.user_id;

    // const query = `DELETE FROM user_movie_list WHERE user_id = ? AND movie_id = ?`;
    // db.query(query, [user_id, movie_id], (err, results) => {
    //     if (err) return res.status(500).send({ message: 'Error removing from list' });
    //     res.status(200).send({ message: 'Movie removed from list' });
    // });
    res.status(201).send({ message: 'Removed from list' });
};

exports.removeFromWishlist = (req, res) => {
    const movie_id = req.body.movie_id;
    const type = req.body.type;
    const user_id = req.user.user_id;

    const query = `DELETE FROM wishlist WHERE user_id = ? AND movie_id = ? and type = ?`;
    db.query(query, [user_id, movie_id, type], (err, results) => {
        if (err) return res.status(500).send({ message: 'Error removing from wishlist' });
        res.status(200).send({ message: 'Movie removed from wishlist' });
    });
};

exports.removeFromFavorite = (req, res) => {
    const movie_id = req.body.movie_id;
    const type = req.body.type;
    const user_id = req.user.user_id;

    const query = `DELETE FROM favorites WHERE user_id = ? AND movie_id = ? AND type = ?`;
    db.query(query, [user_id, movie_id, type], (err, results) => {
        if (err) return res.status(500).send({ message: 'Error removing from favorites' });
        res.status(200).send({ message: 'Movie removed from favorites' });
    });
};
