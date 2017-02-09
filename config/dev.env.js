var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"https://spa.vedcasts.com.br/api"',
  VERSION: '"1.0.3"',
})
