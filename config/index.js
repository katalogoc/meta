require('dotenv').config();
const nconf = require('nconf');
const path = require('path');

nconf
  .env()
  .file({ file: path.join(__dirname, './config.json') })
  .argv();

module.exports = nconf;
