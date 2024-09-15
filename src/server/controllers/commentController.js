const db = require('../utils/db');

exports.addComment = (req, res) => {
    const comment_text = req.body.text;
    const type = req.body.type;
    const movie_id = req.body.movie_id;
    const reply_to_comment_id = req.body.reply_to_comment_id ? req.body.reply_to_comment_id : null;
    const user_id = req.user.user_id;
    const username = req.user.username;

    const commentQuery = 'INSERT INTO comments (movie_id, type, user_id, comment_text) VALUES (?, ?, ?, ?)';
    
    db.query(commentQuery, [movie_id, type, user_id, comment_text], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error adding comment' + err});
        }

        const newCommentId = result.insertId;

        if (reply_to_comment_id) {
            const replyQuery = 'INSERT INTO replies (reply_id, comment_id) VALUES (?, ?)';
            db.query(replyQuery, [newCommentId, reply_to_comment_id], (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error adding reply' });
                }

                res.status(201).send({
                    comment_id: newCommentId,
                    comment_text,
                    downvote: 0,
                    replies: [],
                    upvote: 0,
                    user_id,
                    username,
                    reply_to_comment_id
                });
            });
        } else {
            res.status(201).send({
                message: 'Reply added successfully',
                    comment_id: newCommentId,
                    comment_text,
                    downvote: 0,
                    replies: [],
                    upvote: 0,
                    user_id,
                    username
            });
        }
    });
};

exports.getComments = (req, res) => {
    const movie_id = req.query.movie_id;
    const type = req.query.type;

    const commentsQuery = `
        SELECT 
            comments.user_id, 
            username, 
            comment_text, 
            comments.comment_id, 
            upvote, 
            downvote, 
            replies.comment_id AS reply_to 
        FROM 
            comments 
        JOIN 
            users ON comments.user_id = users.user_id
        LEFT JOIN 
            replies ON comments.comment_id = replies.reply_id
        WHERE 
            comments.movie_id = ? AND comments.type = ?
    `;

    db.query(commentsQuery, [movie_id, type], (err, rows) => {
        if (err) {
            return res.status(500).send({ message: 'Error retrieving comments' });
        }

        const commentsMap = {};
        const result = [];

        rows.forEach(row => {
            if (!commentsMap[row.comment_id]) {
                commentsMap[row.comment_id] = {
                    comment_id: row.comment_id,
                    user_id: row.user_id,
                    username: row.username,
                    comment_text: row.comment_text,
                    upvote: row.upvote,
                    downvote: row.downvote,
                    replies: []
                };
            }

            if (row.reply_to) {
                if (!commentsMap[row.reply_to]) {
                    commentsMap[row.reply_to] = { replies: [] };
                }
                commentsMap[row.reply_to].replies.push(commentsMap[row.comment_id]);
            } else {
                result.push(commentsMap[row.comment_id]);
            }
        });

        res.status(200).send(result);
    });
};
