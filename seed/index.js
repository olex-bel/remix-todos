import sqlite3 from "sqlite3"
import { open } from "sqlite"

async function main() {
    const db = await open({
        filename: "./db/database.db",
        driver: sqlite3.Database,
    });

    await db.exec("DROP TABLE IF EXISTS todos");
    await db.exec("CREATE TABLE todos (id INTEGER PRIMARY KEY, title TEXT, description TEXT, completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)))");
}

main();