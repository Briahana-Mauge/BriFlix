import React from 'react';

const CommentForm = (props) => {
    return (
        <>
            <h2>Leave a comment!</h2>
            <form onSubmit={props.handleSubmit}>
                <input type='text' name='newComment' placeholder='comment' onChange={props.handleInput} value={props.newComment} required />
                <input type='submit' value='Submit' />
            </form>
        </>
    )
}

export default CommentForm;