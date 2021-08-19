const express = require('express');
const roleRouter = express.Router();
const db = require('../models/index');

roleRouter.post('/new', (req, res) => {
    db.Role.create(req.body).then(newRole => res.send(newRole));
})

module.exports = roleRouter;