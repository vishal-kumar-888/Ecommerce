
import pkg from "pg";

import dotenv from "dotenv";

dotenv.config({ path: "config/config.env" });

const { Client } = pkg;

const databaseUrl = process.env.DATABASE_URL;

const database = databaseUrl

  ? new Client({

      connectionString: databaseUrl,

      ssl: process.env.NODE_ENV === "production"

        ? { rejectUnauthorized: false }

        : undefined,

    })

  : new Client({

      user: process.env.PGUSER || "postgres",

      host: process.env.PGHOST || "localhost",

      database: process.env.PGDATABASE || "mern_ecommerce_store",

      password: process.env.PGPASSWORD,

      port: Number(process.env.PGPORT || 5432),

    });

try {

  await database.connect();

  console.log("Connected to PostgreSQL successfully");

} catch (error) {

  console.error("Database connection failed:", error.message);

  process.exit(1);

}

export default database;  this 