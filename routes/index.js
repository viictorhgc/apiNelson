const routes = require('express').Router();
const getBoleto = require ('./getBoleto')

routes.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  routes.use('/getBoleto', getBoleto)
  routes.get('/', (req, res) => {
   res.send('Server running');
});

  module.exports = routes;