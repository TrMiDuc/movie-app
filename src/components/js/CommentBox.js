import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CommentBox.css';

const CommentBox = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState({});

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/comments', {
                    withCredentials: true
                });
                setComments(response.data);
            } catch (err) {
                console.error('Failed to fetch comments', err);
            }
        };

        fetchComments();
    }, []);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleReplyChange = (commentId, text) => {
        setReplyText({ ...replyText, [commentId]: text });
    };

    const addComment = async () => {
        if (newComment.trim()) {
            try {
                const response = await axios.post(
                    'http://localhost:5000/comments',
                    { text: newComment },
                    { withCredentials: true }
                );
                setComments([...comments, response.data]);
                setNewComment('');
            } catch (err) {
                console.error('Failed to add comment', err);
            }
        }
    };

    const addReply = async (parentCommentId) => {
        if (replyText[parentCommentId]?.trim()) {
            try {
                const response = await axios.post(
                    'http://localhost:5000/comments',
                    { text: replyText[parentCommentId], reply_to_comment_id: parentCommentId },
                    { withCredentials: true }
                );
                const updatedComments = comments.map((comment) => {
                    if (comment.comment_id === parentCommentId) {
                        return { ...comment, replies: [...(comment.replies || []), response.data] };
                    }
                    return comment;
                });
                setComments(updatedComments);
                setReplyText({ ...replyText, [parentCommentId]: '' });
            } catch (err) {
                console.error('Failed to add reply', err);
            }
        }
    };

    return (
        <div className="comment-box">
            <h3>Comments</h3>
            <textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={handleCommentChange}
            />
            <button onClick={addComment}>Submit</button>

            <ul className="comments-list">
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.comment_id}
                        comment={comment}
                        replyText={replyText}
                        handleReplyChange={handleReplyChange}
                        addReply={addReply}
                    />
                ))}
            </ul>
        </div>
    );
};

const CommentItem = ({ comment, replyText, handleReplyChange, addReply }) => (
    <li>
        <p>{comment.text}</p>
        <div className="comment-actions">
            <button>Upvote ({comment.upvotes || 0})</button>
            <button>Downvote ({comment.downvotes || 0})</button>
        </div>

        <div className="reply-box">
            <textarea
                placeholder="Reply to this comment..."
                value={replyText[comment.comment_id] || ''}
                onChange={(e) => handleReplyChange(comment.comment_id, e.target.value)}
            />
            <button onClick={() => addReply(comment.comment_id)}>Reply</button>
        </div>

        {comment.replies && (
            <ul className="replies-list">
                {comment.replies.map((reply) => (
                    <CommentItem
                        key={reply.comment_id}
                        comment={reply}
                        replyText={replyText}
                        handleReplyChange={handleReplyChange}
                        addReply={addReply}
                    />
                ))}
            </ul>
        )}
    </li>
);

export { CommentBox };
