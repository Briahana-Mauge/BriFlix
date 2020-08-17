const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

const getCommentsSingleShow = async (req, res, next) => {
    try {
        let show = req.params.show_id
        let selectQuery = `SELECT comments.id, comments.comment_body, comments.show_id, users.username, users.avatar_url FROM comments INNER JOIN users ON comments.user_id = users.id WHERE show_id = $1`
        let response = await db.any(selectQuery, show)
        res.json({
            payload: response,
            message: 'retrieved all comments successfully',
            error: false
        })
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: `failure retrieving all comments`,
            error: true
        })
    }
}

const createNewComment = async (req, res, next) => {
    try {
        let user = req.body.user_id;
        let show = req.body.show_id;
        let comment = req.body.comment_body
        let insertQuery = `INSERT INTO comments(comment_body, user_id, show_id) VALUES($1, $2, $3) RETURNING comment_body`
        let response = await db.one(insertQuery, [comment, user, show])
        res.json({
            payload: response,
            message: 'comment posted successfully',
            error: false
        })
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: `failure retrieving all comments`,
            error: true
        })
    }
}


router.get('/show/:show_id', getCommentsSingleShow)
router.post('/', createNewComment)
module.exports = router;