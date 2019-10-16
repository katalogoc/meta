import StoreDataSource from './StoreDataSource';
import db from '../../db';

export default new StoreDataSource(db.client);
