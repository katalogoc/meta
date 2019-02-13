import db from '../infra/db';
import server from '../infra/server';

export default {
  start(): Promise<void> {
    return Promise.resolve()
      .then(db.authenticate)
      .then(server.start);
  },
};
