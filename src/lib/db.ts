import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const databaseDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(databaseDirectory, "todo.db");
const schemaPath = path.join(process.cwd(), "database", "schema.sql");

function createDatabase(): Database.Database {
  fs.mkdirSync(databaseDirectory, { recursive: true });

  const database = new Database(databasePath);
  const schema = fs.readFileSync(schemaPath, "utf8");

  database.pragma("journal_mode = WAL");
  database.exec(schema);

  return database;
}

const globalForDatabase = globalThis as unknown as {
  todoDatabase?: Database.Database;
};

export const db =
  globalForDatabase.todoDatabase ?? createDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.todoDatabase = db;
}