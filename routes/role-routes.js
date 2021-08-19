const express = require('express');
const roleRouter = express.Router();
const dbModels = require('../models/index');

roleRouter.post('/new', (req, res) => {
    dbModels.Role.create(req.body).then(newRole => res.send(newRole));
})

module.exports = roleRouter;