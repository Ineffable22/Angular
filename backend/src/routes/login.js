const express = require('express');
const userSchema = require('../models/user');
const router = express.Router();
const jwt = require('jwt-decode');
const { authenticateToken, generateAccessToken } = require('../general/token');

// Get a login
router.post('/login', (req, res) => {
    userSchema
    .find({"name": req.body.name, "password": req.body.password})
    .then((data) => {
        if (data.length !== 0) {
            const token = generateAccessToken({ username: req.body.name, password: req.body.password});
            res.json({"access_token": token})
        } else {
            res.json({"access_token": "Denied"})
        }
    })
    .catch((error) => res.json({ message: error }));
});

// Get a profile data
router.get('/profile', authenticateToken, (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decrypted = jwt(token);

    userSchema
    .find({"name": decrypted.username, "password": decrypted.password})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
