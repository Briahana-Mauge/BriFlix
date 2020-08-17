const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

const getAllShows = async (req, res, next) => {
    try {
        const selectQuery = `SELECT shows.id, shows.title, shows.img_url , array_agg(show_users.user_id) AS user_id, array_agg(users.username) AS watchers, array_agg(genres.genre_name) AS genre FROM shows INNER JOIN show_users ON show_users.show_id = shows.id INNER JOIN users ON users.id = show_users.user_id INNER JOIN genres ON genres.id = shows.genre_id GROUP BY shows.id ORDER BY array_agg(shows.id)`
        let response = await db.any(selectQuery)
        res.status(200).json({
            payload: response,
            message: "all shows retrieved successfully",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: `failure retrieving all shows`,
            error: true
        })
    }
}

const getSingleShow = async (req, res, next) => {
    try {
        const selectQuery = `SELECT * FROM shows WHERE id = $1`
        let show = req.params.id
        let response = await db.any(selectQuery, show)
        res.status(200).json({
            payload: response,
            message: "single show retrieved successfully",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: `failure retrieving single show`,
            error: true
        })
    }
}

const createNewShow = async (req, res, next) => {
    try {
        const insertQuery = `INSERT INTO shows(title, img_url, genre_id) VALUES($1, $2, $3) RETURNING shows.title, shows.id`
        let title = req.body.title
        let image = req.body.img_url
        let genre = req.body.genre_id
        let response = await db.one(insertQuery, [title, image, genre])
        req.id = response.id
        res.status(200).json({
            payload: response,
            message: "show created successfully",
            error: false
        })

        next()
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: `failure retrieving creating show`,
            error: true
        })
    }
}

const addWatcherToShow = async (req, res, next) => {
    try {
        const insertQuery = `INSERT INTO show_users(show_id, user_id) VALUES($1, $2);`
        let user = req.body.user_id
        let show = req.id
        let response = await db.none(insertQuery, [show, user])
        res.status(200).json({
            payload: response,
            message: "posted one show for one user retrieved successfully",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: `failure adding show for one user`,
            error: true
        })
    }
}

const getAllShowsOneGenre = async (req, res, next) => {
    try {
        const selectQuery = `SELECT * FROM shows INNER JOIN genres ON shows.genre_id = genres.id WHERE genres.id = $1`
        let genre = req.params.id
        let response = await db.any(selectQuery, genre)
        res.status(200).json({
            payload: response,
            message: "all shows from one genre retrieved successfully",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: `failure retrieving all shows from one genre`,
            error: true
        })
    }
}

const getAllShowsOneUser = async (req, res, next) => {
    try {
        const selectQuery = `SELECT shows.id, users.username, shows.title, shows.img_url, genres.genre_name FROM shows INNER JOIN show_users ON show_users.show_id = shows.id INNER JOIN users ON users.id = show_users.user_id  INNER JOIN genres ON genres.id = shows.genre_id WHERE users.id = $1;`
        let user = req.params.user_id
        let response = await db.any(selectQuery, user)
        res.status(200).json({
            payload: response,
            message: "all shows from one user retrieved successfully",
            error: false
        })
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: `failure retrieving all shows from one user`,
            error: true
        })
    }
}


router.get('/', getAllShows)
router.get('/:id', getSingleShow)
router.post('/', createNewShow, addWatcherToShow)
router.get('/genre/:genre_id', getAllShowsOneGenre)
router.get('/user/:user_id', getAllShowsOneUser)
module.exports = router;