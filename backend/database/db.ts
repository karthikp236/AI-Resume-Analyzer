import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(
  process.cwd(),
  "backend",
  "database",
  "resumeAnalyzer.db"
);

const db = new sqlite3.Database(
  dbPath,
  (err) => {
    if (err) {
      console.error(
        "Database connection failed:",
        err.message
      );
    } else {
      console.log(
        "SQLite Database Connected"
      );
    }
  }
);

const schemaPath = path.join(
  process.cwd(),
  "backend",
  "database",
  "schema.sql"
);

const schema = fs.readFileSync(
  schemaPath,
  "utf-8"
);

db.exec(schema, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(
      "Database initialized"
    );
  }
});

export default db;