import React from 'react';
import CommentForm from './CommentForm';

const Comments = (props) => {
    let items = [];
    for (let i = 0; i < props.comments.length; i++) {
        items.push(
            <li key={props.comments[i].id}>
                <img className='avatar' src={props.comments[i].avatar_url} alt={`${props.comments[i].username}'s avatar`} />
                <strong>{props.comments[i].username}</strong>: {props.comments[i].comment_body}
            </li>
        )
    }
    return (
        <div>
            <CommentForm handleSubmit={props.handleSubmit} handleInput={props.handleInput} newComment={props.newComment} />
            {items}
        </div>
    )

}
export default Comments;