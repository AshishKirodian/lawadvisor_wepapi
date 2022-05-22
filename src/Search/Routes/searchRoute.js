const express = require('express');
const search = require('../DAO/searchDAO');

const searchRouter = express.Router();

searchRouter.get('/', async (req, res) => {
    try {
        const term = req.query.term;
        const results = await search({ term });
        res.status(200).send(results);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = searchRouter;