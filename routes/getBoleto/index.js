const routes = require('express').Router();

const open = require('../../controllers/getBoleto');

routes.post('', open);

module.exports = routes;