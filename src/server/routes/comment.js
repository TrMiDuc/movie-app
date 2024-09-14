const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const { verifyToken } = require('../utils/authMiddleWare');

const router = express.Router();

router.get('/', getComments);

router.post('/', verifyToken, addComment);

module.exports = router;
