const host = 'localhost';

const port = 8082;

module.exports = {
  client: {
    service: {
      name: 'katalogoc/meta',
      url: `http://${host}:${port}/api`,
    },
  },
};
