import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/CommentBox.css';

const CommentBox = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyText, setReplyText] = useState({});
    const [activeReply, setActiveReply] = useState(null);
    const location = useLocation();

    const urlParts = location.pathname.split('/');
    const type = urlParts[1];
    const movie_id = urlParts[2];

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/comments`, {
                    withCredentials: true
                });
                setComments(response.data);
            } catch (err) {
                console.error('Failed to fetch comments', err);
            }
        };

        fetchComments();
    }, [type, movie_id]);

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
                    {
                        text: newComment,
                        type: type,
                        movie_id: movie_id
                    },
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
                    {
                        text: replyText[parentCommentId],
                        reply_to_comment_id: parentCommentId,
                        type: type,
                        movie_id: movie_id
                    },
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
                setActiveReply(null);
            } catch (err) {
                console.error('Failed to add reply', err);
            }
        }
    };

    const toggleReplyBox = (commentId) => {
        setActiveReply(activeReply === commentId ? null : commentId);
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
                        toggleReplyBox={toggleReplyBox}
                        activeReply={activeReply}
                    />
                ))}
            </ul>
        </div>
    );
};

const CommentItem = ({ comment, replyText, handleReplyChange, addReply, toggleReplyBox, activeReply }) => {
    const commentRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (commentRef.current && !commentRef.current.contains(event.target)) {
                if (activeReply === comment.comment_id) {
                    toggleReplyBox(null);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeReply, comment.comment_id, toggleReplyBox]);

    return (
        <li ref={commentRef}>
            <div className="comment-actions">
                <button className="upvote">▲</button>
                <span>{parseInt(comment.upvote) - parseInt(comment.downvote)}</span>
                <button className="downvote">▼</button>
            </div>

            <div className="comment-content">
                <p className="comment-username">{comment.username}</p>
                <p className="comment-text">{comment.comment_text}</p>
                {activeReply === comment.comment_id && (
                    <div className="reply-box">
                        <textarea
                            placeholder="Reply to this comment..."
                            value={replyText[comment.comment_id] || ''}
                            onChange={(e) => handleReplyChange(comment.comment_id, e.target.value)}
                        />
                        <button onClick={() => addReply(comment.comment_id)}>Reply</button>
                    </div>
                )}
                <span className="reply-link" style={activeReply ? { display: 'none' } : { display: 'block' }} onClick={() => toggleReplyBox(comment.comment_id)}>
                    Reply
                </span>
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
                            toggleReplyBox={toggleReplyBox}
                            activeReply={activeReply}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export { CommentBox };
