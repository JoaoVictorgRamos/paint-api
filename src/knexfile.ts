import { Knex } from "knex";
import { attachPaginate } from "knex-paginate";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
const envFile = env === "development" ? ".env.dev" : ".env";
dotenv.config({ path: envFile });

// console.log("MYSQLHOST:", process.env.MYSQLHOST);
// console.log("MYSQLUSER:", process.env.MYSQLUSER);
// console.log("MYSQLPASSWORD:", process.env.MYSQLPASSWORD);
// console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE);
// console.log("MYSQLPORT:", process.env.MYSQLPORT);
attachPaginate();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: Number(process.env.MYSQLPORT),
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
  production: {
    client: "mysql2",
    connection: {
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: Number(process.env.MYSQLPORT),
    },
    migrations: {
      directory: "./migrations",
    },
  },
};

export default config;
