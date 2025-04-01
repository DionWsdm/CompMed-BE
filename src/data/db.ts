import config from '../config/knexfile';
import knex, { Knex } from 'knex';

const db: Knex = knex(config.development)

export default db