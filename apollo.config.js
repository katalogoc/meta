const host = 'localhost';

const port = 8081;

module.exports = {
  client: {
    service: {
      name: 'hyped-text-meta',
      url: `http://${host}:${port}/api`,
    },
  },
};
