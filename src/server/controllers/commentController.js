const db = require('../utils/db');

exports.addComment = (req, res) => {

    const text = req.body.text;
    const type = req.body.type;
    const movie_id = req.body.movie_id;
    const reply_to_comment_id = req.body.reply_to_comment_id ? req.body.reply_to_comment_id : null;
    res.status(200).send(req.body);

    const user_id = req.user.user_id;

    const commentQuery = 'INSERT INTO comments (movie_id, type, user_id, comment_text) VALUES (?, ?, ?, ?)';
    
    db.query(commentQuery, [movie_id, type, user_id, text], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error adding comment' + err});
        }

        const newCommentId = result.insertId;

        if (reply_to_comment_id) {
            const replyQuery = 'INSERT INTO replies (comment_id, reply_to_comment_id) VALUES (?, ?)';
            db.query(replyQuery, [newCommentId, reply_to_comment_id], (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error adding reply'});
                }

                res.status(201).send({
                    message: 'Reply added successfully',
                    comment_id: newCommentId,
                    text,
                    user_id,
                    reply_to_comment_id
                });
            });
        } else {
            res.status(201).send({
                message: 'Comment added successfully',
                comment_id: newCommentId,
                text,
                user_id
            });
        }
    });
};

exports.getComments = (req, res) => {
    const commentsQuery = 'SELECT * FROM comments';
    const repliesQuery = 'SELECT * FROM replies';

    db.query(commentsQuery, (err, comments) => {
        if (err) {
            return res.status(500).send({ message: 'Error retrieving comments' });
        }

        db.query(repliesQuery, (err, replies) => {
            if (err) {
                return res.status(500).send({ message: 'Error retrieving replies' });
            }

            const commentMap = comments.map(comment => {
                const commentReplies = replies
                    .filter(reply => reply.reply_to_comment_id === comment.comment_id)
                    .map(reply => comments.find(c => c.comment_id === reply.comment_id));

                return {
                    ...comment,
                    replies: commentReplies
                };
            });

            res.status(200).send(commentMap);
        });
    });
};
