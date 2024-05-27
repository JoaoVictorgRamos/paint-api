import { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

// console.log("MYSQLHOST:", process.env.MYSQLHOST);
// console.log("MYSQLUSER:", process.env.MYSQLUSER);
// console.log("MYSQLPASSWORD:", process.env.MYSQLPASSWORD);
// console.log("MYSQLDATABASE:", process.env.MYSQLDATABASE);
// console.log("MYSQLPORT:", process.env.MYSQLPORT);

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
      directory: "./src/migrations",
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
      directory: "./src/migrations",
    },
  },
};

// console.log("MYSQLHOST:", process.env.MYSQLHOST);
export default config;
