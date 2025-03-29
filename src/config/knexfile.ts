import type { Knex } from "knex";
import dotenv from 'dotenv';

dotenv.config();

const config: { [Key: string]: Knex.Config }  = {
    development: {
        client: "pg",
        connection: {
            connectionString: process.env.DB_URL,
            ssl: false,
        },
        migrations: {
            directory: "./migrations",
        },
        seeds: {
            directory: "./seeds",
        }
    },
} 

export default config;