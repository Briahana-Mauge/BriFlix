const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

const getGenre = async (req, res, next) => {
    try {
      const selectQuery = `SELECT * from genres`
      let response = await db.any(selectQuery)
      res.status(200).json({
        payload: response,
        message: "all genres received successfully",
        error: false
      })
    } catch (err) {
      res.status(500).json({
        payload: null,
        message: `failure retrieving genres`,
        error: true
      })
    }
  }
  const createNewGenre = async (req, res, next) => {
    try {
      const insertQuery = `INSERT INTO genres(genre_name) VALUES($1) RETURNING genre_name`
      let genre = req.body.genre
      let response = await db.one(insertQuery, genre)
      res.status(200).json({
        payload: response,
        message: "genre created successfully",
        error: false
      })
    } catch (err) {
      res.status(500).json({
        payload: null,
        message: `failure retrieving creating genre`,
        error: true
      })
    }
  }

router.get('/', getGenre)
router.post('/', createNewGenre)
module.exports = router;