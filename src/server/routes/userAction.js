const express = require('express');
const { addToList, removeFromList, addToWishlist, removeFromWishlist, addToFavorite, removeFromFavorite, getUserActions } = require('../controllers/userActionController');
const { verifyToken } = require('../utils/authMiddleWare');

const router = express.Router();

router.post('/list', verifyToken, addToList);
router.delete('/list', verifyToken, removeFromList);

router.post('/wishlist', verifyToken, addToWishlist);
router.delete('/wishlist', verifyToken, removeFromWishlist);

router.post('/favorite', verifyToken, addToFavorite);
router.delete('/favorite', verifyToken, removeFromFavorite);

router.get('/', verifyToken, getUserActions);

module.exports = router;
