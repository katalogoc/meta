const config = require('./config');

module.exports = {
  client: {
    service: {
      name: 'hyped-text-meta',
      url: `http://${config.get('HOST')}:${config.get('PORT')}/api`,
    },
  },
};
