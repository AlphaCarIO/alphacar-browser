'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  TIMEOUT: '5000',
  BASE_URL: '"127.0.0.1:3000"',
  IPFS_URL: '"http://127.0.0.1:8080"'
})
