import React, { useState } from 'react';
import '../css/CommentBox.css';

const CommentBox = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const addComment = () => {
        if (newComment.trim()) {
            setComments([...comments, { text: newComment, upvotes: 0, downvotes: 0 }]);
            setNewComment('');
        }
    };

    const upvoteComment = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].upvotes += 1;
        setComments(updatedComments);
    };

    const downvoteComment = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].downvotes += 1;
        setComments(updatedComments);
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
                {comments.map((comment, index) => (
                    <li key={index}>
                        <p>{comment.text}</p>
                        <div className="comment-actions">
                            <button onClick={() => upvoteComment(index)}>Upvote ({comment.upvotes})</button>
                            <button onClick={() => downvoteComment(index)}>Downvote ({comment.downvotes})</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { CommentBox };
