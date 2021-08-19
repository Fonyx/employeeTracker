const express = require('express');
const roleRouter = express.Router();
const dbModels = require('../models/index');

roleRouter.get('/all', (req, res) => {
    dbModels.Role.findAll().then(roles => res.send(roles));
});

roleRouter.post('/new', (req, res) => {
    dbModels.Role.create(req.body).then(newRole => res.send(newRole));
})

module.exports = roleRouter;