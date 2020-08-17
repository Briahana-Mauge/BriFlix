const express = require('express');
const router = express.Router();
const db = require('../db/db.js');

const getAllUsers = async (req, res, next) => {
  try {
    const selectQuery = `SELECT * FROM users`
    let response = await db.any(selectQuery)
    res.status(200).json({
      payload: response,
      message: "all users retrieved successfully",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: `failure retrieving all users`,
      error: true
    })
  }
}

const getSingleUser = async (req, res, next) => {
  try {
    const selectQuery = `SELECT * FROM users WHERE id = $1`
    let id = req.params.id
    let response = await db.one(selectQuery, id)
    res.status(200).json({
      payload: response,
      message: "single user retrieved successfully",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: `failure retrieving single user`,
      error: true
    })
  }
}

const createNewUser = async (req, res, next) => {
  try {
    const insertQuery = `INSERT INTO users(username, avatar_url) VALUES($1, $2) RETURNING username`
    let username = req.body.username
    let avatar = req.body.avatar
    let response = await db.one(insertQuery, [username, avatar])
    res.status(200).json({
      payload: response,
      message: "user created successfully",
      error: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: `failure retrieving creating user`,
      error: true
    })
  }
}

router.get('/', getAllUsers)
router.get('/:id', getSingleUser)
router.post('/', createNewUser)
module.exports = router;